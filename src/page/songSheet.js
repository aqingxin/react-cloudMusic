import React,{Component} from 'react';
import ListItem from '../component/ListItem';
import SheetTop from '../component/SheetTop';
import ListIntro from '../component/ListIntro';


class songSheet extends Component{
  
  constructor(props){
    super();
    this.state={
      songSheetInfo:[]
    }
  }
  componentWillMount(){    //获取歌单的歌曲
    console.log(this.props)
    fetch(`https://api.bzqll.com/music/netease/songList?key=579621905&id=${this.props.match.params.id}&limit=100`).then((res)=>res.json())
    .then((Response)=>{
      console.log(Response)
      this.setState({
        songSheetInfo:Response.data
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render(){
    let song=this.state.songSheetInfo.songs;
    let listItems;
    // console.log(song)
    if(song!==undefined){
      listItems=song.map((item,index)=>{
        return <ListItem  type="newSong" songInfo={item} key={index} />
      })
    }
    
    return(
      <div className="songSheetDetail">
        <SheetTop bgImg={this.state.songSheetInfo.songListPic} name={this.state.songSheetInfo.songListName} count={this.state.songSheetInfo.songListPlayCount} />
        <ListIntro desc={this.state.songSheetInfo.songListDescription} />
        <div className="songsheetList">
          <div className="songsheetListTitle">歌曲列表</div>
          <div className="list">
            <ul>
              {listItems}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default songSheet