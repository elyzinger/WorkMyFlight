import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import BuyTicket from "./mini_components/BuyTicket";
import CustomerProfile from "./mini_components/CustomerProfile";
import EditTickets from "./mini_components/EditTickets";
import axios from "axios";
import Swal from "sweetalert2";

class Customer extends Component {
  state = {
    customer: [],
  };
  componentDidMount = () => {
    var url = "http://localhost:61909/api/CustomerFacde/GetCustomer";
    axios({
      method: "GET",
      url: url,
      headers: { Authorization: "Basic " + localStorage.getItem("token") },
      // data: customerName,
    }).then(
      res => {
        this.setState({ customer: res.data });
      },
      error => {
        // return the exception message
        if (error.response === undefined) {
          Swal.fire(" Note", "No Internet Connection / Server Is Down");
        } else Swal.fire(" Note", error.response.data);
        console.log(error.response);
      }
    );
  };
  render() {
    return (
      <BrowserRouter>
        <div className="customer">
          <h2 className="userTitle"> Welcome Customer...!</h2>

          <nav className="customerNav">
            <NavLink to="/customer/profile">
              <button className="customer-nav-btn"> Your Profile </button>
            </NavLink>
            <NavLink to="/customer/edit_ticket">
              <button className="customer-nav-btn"> Edit Tickets </button>
            </NavLink>
            <NavLink to="/customer/buy_ticket">
              <button className="customer-nav-btn"> Buy Ticket </button>
            </NavLink>
          </nav>
          <br />

          {/* <Route exact path="/customer/buy_ticket" component={BuyTicket} /> */}
          <Route
            exact
            path="/customer/buy_ticket"
            // using render instead of component lets you pass props
            render={props => (
              <BuyTicket {...props} customer={this.state.customer} />
            )}
          />
          <Route
            exact
            path="/customer/profile"
            render={props => (
              <CustomerProfile {...props} customer={this.state.customer} />
            )}
          />
          <Route exact path="/customer/edit_ticket" component={EditTickets} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Customer;
