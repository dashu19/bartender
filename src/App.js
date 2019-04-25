import React from 'react';
// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// class Dummy extends React.Component{
//   render = () => {
//     return(
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Welcome />
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//
//     );
//   }
// }
//
// class Welcome extends React.Component{
//   render(){
//     return(
//       <h1 className="App-title">blah blah blah</h1>
//     );
//   }
// }

// function fetchtest(){
//   console.log('fetch test start');
//   let array = [];
//   fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json')
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(data){
//       array.push(JSON.stringify(data));
//       console.log(array);
//     });
//   console.log(array);
//   return array;
//   // return JSON.stringify(data);
//   //console.log(data);
// }


class Bartender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initial: true,
      data: 'initial',
      drinklinks: []
    };
  }

  getDrinkList = async () => {
    let drinklist = [];
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=links&format=json&section=';
    const sections = ['2', '3', '4'];
    for (var i = 0; i < 3; i++){
      let response = await fetch(url+sections[i]);
      let json = await response.json();
      json.parse.links.forEach(function(item){
        drinklist.push(item['*']);
      });
    }

    // console.log(drinklist);
    this.setState({data: drinklist});
    this.setState({initial: false})
  }

  getDrinkInfo = async () => {
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&section=0&format=json&page=';
    const url1 = url + this.state.data[53];
    const response = await fetch(url1);
    const json = await response.json();
    let parsed = json.parse.wikitext['*'];
    console.log(typeof parsed);
    console.log(parsed);
  }

  fetchtest3 = async () => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json');
    const json = await response.json();
    let processed = json.query.pages['736'].links[3].title;
    this.setState({data: processed});
  }

  dummylist = () => {
    let ret = []
    this.state.data.forEach(function(item, i){
      ret.push(<li key={i}>{item}</li>);
    });
    return ret;

  }


  componentDidMount = async () => {
    //await this.fetchtest3();
    await this.getDrinkList();
    await this.getDrinkInfo();
    console.log('endofdidmount');
  }

  render = () => {
    if (this.state.initial === true){
      return(
        <div className="Bartender"></div>
      );
    } else {
      return(
        <div className="Bartender"><ul>{this.dummylist()}</ul></div>
      );
    }
  }
}

export default Bartender;
