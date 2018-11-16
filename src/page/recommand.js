import React,{Component} from 'react';
import ListItem from '../component/ListItem';
import { Link } from "react-router-dom";
const songSheetList=[
  {name:'我喜欢的音乐',id:'105544584',img:'https://p1.music.126.net/17shzKv3znJNCiPqhmpdwA==/18552059697352327.jpg?param=200y200'},
  {name:'rap god',id:'2029964366',img:'https://p1.music.126.net/6QZgG-vTNAeewSH3prKrdg==/109951163645952035.jpg?param=200y200'},
  {name:'ElectronicMusic',id:'591013070',img:'https://p2.music.126.net/lUUt5uz5U-0a-IKU9jWCKw==/109951163626923739.jpg?param=200y200'},
  {name:'E.A',id:'601803454',img:'https://p2.music.126.net/-LN84LNds2oDX8Eyh4MvgA==/109951163633298358.jpg?param=200y200'},
  {name:'R.E.A',id:'2005300599',img:'https://p2.music.126.net/FF7ylyrNXj0IJh4KwZIiBw==/1750422511419407.jpg?param=200y200'},
  {name:'childhood',id:'2280292510',img:'https://p1.music.126.net/7dQ_IyTVvgVOYwEJ5AgQaw==/109951163372626539.jpg?param=200y200'},
];    //定死的推荐歌单数据



class Recommand extends Component{
  constructor(){
    super();
    this.state={
      newSongList:[],
      
    }
  }
  componentDidMount(){
    fetch('https://api.bzqll.com/music/netease/songList?key=579621905&id=60198').then(res=>res.json())   //加载最新音乐数据
    .then((Response)=>{
      this.setState({
        newSongList:Response.data.songs
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){
    const listItems=this.state.newSongList.map((item,index)=>{
      return <ListItem  type="newSong" songInfo={item} key={index} />
    })
    return (
      <div className="recommand">
        <div className="recommandTitle">
          推荐歌单
        </div>
        <div className="songSheet">
          {
            songSheetList.map((sheetItem,i)=>{   //推荐歌单列表
              return(
                <Link to={'/songsheet/'+sheetItem.id} key={i}>
                  <div className="sheetItem">
                    <div className="sheetItemImg">
                      <img src={sheetItem.img} key={i} alt="sheetImg" />
                    </div>
                    <div className="sheetName">
                      {sheetItem.name}
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
        
        <div className="recommandTitle">
          最新音乐
        </div>
        <div className="newSongList">
          <ul>{listItems}</ul>
        </div>
      </div>
    )
  }
}

export default Recommand