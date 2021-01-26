import React, { Component } from "react";
import axios from "axios";
import "../mini_components/admin_css.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo, faTrash } from "@fortawesome/free-solid-svg-icons";

class EditAirline extends Component {
  state = {
    airlines: [],
    inEditMode: {
      edited: false,
      rowKey: null,
    },
  };
  getAllAirlines = () => {
    const url = "http://localhost:61909/api/AdministartorFacde/GetAllAirlines";
    axios({
      method: "get",
      url: url,
      headers: { Authorization: "Basic " + localStorage.getItem("token") },
    }).then(
      res => {
        // adding the list from ahe api to airlines
        this.setState({ airlines: res.data });
        console.log(res.data);
      },
      error => {
        // return the exception message
        if (error.response === undefined)
          Swal.fire(" Note", "No Internet Connection / Server Is Down");
        else Swal.fire("note", error.response.data);
        console.log(error.response);
      }
    );
  };
  handleChange = e => {
    let updatedProfile = Object.assign({}, this.state.airline);
    updatedProfile[e.target.id] = e.target.value;
    this.setState({
      airline: updatedProfile,
    });
  };
  // handleOnInput = (e) =>{
  //   this.setState({
  //       [e.target.id] : e.target.defaultValue
  //   })
  // }

  handleOnUpdate = airline => {
    const url = "http://localhost:61909/api/AdministartorFacde/UpdateAirline";
    let nameExist = false;
    // sweet alart before update
    Swal.fire({
      title: "Update airline?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "UPDATE",
    }).then(result => {
      // check if the airline name or user name already exist
      if (this.state.airline !== undefined)
        this.state.airlines.map(element => {
          if (
            (element.UserName === this.state.airline.inputAirlineUserName &&
              airline.UserName !== this.state.airline.inputAirlineUserName) ||
            (element.AirLineName === this.state.airline.inputAirlineName &&
              airline.AirLineName !== this.state.airline.inputAirlineName)
          ) {
            nameExist = true;
            return nameExist;
          } else return nameExist;
        });
      if (result.isConfirmed && this.state.airline !== undefined) {
        if (nameExist === false) {
          // getting the info for the airline that is updating.
          // checking what data we are changing
          const airlineUpdate = {
            ID: airline.ID,
            AirLineName:
              this.state.airline.inputAirlineName === undefined
                ? airline.AirLineName
                : this.state.airline.inputAirlineName,
            UserName:
              this.state.airline.inputAirlineUserName === undefined
                ? airline.UserName
                : this.state.airline.inputAirlineUserName,
            Password:
              this.state.airline.inputAirlinePassword === undefined
                ? airline.Password
                : this.state.airline.inputAirlinePassword,
            Email:
              this.state.airline.inputAirlineEmail === undefined
                ? airline.Email
                : this.state.airline.inputAirlineEmail,
            CountryCode:
              this.state.airline.inputAirlineCountryCode === undefined
                ? airline.CountryCode
                : this.state.airline.inputAirlineCountryCode,
          };
          // sending an api request with the airline that we are updating
          // with the token of the admin
          axios({
            method: "put",
            url: url,
            data: airlineUpdate,
            headers: {
              Authorization: "Basic " + localStorage.getItem("token"),
            },
          }).then(
            res => {
              // removing the airline from the list so we can render imidately the view
              // adding the updated airline to the airlines state
              const newList = this.state.airlines.filter(
                item => item.ID !== airline.ID
              );
              this.setState({
                inEditMode: { edited: false, rowKey: null },
                airlines: [airlineUpdate, ...newList],
              });
              Swal.fire(airlineUpdate.AirLineName, " WAS UPDATED ");
            },
            error => {
              // return the exception message
              if (error.response === undefined) {
                Swal.fire(" Note", "No Internet Connection / Server Is Down");
              } else Swal.fire(" Note", error.response.data);
              console.log(error.response);
            }
          );
        }
        Swal.fire(" Note", "User Name Or Airline Name Already exits:");
        nameExist = false;
      }
      this.handleOnCancelEdit();
    });
  };
  handleOnDelete = airline => {
    // console.log(airline);
    Swal.fire({
      title: "Delete " + airline.UserName + " From DB?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "DELETE",
    }).then(result => {
      if (result.isConfirmed) {
        const url =
          "http://localhost:61909/api/AdministartorFacde/RemoveAirline";
        axios({
          method: "delete",
          url: url,
          data: airline,
          headers: { Authorization: "Basic " + localStorage.getItem("token") },
        }).then(
          res => {
            console.log(res.data);
            const newList = this.state.airlines.filter(
              item => item.ID !== airline.ID
            );
            this.setState({
              inEditMode: { edited: false, rowKey: null },
              airlines: newList,
            });
            Swal.fire(airline.AirLineName, " WAS DELETED ");
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
  componentDidMount = () => {
    this.getAllAirlines();
  };
  handleOnEdit = airline => {
    this.setState({
      inEditMode: { edited: true, rowKey: airline.ID },
    });
  };
  handleOnCancelEdit = airline => {
    this.setState({
      inEditMode: { edited: false, rowKey: null },
      airline: undefined,
    });
  };

  render() {
    return (
      <div className="editAirline">
        <h4 className="miniTitle"> Edit Airlines</h4>
        <table className="table airlinesTable">
          <thead>
            <tr>
              <th scope="col">UPDATE</th>
              <th scope="col">AIRLINE NAME</th>
              <th scope="col">AIRLINE ID</th>
              <th scope="col">USERNAME</th>
              <th scope="col">PASSWORD</th>
              <th scope="col">COUNTRYCODE</th>
              <th scope="col">EMAIL</th>
              <th scope="col">DELETE</th>
            </tr>
          </thead>

          <tbody>
            {this.state.airlines.map(airline => (
              <tr key={airline.ID} className="airlinesTableRow">
                <td>
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <button
                      onClick={() => this.handleOnUpdate(airline)}
                      className="updateAirlineBtn"
                    >
                      UPDATE
                    </button>
                  ) : (
                    <button
                      onClick={() => this.handleOnEdit(airline)}
                      onChange={this.handleChange}
                      className="updateAirlineBtn"
                    >
                      EDIT AIRLINE
                    </button>
                  )}
                </td>
                <td id="AirlineName">
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <input
                      id="inputAirlineName"
                      onChange={this.handleChange.bind(this)}
                      defaultValue={airline.AirLineName}
                      placeholder={airline.AirLineName}
                    />
                  ) : (
                    airline.AirLineName
                  )}{" "}
                </td>
                <td
                  id="airlineID"
                  onChange={this.handleChange}
                  value={airline.ID}
                >
                  {airline.ID}
                </td>
                <td
                  id="airlineUserName"
                  onChange={this.handleChange}
                  value={airline.UserName}
                >
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <input
                      id="inputAirlineUserName"
                      onChange={this.handleChange.bind(this)}
                      defaultValue={airline.UserName}
                      placeholder={airline.UserName}
                    />
                  ) : (
                    airline.UserName
                  )}{" "}
                </td>
                <td
                  id="airlinePassword"
                  onChange={this.handleChange}
                  value={airline.Password}
                >
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <input
                      id="inputAirlinePassword"
                      defaultValue={airline.Password}
                      onChange={this.handleChange.bind(this)}
                      placeholder={airline.Password}
                    />
                  ) : (
                    airline.Password
                  )}{" "}
                </td>
                <td
                  id="airlineCountryCode"
                  onChange={this.handleChange}
                  value={airline.CountryCode}
                >
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <input
                      id="inputAirlineCountryCode"
                      defaultValue={airline.CountryCode}
                      onChange={this.handleChange.bind(this)}
                      placeholder={airline.CountryCode}
                    />
                  ) : (
                    airline.CountryCode
                  )}{" "}
                </td>

                <td id="airlineEmail" value={airline.Email}>
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <input
                      id="inputAirlineEmail"
                      defaultValue={airline.Email}
                      onChange={this.handleChange.bind(this)}
                      placeholder={airline.Email}
                    />
                  ) : (
                    airline.Email
                  )}{" "}
                </td>

                <td>
                  {this.state.inEditMode.edited === true &&
                  this.state.inEditMode.rowKey === airline.ID ? (
                    <label
                      onClick={this.handleOnCancelEdit}
                      className="deleteAirlineBtn"
                    >
                      <FontAwesomeIcon icon={faUndo} />{" "}
                    </label>
                  ) : (
                    <label
                      onClick={() => this.handleOnDelete(airline)}
                      className="deleteAirlineBtn"
                    >
                      <FontAwesomeIcon icon={faTrash} />{" "}
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EditAirline;
