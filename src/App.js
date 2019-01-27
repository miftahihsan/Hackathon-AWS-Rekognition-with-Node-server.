import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdbreact";
import logo from "./logo.png";

import {
  Navbar, NavbarBrand, NavbarNav, NavItem,
  NavLink, NavbarToggler, Collapse,
  FormInline, Dropdown, DropdownToggle,
  DropdownMenu,  DropdownItem
}
from "mdbreact";

import { BrowserRouter, Route, Link } from 'react-router-dom';

import Home from "./components/Home"
import LoginPage from "./components/LoginPage"
import SignUp from "./components/SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>

          <Route exact path="/" component={Home}/>
          <Route path="/Home" component={Home}/>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="/LoginPage" component={LoginPage}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
