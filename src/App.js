import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import 'font-awesome/css/font-awesome.css';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      start100Days:[],
      start100Time:[],
      current: true
    }
  }  

getLeaderboardData(url,stateName){
  axios.get(url).then(({data})=>{
      this.setState({
        [stateName]:data
      });
      console.log(this.state.start100Days);
  })
}

ptChange(value){
  if(this.state.current !== value){
    this.setState({current: value});
  }
}

componentDidMount(){
  this.getLeaderboardData('https://fcctop100.herokuapp.com/api/fccusers/top/recent',"start100Days");
  this.getLeaderboardData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime',"start100Time");
}

  render() {
    
    return (
      <div className="App container">
       <div className="row">
          <div className="col-sm-12 freecodecamp_header">
          <h1>Free Code Camp</h1>
					<h3>Camper Leaderboard</h3>
          </div>
       </div> 

        <Table striped bordered  condensed hover className="colorTable">
          <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={(event)=>this.ptChange(true)}>Points(30 Days) {this.state.current &&  <i className="fa fa-caret-down"></i>}</th>
            <th onClick={(event)=>this.ptChange(false)}>All Time Points {this.state.current===false && <i className="fa fa-caret-down"></i>}</th>
          </tr>
          </thead>
          <tbody>
           {this.state.current && (this.state.start100Days.map((row,index)=>(
              <tr key={row.username}>
                 <td>{index+1}</td>
                 <td><a href={`https://www.freecodecamp.org/${row.username}`}>
                  <Image className="imgHeight" src={row.img} circle/>{row.username}
                  </a>
                 </td>
                 <td>{row.recent}</td>
                 <td>{row.alltime}</td>
              </tr>
           )
           ))}
           {this.state.current===false && (this.state.start100Time.map((row,index)=>(
              <tr key={row.username}>
                 <td>{index+1}</td>
                 <td><a href={`https://www.freecodecamp.org/${row.username}`}>
                  <Image className="imgHeight" src={row.img} circle/>{row.username}
                  </a>
                 </td>
                 <td>{row.recent}</td>
                 <td>{row.alltime}</td>
              </tr>
           )
           ))}
            
          </tbody>
          
        </Table>
      </div>
    );
  }
}

export default App;
