import React, { Component } from "react";
import axios from "axios";
// import Pic2 from "../pic/Pic2.jpg";
import Swal from "sweetalert2";

class AdminInbox extends Component {
  state = {
    airlines: [],
  };
  addAirlineToDB(airline) {
    const url =
      "http://localhost:61909/api/AdministartorFacde/AddNewAirlineToDB";
    axios({
      method: "POST",
      url: url,
      data: airline,
      headers: { Authorization: "Basic " + localStorage.getItem("token") },
    }).then(
      res => {
        Swal.fire(airline.AirLineName, "was added");
        console.log(res.data);
        // remove the added airline from the list filtering by name as the key
        const newAirlineList = this.state.airlines.filter(
          item => item.AirLineName !== airline.AirLineName
        );
        this.setState({
          airlines: newAirlineList,
        });
      },
      error => {
        if (error.response === undefined) {
          console.log(error.response);
          Swal.fire("note", error.response.data);
        } else console.log(error.response);
      }
    );
  }
  deleteAirlineFromSignup(airline) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        const url =
          "http://localhost:61909/api/AdministartorFacde/RemoveAirlineFromSignUP";
        axios({
          method: "POST",
          url: url,
          data: airline,
          headers: { Authorization: "Basic " + localStorage.getItem("token") },
        }).then(
          res => {
            // Swal.fire(airline.AirLineName , 'was deletd');
            Swal.fire(
              "Deleted!",
              airline.AirLineName + " has been deleted.",
              "success"
            );
            console.log(res.data);
            const newAirlineList = this.state.airlines.filter(
              item => item.AirLineName !== airline.AirLineName
            );
            this.setState({
              airlines: newAirlineList,
            });
          },
          error => {
            if (error.response === undefined) {
              console.log(error.response);
              Swal.fire("note", error.response.data);
            } else console.log(error.response);
          }
        );
      }
    });
  }
  componentDidMount() {
    const url =
      "http://localhost:61909/api/AdministartorFacde/GetAirlineSignInList";
    axios({
      method: "get",
      url: url,
      headers: { Authorization: "Basic " + localStorage.getItem("token") },
    }).then(
      res => {
        // console.log(res)
        if (res.data === 0) {
          // this.setState({ airlines: [] });
          Swal.fire("No Mail", "check later");
        } else {
          // console.log(res.status);
          this.setState({ airlines: res.data });
          console.log(this.state.airlines);
        }
      },
      error => {
        if (error.response === undefined) {
          return console.log("no");
        }
        Swal.fire("note", error.response.data);
        return console.error(error.response);
      }
    );
  }
  render() {
    const { airlines } = this.state;
    const flightList = airlines.length ? (
      airlines.map(airline => {
        return (
          <div className="adminInboxCard" key={airline.AirLineName}>
            <div className="picBox">
              <img
                className="inboxPic"
                src={`https://logo.clearbit.com/${airline.AirLineName}.com`}
                alt="company logo"
              />
            </div>
            <h4>Company name: {airline.AirLineName}</h4>
            <div className="adminInboxInfo">
              <h6 className="adminInboxInfo">User Name: {airline.UserName}</h6>
              <h6 className="adminInboxInfo">Password: {airline.Password}</h6>
              <h6 className="adminInboxInfo">Country: {airline.CountryCode}</h6>
              <h6 className="adminInboxInfo">
                Reg.date: {airline.RegDate.toLocaleString().replace("T", " ")}
              </h6>
              <h6 className="adminInboxInfo">Email: {airline.Email}</h6>
            </div>
            <button
              onClick={() => this.addAirlineToDB(airline)}
              className="inboxAccept"
            >
              Accept
            </button>
            <button
              onClick={() => this.deleteAirlineFromSignup(airline)}
              className="inboxReject"
            >
              Reject
            </button>
            {/* {if(window.confirm('Delete the item?')) */}
          </div>
        );
      })
    ) : (
      <div>no posts</div>
    );
    return (
      <div className="adminInbox">
        <h4 className="miniTitle"> Admin Inbox</h4>
        {flightList}
      </div>
    );
  }
}

export default AdminInbox;
