import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, Button } from 'mdbreact';
import fire from "firebase";

class SignUp extends Component {

  constructor(props){
    super(props)
    this.signUp = this.signUp.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
        email: "",
        password: "",
        success: ""
    };
  }

  signUp(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
        this.setState({success: "You have successfully created an accout. Please log in now"})
    })
    .catch((error => {
        this.setState({success: "Error!"})
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

        <form><p className="h4 text-center mb-4">Sign Up</p>
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
          <Button type="button" onClick={this.signUp}>SignUp</Button>
        </form>
        <p>{this.state.success}</p>

        <Button href = "/">Login Page</Button>

      </body>

    );
  }
}

export default SignUp;
