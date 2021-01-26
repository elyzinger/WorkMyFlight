import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState } from "react";
import "../mini_components/customer_css.css";

const BuyTicket = props => {
  var [numberOfAdults, setnumberOfAdults] = useState(0);
  let content = (
    <div className="buyTicketForm">
      <nav className="nav nav-pills justify-content-center flex-column flex-sm-row mynav">
        <NavDropdown
          className="flightType nav-link"
          title="Roundtrip"
          id="flightType"
        >
          <NavDropdown.Item>Roundtrip</NavDropdown.Item>
          <NavDropdown.Item>One way</NavDropdown.Item>
          {/* <NavDropdown.Item>Multi-city</NavDropdown.Item> */}
        </NavDropdown>
        <NavDropdown
          className="flightType nav-link"
          title="1 Traveler"
          id="flightType"
        >
          <NavDropdown.Item>
            <div>
              <label>adults/ 18 and older &nbsp; &nbsp;</label>
              <button
                onClick={() => {
                  setnumberOfAdults(numberOfAdults + 1);
                }}
              >
                +
              </button>
              <label>&nbsp; {numberOfAdults} &nbsp;</label>
              <button>-</button>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div>
              <label>adults/ 18 and older &nbsp; &nbsp;</label>
              <button>+</button>
              <label> 0 </label>
              <button>-</button>
            </div>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <div>
              <label>adults/ 18 and older &nbsp; &nbsp;</label>
              <button>+</button>
              <label> 0 </label>
              <button>-</button>
            </div>
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className="flightType nav-link"
          title="Economy"
          id="flightType"
        >
          <NavDropdown.Item>First class</NavDropdown.Item>
          <NavDropdown.Item>Business</NavDropdown.Item>
          <NavDropdown.Item>Premium economy</NavDropdown.Item>
          <NavDropdown.Item>Economy</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className="flightType nav-link"
          title="Any airline"
          id="flightType"
        >
          <NavDropdown.Item>airlines</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className="flightType nav-link"
          title="More options"
          id="flightType"
        >
          <NavDropdown.Item>Nonstop</NavDropdown.Item>
          <NavDropdown.Item>Refundable</NavDropdown.Item>
        </NavDropdown>
      </nav>
    </div>
  );
  return (
    <div className="buyTicket">
      <h4 className="miniTitle"> buy Ticket</h4>
      <div>{content}</div>
    </div>
  );
};

export default BuyTicket;
