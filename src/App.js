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
      data: 'initial',
      drinklinks: []
    };
  }

  getDrinkListFromSection = async (n) => {
    let sectionlist = [];
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=links&format=json&section=';
    const response = await fetch(url+n);
    const json = await response.json();
    json.parse.links.forEach(function(item){
      sectionlist.push(item['*']);
    });
    console.log(sectionlist);
    return sectionlist;

  }

  getDrinkList = async () => {
    let drinklist = [];
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=links&format=json&section=';
    const url1 = url + '2';
    const url2 = url + '3';
    const url3 = url + '4';
    const response1 = await fetch(url1);
    const json1 = await response1.json();
    json1.parse.links.forEach(function(item){
      drinklist.push(item['*']);
    });
    const response2 = await fetch(url2);
    const json2 = await response2.json();
    json2.parse.links.forEach(function(item){
      drinklist.push(item['*']);
    });
    const response3 = await fetch(url3);
    const json3 = await response3.json();
    json3.parse.links.forEach(function(item){
      drinklist.push(item['*']);
    });


    // const sections = ['2', '3', '4'];
    // for (let i = 0; i < 3; i++){
    //   let sectionlist = this.getDrinkListFromSection(sections[i]);
    //   drinklist.push(sectionlist);
    // }
    // const response = await fetch(url);
    // const json = await response.json();
    // let drinklist = [];
    // const test = json.parse.links[0]['*'];
    // json.parse.links.forEach(function(item){
    //   drinklist.push(item['*']);
    // });
    // this.setState({drinklinks: data});
    console.log(drinklist);
    this.setState({data: drinklist});
  }

  fetchtest3 = async () => {
    const response = await fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json');
    const json = await response.json();
    let processed = json.query.pages['736'].links[3].title;
    this.setState({data: processed});
  }


  componentDidMount = async () => {
    //await this.fetchtest3();
    //await this.getDrinkListFromSection('2');
    await this.getDrinkList();
    console.log('endofdidmount');
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
