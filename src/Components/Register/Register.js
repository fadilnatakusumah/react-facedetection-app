import React from 'react';


class Register extends React.Component {
  constructor(){
    super();
    this.state = {
      signInName: '',
      signInEmail: '',
      signInPassword: ''
    }
  }
  onNameChange = (e) => {
    this.setState({signInName: e.target.value});
  }

  onEmailChange = (e) => {
    this.setState({signInEmail: e.target.value});
  }
  
  onPasswordChange = (e) => {
    this.setState({signInPassword: e.target.value});
  }

  onSubmitRegister = (e) => {
    e.preventDefault();
    // console.log(this.state);
    const {name, pass, email} = this.state;
      fetch('https://nodejs-facedetection.herokuapp.com/register', {
        method: 'post',
        headers: {'Content-Type': 'Application/json'},
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
        })
      })
      .then(data => data.json())
      .then(user => {
        if(user.id){
          console.log("Success register user", user);
          this.props.onLoadUser(user);
          this.props.onRouteChange('registered');
        }else{
          console.log("Failed to sign in");
        alert('All field must filled!');
        }
      })
      .catch(err => alert("There's an error: " + err))
  }
  render() {
    const {onRouteChange} = this.props;
    return (
      <div className="br2 center ba dark-gray shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <div className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <div className="center">
                <legend className="f2 fw6 ph0 mh0">Register</legend>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="email-address"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
            <div className="lh-copy mt3">
              <a onClick={() => onRouteChange('signin')} href="#0" className="f6 link dim black db i">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    );
  }

}
      
      
export default Register;