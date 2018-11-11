import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

import './App.css';

const particlesConfig = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      inputField: '',
      srcImage:'',
      boxes: [],
      route: 'signin',
      isSignin: false, 
      user: null
    }
  }

  onInputChange = (e) => {
    // console.log(e.target.value);
    this.setState({inputField: e.target.value});
  }
  
  calculateFaceLocation = (data) =>{
    const image = document.getElementById('imageInput');
    const width = Number(image.width);
    const height = Number(image.height);
    // const clarifaiImage = data.outputs[0].data.regions[0].region_info.bounding_box;
    let faces = [];
    data.outputs[0].data.regions.map(function(data) {
      faces.push({
        leftCol: data.region_info.bounding_box.left_col*width,
        topRow: data.region_info.bounding_box.top_row*height,
        rightCol: width - (data.region_info.bounding_box.right_col*width),
        bottomRow: height - (data.region_info.bounding_box.bottom_row*height)    
      });
      return true;
    });
    return faces;
  }

  onLoadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  displayFacebox = (box) => {
    // console.log(box);
    this.setState({boxes: box});
  }

  onButtonSubmit = () => {
    console.log('button submit clicked');
    const {user, inputField} = this.state;
    
    fetch('https://nodejs-facedetection.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'Application/json'},
      body: JSON.stringify({input: inputField})
    })
    .then(response => response.json())
    .then(response => {
      this.displayFacebox(this.calculateFaceLocation(response))
      fetch('https://nodejs-facedetection.herokuapp.com/image', {
        method: 'put',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          id: user.id
        })
      })
      .then(res => res.json())
      .then(user => {
        // console.log(user);
        this.onLoadUser(user[0]);
        console.log('Success checking image');
      });
    })
    .catch(err => alert("There's an error: "+ err)) 
  }

  onRouteChange = (route) => {
    if(route === 'signed' || route === 'registered'){
      this.setState({isSignin: true});
    }else{
      this.setState({isSignin: false});
      this.setState({user: {}});
      this.setState({inputField: ''});
    }
    this.setState({route: route});
  }
  

  render() {
    return (  
      <div className="App">
        <Particles className="particles" params={particlesConfig} />
        <Navigation onRouteChange={this.onRouteChange} isSignin = {this.state.isSignin}/>
        {
          this.state.route === 'signin' 
          ? <Signin onLoadUser={this.onLoadUser} onRouteChange={this.onRouteChange}/>
          : (
            this.state.route === 'register' 
            ? <Register onLoadUser= {this.onLoadUser} onRouteChange={this.onRouteChange}/>
            : <div>
                <Logo user = {this.state.user}/>

                <Rank user = {this.state.user}/>
                <ImageLinkForm 
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imageUrl = {this.state.inputField} boxes={this.state.boxes}/>    
              </div>
          ) 
        }
        </div>
    );
  }
}

export default App;
