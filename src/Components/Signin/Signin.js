import React from 'react';


class Signin extends React.Component {
  constructor(){
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({signInEmail: e.target.value});
  }
  
  onPasswordChange = (e) => {
    this.setState({signInPassword: e.target.value});
  }

  onSubmitSignIn = (e) => {
    // console.log('Onsubmit clicked');
    e.preventDefault();
    fetch('https://nodejs-facedetection.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type': 'Application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      })
    })
    .then(data => data.json())
    .then(res => {
      //  console.log(res[0]);
      if(res[0].id){
        console.log("Success sign in");
        this.props.onLoadUser(res[0]);
        this.props.onRouteChange('registered');
      }else{
        console.log("Failed to sign in");
        alert('All field must filled!');
      }
    })
    .catch(err => alert("There's an error: "+ err));
  }

  render(){
    const {onRouteChange} = this.props;
    return (
        <div className="br2 center ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <div className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="center">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address" 
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
            </div>
            <div className="lh-copy mt3">
              <a onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db i">Register</a>
            </div>
          </form>
        </div>
      </div>
      );
    }
    
  }
  
  
  export default Signin;