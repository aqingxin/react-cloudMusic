import React , {Component} from 'react';


class Disc extends Component{
  constructor(props){
    super(props);
    // this.state={
    //   playState:props.isPlay
    // }
    this.switchPlay=this.switchPlay.bind(this);
  }

  switchPlay(){
   
    this.props.onChangeState();
  }

  render(){
    return(
      <div className="songImg">
        <div className="songDisc" onClick={this.switchPlay}>
          <div className={['songInfoImg',this.props.isPlay?'isPlay':'pause'].join(' ')}>
            <img src={this.props.discImg} alt="songImg" />
          </div>
          <div className="songLgour">
            <div className="disc"></div>
          </div>
          {
            !this.props.isPlay && 
            <div className="playIcon"></div>
          }
        </div>
      </div>
    )
  }
}

export default Disc