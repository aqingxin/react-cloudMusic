import React,{Component} from 'react';
import logo from '../logo.svg'
class Header extends Component{
  render(){
    return (
      <div className="appHeader">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="downloadApp">
          下载APP
        </div>
      </div>
    )
  }
}

export default Header