import React, {Component} from 'react';
import './search.css';


class Search extends Component {
    
    constructor(props){
        super(props);
    }
    
    render() {
        return(
            <div className="search-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="active-cyan-3 active-cyan-4 mb-4">
                                <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Search;