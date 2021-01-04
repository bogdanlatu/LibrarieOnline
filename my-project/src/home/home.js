import React, {Component} from 'react';
import './home.css';


class Home extends Component {
    
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div className="home-page">
                <i className="fa fa-home fa-fw"></i>
                <h2>Welcome To</h2>
                <h1>DigiLib</h1>

            </div>
        );
    }
}

export default Home;