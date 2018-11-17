import React,{Component} from 'react';


class SheetTop extends Component{
  render(){
    let bgStyle={
      backgroundImage:'url('+this.props.bgImg+')'
    }
    return(
      <section className="sheetHead" >
        <div className="sheetHeadBg" style={bgStyle}></div>
        <div className="sheetWrap">
          <div className="sheetWrapLeft">
            <img src={this.props.bgImg} alt="sheetImg" />
            <span>歌单</span>
            <i>{this.props.count}</i>
          </div>
          <div className="sheetWrapRight">
            <h2>{this.props.name}</h2>
            <div className="sheetAuth">
              <div className="avatar">
                <img src="http://p4.music.126.net/b_XEZD7U6UR_uYSg3-LfZw==/19042441881814960.jpg?param=30y30" alt="avatar" />
              </div>
              <span>NoOneCanBeFound</span>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default SheetTop