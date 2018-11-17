import React,{Component} from 'react';
import ListItem from '../component/ListItem';
// import bannerBg from '../asset/images/hot_music.jpg'
class HotSong extends Component{
  constructor(props){
    super(props);
    this.state={
      hotSongList:[]
    }
  }
  componentDidMount(){
    fetch('https://api.bzqll.com/music/netease/songList?key=579621905&id=3778678').then(res=>res.json())   //加载最新音乐数据
    .then((Response)=>{
      this.setState({
        hotSongList:Response.data.songs
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){
    const hotSongList=this.state.hotSongList.map((item,index)=>{
      return(
        <ListItem type="hotSong" songInfo={item} key={index}/>
      )
    })
    return (
      <div className="hotSong">
        <div className="hot-banner">
          <div className="big_icon"></div>
          <p>更新日期：12月21日</p>
        </div>
        <div className="hotSongName">
          <ul>
            {hotSongList}
          </ul>
        </div>
      </div>
    )
  }
}
export default HotSong