import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, Button } from 'mdbreact';
import fire from "firebase";

class LoginPage extends Component {

  constructor(props){
    super(props)
    this.login = this.login.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
        email: "",
        password: ""
    };
  }

  login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{}).catch((error => {
      console.log(error);
    }))
  }

  handleEmailChange(e) {
   this.setState({email: e.target.value});
  }

  handlePasswordChange(e){
     this.setState({password: e.target.value});
  }

  render() {
    return (
      <body>

        <form>
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
            </label>
          <input id="defaultFormLoginEmailEx"
                 className="form-control" type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your password
            </label>
          <input id="defaultFormLoginPasswordEx"
                 className="form-control" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <Button type="button" onClick={this.login}>Login</Button>
        </form>

        <Button href = "/SignUp">Sign Up</Button>

      </body>

    );
  }
}

export default LoginPage;
