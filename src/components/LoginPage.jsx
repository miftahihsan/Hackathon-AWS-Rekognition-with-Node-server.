import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import fire from "firebase";

class LoginPage extends Component {

  constructor(props){
    super(props)
    // this.login = this.login.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
        email: "",
        password: ""
    };
  }

  login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error => {
      console.console.log(error);
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
      <form>
          <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          <button type="button" onClick={this.handleLogin}>Login</button>
        </form>
   