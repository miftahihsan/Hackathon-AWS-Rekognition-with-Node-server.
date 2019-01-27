import React, { Component } from 'react';
// import SignUp from 'SignUp';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import ChatBot from './ChatBot';
import fire from 'firebase';

class Home extends Component {

  constructor(props){
    super(props);
    // this.logOut = this.logOut.bind(this);
    this.state = {
      user:{},
    }
  }

  componentDidMount(){
    this.authListner();
  }

  authListner(){
    fire.auth().onAuthStateChanged((user) => {
        if(user){
          this.setState({ user });
          //localStorage.setItem('user', user.uid);
        }
        else{
          this.setState({ user: null });
          //localStorage.removeItem('user');
        }
    });
  }

  render() {
    return (
      <body>
        {this.state.user ? (<ChatBot/>) : (<LoginPage/>)}
      </body>
    );
  }
}

export default Home;
