import React, {Component} from 'react';
import '../App.css'; 
import Card from 'react-bootstrap/Card';

class Footer extends Component{
    state = {

    }
    render(){
        return(
            <div className="footer">
            <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <button variant="primary">Go somewhere</button>
            </Card.Body>
            </Card> 
            </div>
        )}
}

export default Footer;