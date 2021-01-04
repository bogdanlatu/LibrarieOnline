import React, {Component} from 'react';
import './qrcode.css';
import QrReader from 'react-qr-scanner';


class QrCode extends Component {
    
constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }
    this.handleScan = this.handleScan.bind(this)
  }
    
handleScan(data){
    this.setState({
      result: data,
    })
  }

    handleError(err){
    console.error(err)
  }
    
   render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }
 
    return(
      <div>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QrCode;