import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Swal from "sweetalert2";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { history } from "./history";
import { connect } from "react-redux";
import CreateNewAirline from "./mini_components/CreateNewAirline";
import CreateNewCustomer from "./mini_components/CreatNewCustomer";

// const dic1 = useSelector(state => state.dic
class Login extends Component {
  state = {
    // dic: Number
    airlineFormKey: 0,
    customerFormKey: 0,
    countries: [],
    // isReqiured: true
    countryCode: 0,
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  HandleSubmiteLogin = e => {
    e.preventDefault(); // makes it so submit would not go to a diffrent url
    var url = "http://localhost:61909/api/LoginController/GetLoginToken";

    axios({
      method: "get",
      url: url,
      // headers: {'Authorization': 'Basic ' + localStorage.getItem('token')},
      headers: {
        Authorization:
          "Basic " +
          btoa(this.state.loginUsername + ":" + this.state.loginPassword),
      },
    }).then(
      res => {
        document.getElementById("login").style.display = "none";
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";
        console.log(res.data);
        if (res.data === "Admin") {
          document.getElementById("customerBtn").style.display = "none";
          document.getElementById("airlineBtn").style.display = "none";
          document.getElementById("adminBtn").style.display = "block";
          // document.getElementById("adminBtn").disabled = true;
          Swal.fire(" Welcome Admin");
          localStorage.setItem(
            "token",
            btoa(this.state.loginUsername + ":" + this.state.loginPassword)
          );
          setTimeout(() => {
            console.log("loging out");
            localStorage.removeItem("token");
            document.getElementById("logoutBtn").style.display = "none";
            document.getElementById("loginBtn").style.display = "block";
            history.push("/");
            window.location.reload();
          }, 60000 * 15);
        }
        if (res.data === "airline") {
          document.getElementById("airlineBtn").style.display = "block";
          document.getElementById("adminBtn").style.display = "none";
          document.getElementById("customerBtn").style.display = "none";
          Swal.fire("  Hello ", this.state.loginUsername);
          localStorage.setItem(
            "token",
            btoa(this.state.loginUsername + ":" + this.state.loginPassword)
          );
          console.log(localStorage.getItem("token"));
        }
        if (res.data === "customer") {
          document.getElementById("customerBtn").style.display = "block";
          document.getElementById("adminBtn").style.display = "none";
          document.getElementById("airlineBtn").style.display = "none";
          Swal.fire("  Hello ", this.state.loginUsername);
          localStorage.setItem(
            "token",
            btoa(this.state.loginUsername + ":" + this.state.loginPassword)
          );
        }
        // console.log(res);
      },
      error => {
        if (error.response === undefined)
          Swal.fire(" Note", "No Internet Connection / Server Is Down");
        else Swal.fire(" Note", error.response.data);
      }
    );
  };

  HandleSubmiteNewCustomer = e => {
    e.preventDefault();
    // check if password was confirmed
    if (this.state.customerCofirmedPassword !== this.state.customerPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords dont match!",
        // text: 'Passwords dont match!',
        // footer: '<a href>Why do I have this issue?</a>'
      });
    } else {
      const customer = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        userName: this.state.customerUserName,
        password: this.state.customerPassword,
        email: this.state.customerEmail,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        creditCardNumber: this.state.creditCardNumber,
      };
      console.log(customer);
      axios({
        method: "post",
        url: "http://localhost:61909/api/AnonymousFacade/AddNewCustomerToRedis",
        data: customer,
      }).then(
        res => {
          if (res.data !== 0) {
            // console.log(res);
            Swal.fire(" information was added, thank you ");
          } else {
            // console.log(res);
            Swal.fire(" user already exist ");
          }
        },
        error => {
          if (error.response === undefined)
            Swal.fire(" Note", "No Internet Connection / Server Is Down");
          else Swal.fire("note", error.response.data);
          console.log(error.response);
        }
      );
      this.setState({
        customerFormKey: this.state.customerFormKey + 1,
      });
      // console.log(this.state.customerFormKey)
    }
  };
  HandleSubmiteNewAirline = e => {
    //  prevent from submitting a form
    e.preventDefault();
    // check if password was confirmed
    if (this.state.airlineConfirmedPassword !== this.state.airlinePassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords dont match!",
        // text: 'Passwords dont match!',
        // footer: '<a href>Why do I have this issue?</a>'
      });
    }
    // check if country was picked
    else if (this.state.countryCode === 0) {
      Swal.fire("Pick A Country");
    } else {
      //   take the info from state and add it to api data
      const airline = {
        airlineName: this.state.airlineName,
        userName: this.state.airlineUsrName,
        password: this.state.airlinePassword,
        email: this.state.airlineEmail,
        countryCode: this.state.countryCode,
        // date time now
        RegDate: new Date().toLocaleString(),
      };
      console.log(airline);
      axios({
        method: "post",
        url: "http://localhost:61909/api/AnonymousFacade/AddNewAirlineToRedis",
        data: airline,
      }).then(
        res => {
          if (res.data === true) {
            // console.log(res);
            Swal.fire(" information was added, thank you ");
          } else {
            // console.log(res);
            Swal.fire(" user already exist ");
          }
        },
        error => {
          if (error.response === undefined)
            Swal.fire(" Note", "No Internet Connection / Server Is Down");
          else Swal.fire("note", error.response.data);
          console.log(error.response);
        }
      );
      this.setState({
        airlineFormKey: this.state.airlineFormKey + 1,
        countryCode: 0,
      });
      console.log(this.state.airlineFormKey);
    }
  };
  getCountries = () => {
    var url = "http://localhost:61909/api/AnonymousFacade/GetCountries";

    axios({
      method: "GET",
      url: url,
      // headers: {'Authorization': 'Basic ' + localStorage.getItem('token')},
    }).then(
      res => {
        // const options = [

        // ]
        this.setState({ countries: res.data });
        // console.log(this.state.countries)
      },
      error => {
        if (error.response === undefined)
          Swal.fire(" Note", "No Internet Connection / Server Is Down");
        else Swal.fire("note", error.response.data);
        console.log(error.response);
      }
    );
  };
  loginFormOptions = e => {
    switch (e.target.id) {
      case "backToLogin":
        document.getElementById("login").style.display = "block";
        document.getElementById("customerForm").style.display = "none";
        document.getElementById("airlineForm").style.display = "none";
        break;
      case "customerReg":
        document.getElementById("login").style.display = "none";
        document.getElementById("customerForm").style.display = "block";
        break;
      case "airlineReg":
        this.getCountries();
        document.getElementById("airlineForm").style.display = "block";
        document.getElementById("login").style.display = "none";
        break;
      case "loginClose":
        document.getElementById("login").style.display = "none";
        break;
      case "closeCustomerForm":
        document.getElementById("customerForm").style.display = "none";
        break;
      case "closeAirlineForm":
        document.getElementById("airlineForm").style.display = "none";
        break;
      default: //do nothing
    }
  };
  render() {
    // const { name } = this.props
    // const { dic } = this.props
    return (
      //  login form
      <div className="login/regiser">
        <div className="form-popup" id="login">
          <form onSubmit={this.HandleSubmiteLogin} className="form-container">
            <h1> Login</h1>

            <div className="loginIcons">
              <label className="signUp">Sign Up With:</label>
              <a className="sighWith" href="http://localhost:3000/">
                {" "}
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a className="sighWith" href="http://localhost:3000/">
                {" "}
                <FontAwesomeIcon icon={faGoogle} />
              </a>
            </div>
            <input
              type="text"
              placeholder="Enter User Name"
              id="loginUsername"
              onChange={this.handleChange}
              required
            ></input>
            <input
              type="password"
              placeholder="Enter Password"
              id="loginPassword"
              onChange={this.handleChange}
              required
            ></input>

            <button type="submit" className="btn">
              {" "}
              Login
            </button>
            <button
              type="button"
              className="btn cancel"
              id="loginClose"
              onClick={this.loginFormOptions}
            >
              {" "}
              Close
            </button>

            {/* adding forgot password */}
            <h6>
              <label
                className="formReg"
                id="customerReg"
                onClick={this.loginFormOptions}
              >
                New Customer Sign up{" "}
              </label>
            </h6>
            <h6>
              <label
                className="formReg"
                id="airlineReg"
                onClick={this.loginFormOptions}
              >
                New Airline Sign up
              </label>
            </h6>
          </form>
        </div>
        <CreateNewCustomer
          submitAirline={this.HandleSubmiteNewCustomer}
          customerFormKey={this.state.customerFormKey}
          handleChange={this.handleChange}
          loginFormOptions={this.loginFormOptions}
        />
        <CreateNewAirline
          countries={this.state.countries}
          airlineFormKey={this.state.airlineFormKey}
          confirmedPassword={this.HandleConfirmedAirlinePassword}
          submitAirline={this.HandleSubmiteNewAirline}
          handleChange={this.handleChange}
          loginFormOptions={this.loginFormOptions}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  dic: state.dic,
  name: state.name,
});
export default connect(mapStateToProps, null)(Login);
