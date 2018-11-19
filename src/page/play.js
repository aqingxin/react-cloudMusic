import React,{Component} from 'react';
import Lyric from '../component/Lyric';  //歌词组件
import Disc from '../component/Disc';
var currentIndex=0;
class Play extends Component {
  constructor(props){
    super(props)
    this.state={
      playInfo:[],
      lyric:[],
      isPlay:false,
      currentTime:'',
      currentIndex:0
    }
    this.switchPlay=this.switchPlay.bind(this);
    this.getLrc=this.getLrc.bind(this);
    this.changeLrc=this.changeLrc.bind(this);
    this.lrcTranslate=this.lrcTranslate.bind(this);
    this.audioTimeUp=this.audioTimeUp.bind(this);
    // this._currenTime=this._currenTime.bind(this);
  }
  componentDidMount(){
    //请求歌曲的信息
    fetch(`https://api.bzqll.com/music/netease/song?key=579621905&id=${this.props.match.params.id}`).then((res)=>res.json())
    .then((Response)=>{
      // console.log(Response)
      this.setState({
        playInfo:Response.data
      })
      this.getLrc(Response.data.lrc);
    })
    .catch((err)=>{
      console.log(err)
    })
    
    const music=this.refs.music;   //改变audio的播放状态
    music.addEventListener('loadeddata',()=>{
      this.setState({
        isPlay:true
      })
    })
    music.addEventListener('timeupdate',this.audioTimeUp)
  }
  audioTimeUp(){   //获取audio当前播放的时间
    let timeNow=parseInt(this.refs.music.currentTime);
      this.setState({
        currentTime:timeNow
      })
  }
  componentWillUnmount(){   //离开页面时移除audio的监听事件
    const music=this.refs.music;
    music.removeEventListener('timeupdate',this.audioTimeUp,false)
  }
 
  getLrc(lrcUrl){   //获取歌词
    // console.log(lrcUrl)    //歌词数据只能以text形式返回
    fetch(lrcUrl).then((res)=>res.text())
    .then((Response)=>{
      console.log(Response)
      this.changeLrc(Response)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  changeLrc(lrc){   //对歌词与事件进行格式
    var lyrics=lrc.split('\n');    //通过歌词的换行转换为数组
    var lrcObj=[];
    var timeReg=/\[\d*:\d*((\.|\:)\d*)*\]/g;
    for(var i=0;i<lyrics.length;i++){
      var timeRegExpArr=lyrics[i].match(timeReg);   //匹配出歌词的时间
      if(!timeRegExpArr) continue;
      var txt=lyrics[i].replace(timeReg,'');  //匹配出歌词文本
      for(var k=0;k<timeRegExpArr.length;k++){
          var array={};
          var t=timeRegExpArr[k];
          var min=Number(String(t.match(/\[\d*/i)).slice(1)),   //将时间的分钟和秒数进行切割
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
          var time=min * 60 + sec   //最终转换为秒数
          array.time=time;
          array.txt=txt;
          lrcObj.push(array);
      }
    }
    this.setState({
      lyric:lrcObj
    })
  }
  songUrl(id){   //audio的播放地址
    return `https://api.bzqll.com/music/netease/url?key=579621905&id=${id}&br=999000`;
  }

  switchPlay(){   //切换audio的播放状态
    const music=this.refs.music;
    this.setState({
      isPlay:!this.state.isPlay
    })
    setTimeout(()=>{
      if(this.state.isPlay===true){
        music.play();
      }else{      
        music.pause();
      }

    },0)
  }

  lrcTranslate(lrc){   //计算每次歌词滚动的距离
    for(let i=0;i<lrc.length;i++){
      if(lrc[i].time===this.state.currentTime){
        currentIndex=i
        break;
      }
    }
    return currentIndex
  }

  render(){
    var bgImg={
      backgroundImage:'url('+this.state.playInfo.pic+')'
    }

    return(
      <div className="play">
        <audio src={this.songUrl(this.props.match.params.id)} ref='music' autoPlay="autoplay"></audio>
        <div className="playBg" style={bgImg}></div>
        <div>
          <Disc onChangeState={this.switchPlay} discImg={this.state.playInfo.pic} isPlay={this.state.isPlay} />
          <Lyric songName={this.state.playInfo.name} singer={this.state.playInfo.singer} lyric={this.state.lyric} currentIndex={this.lrcTranslate(this.state.lyric)}/>
          <div className="bottomBtn">
            <div className="openBtn">打开</div>
            <div className="downloadBtn">下载</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Play