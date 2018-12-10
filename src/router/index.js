import React ,{ Component } from 'react'
import {HashRouter , Route,Switch} from "react-router-dom";
import App from '../App';
import Play from '../page/play';
import songsheet from '../page/songSheet'

class RouterMap extends Component{
  render(){
    return(
      <HashRouter >
        <Switch>
          <Route path="/" exact component={App} ></Route>
          <Route path="/play/:id" exact component={Play} />
          <Route path="/songsheet/:id" exact component={songsheet} />
        </Switch>
      </HashRouter >
    )
  }
}

export default RouterMap