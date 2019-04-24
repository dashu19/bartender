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
      initial: false,
      data: 'initial'
    };
  }

  dummy(){
    return 'doesthiswork?';
  }

  fetchtest = () => {
    let mydata = "fetchinitial";
    fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json')
      .then(response => {
          return response.json();
      })
      .then(data => {
          mydata = JSON.stringify(data);
          // console.log(mydata);
          this.setState({data: mydata});
      })
      .catch(err => {
        console.log('error using fetch');
      });
      console.log('before return');
      console.log(mydata);
      return mydata;
  }

  fetchtest2 = async () => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json');
    const json = await response.json();
    let processed = json.query.pages['736'].links[0].title;
    processed = JSON.stringify(processed);
    console.log(processed);
    processed = 'hello';
    return processed;
  }

  fetchtest3 = async () => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json');
    const json = await response.json();
    let processed = json.query.pages['736'].links[3].title;
    console.log(processed);
    return processed;
  }

  fetchcaller = () => {
    return this.fetchtest3();
  }

  componentDidMount = async () => {
    let myvar = await this.fetchtest3();
    this.setState({data: myvar});
    console.log('last from did mount');
  }

  render = () => {
    let string = this.state.data;
    if (this.state.initial === true){
      return(
        <div className="Bartender">{string}</div>
      );
    } else {
      return(
        <div className="Bartender">{string}</div>
      );
    }
  }
}

export default Bartender;
