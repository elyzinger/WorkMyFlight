import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import fakeFace from "../pic/fakeFace.jpg";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../mini_components/customer_css.css";
import { history } from "../history";
// useState, useEffect

const CustomerProfile = props => {
  var [inEditMode, setInEditMode] = useState(false);
  var [customer, setCustomer] = useState(props.customer);
  var [inputLastName, setInputLastName] = useState(null);
  // var [inputUserName, setInputUserName] = useState("");
  var [inputPassword, setInputPassword] = useState(null);
  var [inputAddress, setInputAddress] = useState(null);
  var [inputPhoneNumber, setInputPhoneNumber] = useState(null);
  var [inputCC, setInputCC] = useState(null);
  var [inputEmail, setInputEmail] = useState(null);
  var [inputFirstName, setInputFirstName] = useState(null);

  // const handleChange = e => {
  //   setCustomer(([e.target.id] = e.target.value));
  //   console.log(customer);
  // };
  const handleOnEdit = () => {
    setInEditMode(!inEditMode);
  };

  // const getCustomer = () => {
  //   var url = "http://localhost:61909/api/CustomerFacde/GetCustomer";
  //   axios({
  //     method: "GET",
  //     url: url,
  //     headers: { Authorization: "Basic " + localStorage.getItem("token") },
  //     // data: customerName,
  //   }).then(
  //     res => {
  //       setCustomer((customer = res.data));
  //       // console.log(res.data);
  //       // console.log(customer);
  //     },
  //     error => {
  //       // return the exception message
  //       if (error.response === undefined) {
  //         Swal.fire(" Note", "No Internet Connection / Server Is Down");
  //       } else Swal.fire(" Note", error.response.data);
  //       console.log(error.response);
  //     }
  //   );

  // };
  const updateCustomer = () => {
    const url =
      "http://localhost:61909/api/CustomerFacde/UpdateCustomerProfile";
    // sweet alart before update
    Swal.fire({
      title:
        "Update " + customer.FirstName + " " + customer.LastName + " Profile ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "UPDATE",
    }).then(result => {
      if (result.isConfirmed) {
        const customerUpdate = {
          ID: customer.ID,
          FirstName:
            inputFirstName === null ? customer.FirstName : inputFirstName,
          LastName: inputLastName === null ? customer.LastName : inputLastName,
          UserName: customer.UserName,
          Password: inputPassword === null ? customer.Password : inputPassword,
          Address: inputAddress === null ? customer.Address : inputAddress,
          PhoneNumber:
            inputPhoneNumber === null ? customer.PhoneNumber : inputPhoneNumber,
          CreditCardNumber:
            inputCC === null ? customer.CreditCardNumber : inputCC,
          Email: inputEmail === null ? customer.Email : inputEmail,
        };
        console.log(customerUpdate);
        axios({
          method: "put",
          url: url,
          data: customerUpdate,
          headers: { Authorization: "Basic " + localStorage.getItem("token") },
        }).then(
          res => {
            Swal.fire(customerUpdate.UserName, " WAS UPDATED ");
          },
          error => {
            // return the exception message
            if (error.response === undefined) {
              Swal.fire(" Note", "No Internet Connection / Server Is Down");
            } else Swal.fire(" Note", error.response.data);
            console.log(error.response);
          }
        );
        handleOnEdit();
        setCustomer((customer = customerUpdate));
      }
    });
  };
  const handleResetPassword = () => {
    Swal.fire({
      title: "This Option Will Reset Your Password. OK?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELETE",
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire(" Note", "Function Not Ready Yet... Sorry");
      }
    });
  };
  const handleOnDelete = () => {
    Swal.fire({
      title: "Delete " + customer.UserName + " From This Website?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELETE",
    }).then(result => {
      if (result.isConfirmed) {
        const url =
          "http://localhost:61909/api/CustomerFacde/RemoveCustomerProfile";
        axios({
          method: "delete",
          url: url,
          data: customer,
          headers: { Authorization: "Basic " + localStorage.getItem("token") },
        }).then(
          res => {
            console.log(res.data);
            Swal.fire(customer.UserName, " WAS DELETED ");
            localStorage.removeItem("token");
            document.getElementById("logoutBtn").style.display = "none";
            document.getElementById("loginBtn").style.display = "block";
            history.push("/");
            setTimeout(() => {
              window.location.reload();
            }, 8000);
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

  // useEffect(() => {
  //   // console.log("bug");
  //   getCustomer();
  //   //eslint-disable-next-line
  // }, []);
  let content = (
    <div key={customer.ID} className="customerProfileInput">
      <h4 className="miniTitle">{customer.UserName} Profile </h4>
      {inEditMode === true ? (
        <div className="customerProfileEdit">
          <h6 className="idProfile"> Customer ID: {customer.ID} </h6>
          <div className="customerImage">
            <img
              className="customerImage"
              src={fakeFace}
              alt="customerProfile"
            ></img>
          </div>
          <div className="row customerProfileLabelDiv">
            <label className="customerProfileLabel">First Name :</label>
            <label className="customerProfileLabel">Last Name :</label>
            <label className="customerProfileLabel">User Name :</label>
          </div>
          <div className="row customerProfileDataDiv">
            <input
              id="inputFirstName"
              onChange={e => setInputFirstName(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.FirstName}
              placeholder="First Name"
            ></input>
            <input
              id="inputLastName"
              onChange={e => setInputLastName(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.LastName}
              placeholder="Last Name"
            ></input>
            {/* <input
              id="inputUserName"
              // onChange={e => setInputUserName(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.UserName}
              placeholder="User Name"
            ></input> */}
            <div className="customerProfileData">{customer.UserName}</div>
          </div>
          <div className="row customerProfileLabelDiv">
            <label className="customerProfileLabel">Password :</label>
            <label className="customerProfileLabel">Address :</label>
            <label className="customerProfileLabel">Phone Number :</label>
          </div>
          <div className="row customerProfileDataDiv">
            <input
              id="inputPassword"
              onChange={e => setInputPassword(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.Password}
              placeholder="Password"
            ></input>
            <input
              id="inputAddress"
              onChange={e => setInputAddress(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.Address}
              placeholder="Address"
            ></input>
            <InputMask
              id="inputPhoneNumber"
              onChange={e => setInputPhoneNumber(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.PhoneNumber}
              mask="+\972 999-9999999"
              maskChar={null}
              type="text"
              placeholder="Phone Number"
              name="PhoneNumber"
            ></InputMask>
          </div>
          <div className="row customerProfileLabelDiv">
            <label className="customerProfileLabel ">CC Number :</label>
            <label className="customerProfileLabel">Email :</label>
          </div>
          <div className="row customerProfileDataDiv ccEmail">
            <InputMask
              id="inputCC"
              onChange={e => setInputCC(e.target.value)}
              className="customerProfileData "
              mask="9999  9999  9999  9999  99/99   9999"
              defaultValue={customer.CreditCardNumber}
              maskChar={null}
              type="text"
              placeholder="CC Number - DATE - CVV"
              name="CreditCardNumber"
            ></InputMask>
            <input
              id="inputEmail"
              onChange={e => setInputEmail(e.target.value)}
              className="customerProfileData"
              defaultValue={customer.Email}
              placeholder="Email"
            ></input>
          </div>
          <div className="row profileCustomerButtons">
            <button onClick={updateCustomer} className="profileCustomerBtn">
              Update
            </button>
            <button onClick={handleOnEdit} className="profileCustomerBtn">
              <FontAwesomeIcon icon={faUndoAlt} />
            </button>
            <button
              onClick={handleResetPassword}
              className="profileCustomerBtn"
            >
              Reset Password
            </button>
          </div>
        </div>
      ) : (
        <div className="customerProfileEdit">
          <h6 className="idProfile">Customer ID: {customer.ID}</h6>
          <div className="customerImage">
            <img
              className="customerImage"
              src={fakeFace}
              alt="customerProfile"
            ></img>
          </div>
          <div className="row customerProfileLabelDiv">
            <label className="customerProfileLabel">Full Name :</label>
            <label className="customerProfileLabel">User Name :</label>
          </div>
          <div className="row customerProfileDataDiv">
            <div className="customerProfileData">
              {customer.FirstName} {customer.LastName}
            </div>
            <div className="customerProfileData">{customer.UserName}</div>
          </div>
          <div className="row customerProfileLabelDiv">
            <label className="customerProfileLabel">Password :</label>
            <label className="customerProfileLabel">Address :</label>
            <label className="customerProfileLabel">Phone Number :</label>
          </div>
          <div className="row customerProfileDataDiv">
            <div className="customerProfileData">{customer.Password}</div>
            <div className="customerProfileData">{customer.Address}</div>
            <div className="customerProfileData">{customer.PhoneNumber}</div>
          </div>
          <div className="row customerProfileLabelDiv">
            <label className="customerProfileLabel">CC Number :</label>
            <label className="customerProfileLabel">Email :</label>
          </div>
          <div className="row customerProfileDataDiv ccEmail">
            <div style={{ width: "200px" }} className="customerProfileData ">
              {customer.CreditCardNumber}
            </div>
            <div className="customerProfileData">{customer.Email}</div>
          </div>
          <div className="column profileCustomerButtons">
            <button onClick={handleOnEdit} className="profileCustomerBtn">
              Edit
            </button>
            <button
              onClick={handleResetPassword}
              className="profileCustomerBtn"
            >
              Reset Password
            </button>
            <button onClick={handleOnDelete} className="profileCustomerBtn">
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return content;
};

export default CustomerProfile;
