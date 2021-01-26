import React, { Component } from "react";
import Swal from "sweetalert2";
import fakeFace from "../pic/fakeFace.jpg";
import InputMask from "react-input-mask";
import "../mini_components/admin_css.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class EditCustomer extends Component {
  state = {
    customers: [],
    inEditMode: {
      edited: false,
      rowKey: null,
    },
  };
  handleChange = e => {
    let updatedProfile = Object.assign({}, this.state.customer);
    updatedProfile[e.target.id] = e.target.value;
    this.setState({
      customer: updatedProfile,
    });
  };
  handleOnEdit = customer => {
    this.setState({
      inEditMode: { edited: true, rowKey: customer.ID },
    });
    document.getElementById(customer.ID).style.opacity = "1";
  };
  handleOnCancelEdit = customer => {
    this.setState({
      inEditMode: { edited: false, rowKey: null },
      customer: undefined,
    });
  };
  componentDidMount() {
    const url = "http://localhost:61909/api/AdministartorFacde/GetAllCustomers";
    axios({
      method: "GET",
      url: url,
      headers: { Authorization: "Basic " + localStorage.getItem("token") },
    }).then(res => {
      console.log(res);
      if (res === "No Data") {
        Swal.fire("no cusomres to show");
      } else {
        this.setState({ customers: res.data });
      }
    });
  }
  handleOnUpdate = customer => {
    const url = "http://localhost:61909/api/AdministartorFacde/UpdateCustomer";
    let userExist = false;
    // sweet alart before update
    Swal.fire({
      title: "Update Customer?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "UPDATE",
    }).then(result => {
      // check if the customer user name already exist
      if (this.state.customer !== undefined)
        this.state.customers.map(element => {
          if (
            element.UserName === this.state.customer.inputUserName &&
            customer.UserName !== this.state.customer.inputUserName
          ) {
            userExist = true;
            return userExist;
          } else return userExist;
        });

      console.log(userExist);
      if (result.isConfirmed && this.state.customer !== undefined) {
        if (userExist === false) {
          // getting the info for the airline that is updating.
          // checking what data we are changing
          console.log(userExist);
          const customerUpdate = {
            ID: customer.ID,
            FirstName:
              this.state.customer.inputFirstName === undefined
                ? customer.FirstName
                : this.state.customer.inputFirstName,
            LastName:
              this.state.customer.inputLastName === undefined
                ? customer.LastName
                : this.state.customer.inputLastName,
            UserName:
              this.state.customer.inputUserName === undefined
                ? customer.UserName
                : this.state.customer.inputUserName,
            Password:
              this.state.customer.inputPassword === undefined
                ? customer.Password
                : this.state.customer.inputPassword,
            Address:
              this.state.customer.inputAddress === undefined
                ? customer.Address
                : this.state.customer.inputAddress,
            PhoneNumber:
              this.state.customer.inputPhoneNumber === undefined
                ? customer.PhoneNumber
                : this.state.customer.inputPhoneNumber,
            CreditCardNumber:
              this.state.customer.inputCC === undefined
                ? customer.CreditCardNumber
                : this.state.customer.inputCC,
            Email:
              this.state.customer.inputEmail === undefined
                ? customer.Email
                : this.state.customer.inputEmail,
          };

          // sending an api request with the airline that we are updating
          // with the token of the admin
          axios({
            method: "put",
            url: url,
            data: customerUpdate,
            headers: {
              Authorization: "Basic " + localStorage.getItem("token"),
            },
          }).then(
            res => {
              // removing the airline from the list so we can render imidately the view
              // adding the updated airline to the airlines state
              const newList = this.state.customers.filter(
                item => item.ID !== customer.ID
              );
              this.setState({
                inEditMode: { edited: false, rowKey: null },
                customers: [customerUpdate, ...newList],
              });
              Swal.fire(customerUpdate.UserName, " WAS UPDATED ");
            },
            error => {
              // return the exception message
              if (error.response === undefined)
                Swal.fire(" Note", "No Internet Connection / Server Is Down");
              else Swal.fire("note", error.response.data);
              console.log(error.response);
            }
          );
        } else
          Swal.fire(
            "UserName",
            this.state.customer.inputUserName + " already exist "
          );
        userExist = false;
      }
    });
  };
  handleOnDelete = customer => {
    console.log(customer);
    Swal.fire({
      title: "Delete " + customer.UserName + " From DB?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELETE",
    }).then(result => {
      if (result.isConfirmed) {
        const url =
          "http://localhost:61909/api/AdministartorFacde/RemoveCustomer";
        axios({
          method: "delete",
          url: url,
          data: customer,
          headers: { Authorization: "Basic " + localStorage.getItem("token") },
        }).then(
          res => {
            console.log(res.data);
            const newList = this.state.customers.filter(
              item => item.ID !== customer.ID
            );
            this.setState({
              inEditMode: { edited: false, rowKey: null },
              customers: newList,
            });
            Swal.fire(customer.UserName, " WAS DELETED ");
          },
          error => {
            if (error.response === undefined)
              Swal.fire(" Note", "No Internet Connection / Server Is Down");
            else Swal.fire("note", error.response.data);
            console.log(error.response);
          }
        );
      }
    });
  };
  render() {
    const { customers } = this.state;
    const CustomerList = customers.length ? (
      customers.map(customer => {
        return (
          <div key={customer.ID} id={customer.ID}>
            {this.state.inEditMode.edited &&
            this.state.inEditMode.rowKey === customer.ID ? (
              <div className="editCustomerCard">
                <h6 className="idTitle">ID: {customer.ID}</h6>
                <div className="customerImage">
                  <img
                    className="customerImage"
                    src={fakeFace}
                    alt="customerProfile"
                  ></img>
                </div>
                <div className="row customerEditLabel">
                  <label className="labelCustomer">First Name :</label>
                  <label className="labelCustomer">Last Name :</label>
                  <label className="labelCustomer">User Name :</label>
                </div>
                <div className="row customerEditInput">
                  <input
                    id="inputFirstName"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.FirstName}
                    placeholder="First Name"
                  ></input>
                  <input
                    id="inputLastName"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.LastName}
                    placeholder="Last Name"
                  ></input>
                  <input
                    id="inputUserName"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.UserName}
                    placeholder="User Name"
                  ></input>
                  {/* <div style={{ textAlign: "center" }} className="divCustomer">
                    {customer.UserName}
                  </div> */}
                </div>
                <div className="row customerEditLabel">
                  <label className="labelCustomer">Password :</label>
                  <label className="labelCustomer">Address :</label>
                  <label className="labelCustomer">Phone Number :</label>
                </div>
                <div className="row customerEditInput">
                  <input
                    id="inputPassword"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.Password}
                    placeholder="Password"
                  ></input>
                  <input
                    id="inputAddress"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.Address}
                    placeholder="Address"
                  ></input>
                  <InputMask
                    id="inputPhoneNumber"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.PhoneNumber}
                    mask="+\972 999-9999999"
                    maskChar={null}
                    type="text"
                    placeholder="Phone Number"
                    name="PhoneNumber"
                  ></InputMask>
                </div>
                <div className="row customerEditLabel">
                  <label className="labelCustomer ">CC Number :</label>
                  <label className="labelCustomer">Email :</label>
                </div>
                <div className="row customerEditInput ccEmail">
                  <InputMask
                    id="inputCC"
                    onChange={this.handleChange}
                    className="inputCustomer "
                    mask="9999  9999  9999  9999  99/99   9999"
                    defaultValue={customer.CreditCardNumber}
                    maskChar={null}
                    type="text"
                    placeholder="CC Number - DATE - CVV"
                    name="CreditCardNumber"
                  ></InputMask>
                  <input
                    id="inputEmail"
                    onChange={this.handleChange}
                    className="inputCustomer"
                    defaultValue={customer.Email}
                    placeholder="Email"
                  ></input>
                </div>
                <div className="row editCustomerButtons">
                  <button
                    onClick={() => {
                      this.handleOnUpdate(customer);
                    }}
                    className="editCustomerBtn"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      this.handleOnCancelEdit(customer);
                    }}
                    className="editCustomerBtn"
                  >
                    <FontAwesomeIcon icon={faUndoAlt} />
                  </button>
                  <button className="editCustomerBtn">Reset Password</button>
                </div>
              </div>
            ) : (
              <div className="editCustomerCard">
                <h6 className="idTitle">ID: {customer.ID}</h6>
                <div className="customerImage">
                  <img
                    className="customerImage"
                    src={fakeFace}
                    alt="customerProfile"
                  ></img>
                </div>
                <div className="row customerEditLabel">
                  <label className="labelCustomer">Full Name :</label>
                  <label className="labelCustomer">User Name :</label>
                </div>
                <div className="row customerEditInput">
                  <div className="divCustomer">
                    {customer.FirstName} {customer.LastName}
                  </div>
                  <div className="divCustomer">{customer.UserName}</div>
                </div>
                <div className="row customerEditLabel">
                  <label className="labelCustomer">Password :</label>
                  <label className="labelCustomer">Address :</label>
                  <label className="labelCustomer">Phone Number :</label>
                </div>
                <div className="row customerEditInput">
                  <div className="divCustomer">{customer.Password}</div>
                  <div className="divCustomer">{customer.Address}</div>
                  <div className="divCustomer">{customer.PhoneNumber}</div>
                </div>
                <div className="row customerEditLabel">
                  <label className="labelCustomer">CC Number :</label>
                  <label className="labelCustomer">Email :</label>
                </div>
                <div className="row customerEditInput ccEmail">
                  <div style={{ width: "200px" }} className="divCustomer ">
                    {customer.CreditCardNumber}
                  </div>
                  <div className="divCustomer">{customer.Email}</div>
                </div>
                <div className="column editCustomerButtons">
                  <button
                    onClick={() => this.handleOnEdit(customer)}
                    className="editCustomerBtn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleOnDelete(customer)}
                    className="editCustomerBtn"
                  >
                    <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
                  </button>
                  <button className="editCustomerBtn">Reset Password</button>
                </div>
              </div>
            )}
          </div>
        );
      })
    ) : (
      <div className="center"> No Customers To Show</div>
    );

    return (
      <div>
        <h4 className="miniTitle"> Edit Customers</h4>
        {CustomerList}
      </div>
    );
  }
}

export default EditCustomer;
