import React,{Component} from 'react';

class Lyric extends Component{
  constructor(props){
    super(props);
    this.state={

    }
    this.lrcTranslate=this.lrcTranslate.bind(this);
  }
  lrcTranslate(lrc){   //计算每次歌词滚动的距离
    
    for(let i=0;i<lrc.length;i++){
      if(lrc[i].time===this.state.currentTime){
        this.props.currentIndex=i
        break;
      }
    }
    return -(this.props.currentIndex)*49
  }
  render(){
    var lrcStyle={   //歌词每次滚动的距离
      transform:'translateY('+this.lrcTranslate(this.props.lyric)+'px)'
    }
    return(
      <div className="lyric">
        <h2>{this.props.songName}-{this.props.singer}</h2>
        <div className="lyricList">
          <ul style={lrcStyle}>
            {
              this.props.lyric.map((item,index)=>{
                return (
                  <li className={['lrcItem',this.props.currentIndex===index?'current':''].join(' ')} key={index}>{item.txt}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default Lyric