import React, {Component} from 'react';

class CreateNewAirline extends Component{

 state={

 };
//  componentDidMount = () => 
//  {
//     var url = 'http://localhost:61909/api/AnonymousFacade/GetCountries';

//     Axios({
//         method:"GET",
//         url:url,
//         // headers: {'Authorization': 'Basic ' + localStorage.getItem('token')},
//     }).then(
//         (res) =>{
//             this.setState({countries: res.data})
//             console.log(this.state.countries)
//         },
//         (error) =>{
//             console.log(error.response)
//         }
//     )
//  }
 render(){
     return(
         
         <div >

             {/* <!-- airline registration form --> */}
             <div className="form-popup"  id="airlineForm">
             {/* key = changing the key for reseting the form  */}
             {/* on submit = adding the new airline to the sign in */}
                <form key={this.props.airlineFormKey} id="newAirlineForm"  onSubmit={this.props.submitAirline} className="form-container">
                    <h1> Create New Airline</h1>
             {/*handle change = adding the value by id to login state  */}
                    <input type="text" id="airlineName" placeholder=" CompanyName" name="companyName" onChange={this.props.handleChange} required></input>
                    <input type="text" id="airlineUsrName" placeholder=" UserName" name="userName" onChange={this.props.handleChange} required></input>
                    <input type="password" id="airlinePassword" placeholder="Password" name="psw" onChange={this.props.handleChange} required></input>
                    <input type="password" id="airlineConfirmedPassword" placeholder="Confirm Password" name="psw" onChange={this.props.handleChange} required></input>
                    <input type="email" id="airlineEmail"  placeholder=" Email" name="email" onChange={this.props.handleChange} required></input>
                    <select id="countryCode" onChange={this.props.handleChange}  value={this.state.country} >
                    {this.props.countries.map((country) => (
                    <option key={country.ID} value={country.ID}>{country.CountryName}</option>
                         ))}
                    </select>

                    <button type="submit" className="btn"> Register</button>
                    <button type="button" className="btn cancel" id="closeAirlineForm" onClick={this.props.loginFormOptions}> Close</button>
                    <h6><label className="formReg" id="backToLogin"  onClick={this.props.loginFormOptions} >Back To Login</label></h6>  
                </form>
            </div>

         </div>
     )
 }
}

export default CreateNewAirline;