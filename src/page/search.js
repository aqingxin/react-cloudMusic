import React , {Component} from 'react';
import ListItem from '../component/ListItem';
import LoadingGif from '../asset/images/loading.gif';

class Search extends Component{
  constructor(props){
    super()
    this.state={
      hotSongList:['Avicii','post malone','21 savage','Rich Brian','Eminem','xxxTETACION','Drake','Wiz Khalifa','6ix9ine'],   //热门搜索数据
      searchValue:'',  //input框value值
      localStorageData:[],   //搜素历史数据
      searchResult:[],    //搜索出来的结果
      searchFlag:false,   
      loadingGifShow:false    //loading状态的显示与否
    }
    this.inputChange=this.inputChange.bind(this);
    this.onSearch=this.onSearch.bind(this);
    this.search=this.search.bind(this);
    this.clickSearch=this.clickSearch.bind(this);
    this.hisotyClick=this.hisotyClick.bind(this);
    this.storeStorage=this.storeStorage.bind(this);
  }
  componentDidMount(){
    if(localStorage.getItem('history')!==null){  //获取本地存储的历史搜索记录
      this.setState({
        localStorageData:JSON.parse(localStorage.getItem('history'))
      })
    }
  }
  inputChange(e){   //input框的输入事件
    if(e.target.value===''){
      this.setState({
        searchFlag:false,
        searchResult:[]    //input框的值为空时清除搜索结果
      })
    }
    this.setState({
      searchValue:e.target.value
    })
    
  }
  onSearch(e){   //回车进行搜索
    if(e.which===13){
      this.storeStorage(this.state.searchValue)
      this.search();
    }
  }
  clickSearch(index){   //点击热门搜索的数据进行搜索
    // let tmp=this.state.localStorageData;
    // if(tmp.indexOf(this.state.hotSongList[index])>-1){   //判断搜索历史里是否有该值，如果就把它移到第一位
    //   tmp.splice(tmp.indexOf(this.state.hotSongList[index]),1)
    //   tmp.unshift(this.state.hotSongList[index]);
    // }else{   //如果没有，就直接从头部插入
    //   tmp.unshift(this.state.hotSongList[index]);
    // }
    // this.setState({
    //   searchValue:this.state.hotSongList[index],
    //   localStorageData:tmp
    // })
    // localStorage.setItem('history',JSON.stringify(this.state.localStorageData));
    this.storeStorage(this.state.hotSongList[index])
    this.setState({
      searchValue:this.state.hotSongList[index],
    })
    setTimeout(()=>{
      this.search()
    },0)
  }
  storeStorage(content){   //对搜索的内容进行存进本地存储，作为历史搜索记录
    let tmpStorage=this.state.localStorageData;
    if(tmpStorage.indexOf(content)>-1){   //判断本地存储有无该条数据，如果有就移动数组地位
      tmpStorage.splice(tmpStorage.indexOf(content),1);
      tmpStorage.unshift(content);
    }else{    //如果没有就直接存进数组头部
      tmpStorage.unshift(content);
    }
    this.setState({
      localStorageData:tmpStorage
    })
    localStorage.setItem('history',JSON.stringify(this.state.localStorageData));
  }
  deleteHistory(e,index){    //删除历史搜素记录
    // console.log(e)
    e.preventDefault();
    e.stopPropagation();
    let tmp=this.state.localStorageData;
    tmp.splice(index,1);
    this.setState({
      localStorageData:tmp
    })
    localStorage.setItem('history',JSON.stringify(this.state.localStorageData));
  }
  hisotyClick(item){  //点击历史搜索记录进行搜素
    this.setState({
      searchValue:item
    })
    this.storeStorage(item)
    setTimeout(()=>{
      this.search()
    },0)
  }
  search(){   //搜索的主要请求
    this.setState({
      LoadingGif:true,
      searchFlag:true
    })
    fetch(`https://api.bzqll.com/music/netease/search?key=579621905&s=${this.state.searchValue}&limit=20&offset=0`).then((res)=>res.json())
    .then((Response)=>{
      this.setState({
        searchResult:Response.data,
        LoadingGif:false
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render(){
    const listItem=this.state.hotSongList.map((item,index)=>{   //热门搜索数据渲染
      return(
        <li key={index} onClick={()=>this.clickSearch(index)}>{item}</li>
      )
    })

    const historyItem=this.state.localStorageData.map((item,index)=>{
      return (
        <li className="historyItem" key={index} onClick={()=>this.hisotyClick(item)}>
          {item}
          <i onClick={(e)=>this.deleteHistory(e,index)}></i>
        </li>
      )
    })

    const resultItem=this.state.searchResult.map((item,index)=>{
      return (
        <ListItem songInfo={item} key={index} type='newSong'  />
      )
    })
    return(
      <div className="search">
        <div className="searchBox">
          <div className="searchMain">
            <input typet="text" placeholder="搜索歌曲、歌手、专辑" value={this.state.searchValue} onKeyPress={this.onSearch} onChange={this.inputChange} />
          </div>
        </div>
        {
          !this.state.searchFlag && 
          <div className="hotSearch">
            <h3 className="hotSearchTitle">热门搜索</h3>
            <div className="hotSongList">
              <ul>{listItem}</ul>
            </div>
          </div>
        }
        {
          !this.state.searchFlag && 
          <div className="history">
            <ul>{historyItem}</ul>
          </div>
        }
        {
          this.state.LoadingGif && 
          <div className="loadingGif">
            <img src={LoadingGif} alt="loading"/>
          </div>
        }
        {
          this.state.searchFlag &&
          <div className="searchResult">
            <ul>
              {resultItem}
            </ul>
          </div>
        }
      </div>
    )
  }
}

export default Search