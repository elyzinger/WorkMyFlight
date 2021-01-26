// import React, { Component } from 'react';

// class DropDown extends Component {
//     constructor() {
//         super();
        
//         this.state = {
//           showMenu: false,
//         }
//         this.showMenu = this.showMenu.bind(this);
//         this.closeMenu = this.closeMenu.bind(this);
//     }
//     showMenu(event) {
//         event.preventDefault();
        
//         this.setState({ showMenu: true }, () => {
//           document.addEventListener('click', this.closeMenu);
//         });
//       }
//       closeMenu() {
//         this.setState({ showMenu: false }, () => {
//           document.removeEventListener('click', this.closeMenu);
//         });
//       }
//     render() {
//         return (
//           <div  className="btn-group">
//             <button onClick={this.showMenu} type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               Show menu
//             </button>
            
//             {
//               this.state.showMenu
//                 ? (
//                     <div className="dropdown-menu manu">
//                          <button className="dropdown-item" type="button">Action</button>
//                          <button className="dropdown-item" type="button">Another action</button>
//                          <button className="dropdown-item" type="button">Something else here</button>
//                      </div>
//                 )
//                 : (
//                   null
//                 )
//             }
//           </div>
//         );
//       }
//     }
    
// export default DropDown; 