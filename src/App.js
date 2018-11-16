import React, { Component } from 'react';
// import './App.css';
import Header from './component/Header';
import Recommand from './page/recommand';
import HotSong from './page/hotSong';
import Search from './page/search';
// import { HashRouter as Router, Link } from "react-router-dom";
// const nav = ['推荐音乐','热歌榜','搜索'];
const nav = [
  {name:'推荐音乐',path:'/'},
  {name:'热歌榜',path:'/two'},
  {name:'搜索',path:'/three'},
]
class App extends Component {
  constructor(porps){
    super(porps);
    this.state={
      navIndex:0
    }
    this.switchNav=this.switchNav.bind(this);
    this.showPage=this.showPage.bind(this);
  }

  // componentDidMount(){
  //   console.log(this.props)
   
  // }
  // componentWillMount(){
  //   console.log(this.props)
  // }
  switchNav(index){
    this.setState({
      navIndex:index
    })
    // console.log(index)
  }
  
  showPage(index){
    switch (index){
      case 0:
        return <Recommand />;
      case 1:
        return <HotSong />;
      case 2:
        return <Search />;
      default:
        return <Recommand />;

    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <div className="topNav">
            <ul>
              {
                nav.map((navItem,i)=>{
                  return(
                    <li key={i}
                        onClick={()=>this.switchNav(i)}
                        className={i===this.state.navIndex?'active':''}
                    >{navItem.name}</li>
                  )
                })
              }
            </ul>
          </div>
          <div className="main">
            {this.showPage(this.state.navIndex)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
