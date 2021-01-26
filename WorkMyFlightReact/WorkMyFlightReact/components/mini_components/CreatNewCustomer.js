import React, {Component} from 'react';
import InputMask from 'react-input-mask';

class CreateNewCustomer extends Component{
 state={

 }
 render(){
     return(
         
            //  {/* customer registration form */}
             <div className="form-popup"  id="customerForm">
        <form key={this.props.customerFormKey} onSubmit={this.props.submitAirline} id="customer" className="form-container">
            <h1> Create New Customer</h1>

            <input type="text" id="firstName" placeholder="First Name" name="FirstLastName" onChange={this.props.handleChange}  required></input>
            <input type="text" id="lastName" placeholder="Last Name" name="FirstLastName" onChange={this.props.handleChange} required></input>     
            <input type="text" id="customerUserName" placeholder="UserName" name="UserName" onChange={this.props.handleChange} required></input>
            <input type="password" id="customerPassword" placeholder="Password" name="psw" onChange={this.props.handleChange} required></input>
            <input type="password" id="customerCofirmedPassword" placeholder="Confirm Password" name="psw" onChange={this.props.handleChange} required></input>
            <input type="email" id="customerEmail" placeholder="Email" name="email" onChange={this.props.handleChange} required></input>
            <input type="text" id="address" placeholder="Address" name="Address" onChange={this.props.handleChange} required></input>
            <InputMask mask="+\972 999-9999999" maskChar={null} type="text" id="phoneNumber" placeholder="Phone Number" name="PhoneNumber" onChange={this.props.handleChange} required></InputMask>
           <InputMask  mask="9999  9999  9999  9999  99/99   9999" maskChar={null} type="text" id="creditCardNumber" placeholder="CC Number - DATE - CVV"  name="CreditCardNumber" onChange={this.props.handleChange} required></InputMask>

            <button type="submit" className="btn"> Register</button>
            <button onClick={this.props.loginFormOptions} id="closeCustomerForm" type="button" className="btn cancel"> Close</button>

            <h6><label className="formReg" id="backToLogin" onClick={this.props.loginFormOptions} >Back To Login</label></h6>  
           
             </form>
         </div>

         
     )
 }
}

export default CreateNewCustomer;