import React, { Component } from "react";
import "../App.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
// import { NavLink, withRouter } from 'react-router-dom';
import Login from "./Login";
import { history } from "./history";
import axios from "axios";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

class NavBar extends Component {
  state = {};
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    var url = "http://localhost:61909/api/LoginController/GetLoginToken";
    if (token === "null" || token === null) {
      return console.log("token is " + token);
    } else console.log(token);
    axios({
      method: "get",
      url: url,
      headers: { Authorization: "Basic " + token },
    }).then(
      res => {
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
        //   console.log(res.data);
        if (res.data === "Admin") {
          document.getElementById("adminBtn").style.display = "block";
          setTimeout(() => {
            console.log("loging out");
            localStorage.removeItem("token");
            document.getElementById("logoutBtn").style.display = "none";
            document.getElementById("loginBtn").style.display = "block";
            history.push("/");
            window.location.reload();
          }, 60000 * 15);
          // Swal.fire('  Hello Airline', this.state.username);
        }
        if (res.data === "airline") {
          document.getElementById("airlineBtn").style.display = "block";
          console.log("airline logged");

          // console.log(localStorage.getItem('token'))
        }
        if (res.data === "customer") {
          document.getElementById("customerBtn").style.display = "block";
          // Swal.fire('  Hello Airline', this.state.username);
        }
        console.log(res);
      },
      error => {
        if (error.response === undefined)
          Swal.fire(" Note", "No Internet Connection / Server Is Down");
        else Swal.fire("note", error.response.data);
        console.log(error.response);
      }
    );
  };
  openFormLogin = e => {
    // console.log(e.target.id);
    document.getElementById("login").style.display = "block";
    document.getElementById("customerForm").style.display = "none";
    document.getElementById("airlineForm").style.display = "none";
  };
  handleLogout = () => {
    console.log("loging out");
    localStorage.removeItem("token");
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "block";
    //  document.getElementById("adminBtn").style.display ="none"
    //  document.getElementById("airlineBtn").style.display ="none"
    //  document.getElementById("customerBtn").style.display ="none"
    history.push("/");
    window.location.reload();
  };
  render() {
    return (
      <div>
        <nav className="nav nav-pills justify-content-center flex-column flex-sm-row mynav">
          <a
            className="nav-link home active"
            title="home"
            href="http://localhost:3000/"
          >
            Home <FontAwesomeIcon icon={faHome} />{" "}
          </a>
          <a
            className="nav-link deals"
            title="angular page"
            href="http://localhost:61909/page/Angular"
          >
            {" "}
            Deals
          </a>

          <NavDropdown
            className="searchDropDown nav-link"
            title="Look For"
            id="basic-nav-dropdown"
          >
            <div className="searchLinkDropDown">
              <NavDropdown.Item href="http://localhost:61909/page/GetDeparturesFlights">
                Departures
              </NavDropdown.Item>
              <NavDropdown.Item href="http://localhost:61909/page/GetLandingFlights">
                Arrivels
              </NavDropdown.Item>
              <NavDropdown.Item href="http://localhost:61909/page/SearchFlights">
                Search
              </NavDropdown.Item>
            </div>
          </NavDropdown>

          <NavLink className="nav-link admin" id="adminBtn" to="/admin">
            Admin
          </NavLink>

          <NavLink className="nav-link airline" id="airlineBtn" to="/airline">
            Airline
          </NavLink>
          <NavLink
            className="nav-link customer"
            id="customerBtn"
            to="/customer"
          >
            Customer
          </NavLink>

          <button
            className="nav-link login"
            id="loginBtn"
            onClick={this.openFormLogin}
          >
            {" "}
            Login <FontAwesomeIcon icon={faSignInAlt} />
          </button>
          <button
            className="nav-link logout"
            id="logoutBtn"
            onClick={this.handleLogout}
          >
            {" "}
            LogOut <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          <Login />
        </nav>
      </div>
    );
  }
}

export default NavBar;
