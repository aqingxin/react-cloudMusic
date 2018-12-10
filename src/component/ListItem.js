import React,{Component} from 'react';

import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

class ListItem extends Component{
  constructor(props){
    super(props)
    this.state={
      source:'',
      jump:false
    }
    this.jumpRouter=this.jumpRouter.bind(this);
  }
  jumpRouter(){
    // this.props.history.push({
    //   pathname:'/play',
    //   state:{
    //     id:3
    //   }
    // })
    // this.props.history.push('play')
    this.setState({
      jump:true
    })
  }
  render(){
    if(this.state.jump){
      return <Redirect to={{path:'/play',state:{"id":this.props.songInfo.id}}} />;   //重定向  跳路由
    }
    let itemIndex=this._reactInternalFiber.key*1+1<10?'0'+(this._reactInternalFiber.key*1+1):this._reactInternalFiber.key*1+1;  //列表的index
    return (
      <li className={['newSongItem',this.props.type==='newSong'?'':'hotSongItem'].join(' ')} onClick={this.jumpRouter}>
      <Link to={'/play/'+this.props.songInfo.id}>
        <span className="itemIndex">
          {
            this.props.type==='hotSong'&&
            itemIndex
          }
        </span>
        <div>{this.props.songInfo.name}</div>
        <p>
          <i>SQ</i>
          {this.props.songInfo.singer}
        </p>
        <div className="indexPlayIcon"></div>

      </Link>
      
    </li>
    )
  }
}

export default ListItem