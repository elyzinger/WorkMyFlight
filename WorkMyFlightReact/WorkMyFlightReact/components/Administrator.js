import React, { Component } from 'react';
import '../App.css' ;
import { NavLink } from 'react-router-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import AdminInbox from './mini_components/AdminInbox';
import EditCustomer from './mini_components/EditCustomer';
import EditAirline from './mini_components/EditAirlines';


class Administrator extends Component{
    state = {
        
    }
 
    render(){
        return(
            <BrowserRouter>
            <div className="admin">
               <h2 className="userTitle"> Welcome Admin...!</h2>
            <nav className="adminNav">
           
               <NavLink  to="/admin/inbox"> <button className= "admin-nav-btn" > Inbox </button></NavLink>
               <NavLink  to="/admin/airlines"><button className= "admin-nav-btn" > Airlines </button> </NavLink>
              <NavLink  to="/admin/customers"><button className= "admin-nav-btn"> Customers </button></NavLink>            
             
               </nav>
               <br/>
               <Route exact path='/admin/inbox' component={AdminInbox}/>
               <Route exact path='/admin/airlines' component={EditAirline}/>
               <Route exact path='/admin/customers' component={EditCustomer}/>
            </div>
            </BrowserRouter>
        )
    }
}

export default Administrator;