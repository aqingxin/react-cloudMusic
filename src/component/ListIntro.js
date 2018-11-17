import React,{Component} from 'react';


class ListIntro extends Component{
  render(){
    let desc=this.props.desc;
    if(desc===''||desc===null){
      desc='无';
    }
    return(
      <section className="listIntro">
        <div className="intro">
          <div className="introMain">
            简介：{desc}
          </div>
        </div>
      </section>
    )
  }
}

export default ListIntro;