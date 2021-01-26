import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import AddFlight from './mini_components/AddFlight';
import AirlineProfile from './mini_components/AirlineProfile';
import EditFlights from './mini_components/EditFlights';

class Airline extends Component{
    state = {

    }
    render(){
        return(
            <BrowserRouter>
            <div className="airline">
                 <h2 className="userTitle"> Welcome Airline...!</h2>

                 <nav className="airlineNav">
               <NavLink to="/airline/profile"><button className= "airline-nav-btn"> Your Profile </button></NavLink>
               <NavLink to="/airline/edit_flights"><button className= "airline-nav-btn"> Edit Flights </button></NavLink>
               <NavLink to="/airline/add_flight"><button className= "airline-nav-btn"> Add Flight </button></NavLink>        
 
               </nav>
               <br/>
               <Route exact path='/airline/add_flight' component={AddFlight}/>
               <Route exact path='/airline/profile' component={AirlineProfile}/>
               <Route exact path='/airline/edit_flights' component={EditFlights}/>
            </div>
            </BrowserRouter>
        )
    }
}

export default Airline;