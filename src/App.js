import React from 'react';
import './App.css';

class Bartender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initial: true,
      drinklinks: [],
      drink: null
    };
  }

  getDrinkLinks = async () => {
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
    this.setState({drinklinks: drinklist});
    this.setState({initial: false})
  }

  getDrinkInfo = async (n) => {
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&section=0&format=json&page=';
    const url1 = url + this.state.drinklinks[n];
    const response = await fetch(url1);
    const json = await response.json();
    let parsed = this.parseInfobox(json.parse.wikitext['*']);
    // console.log(typeof parsed);
    // console.log(parsed);
    this.setState({drink:parsed});
  }

  parseInfobox = (wikitext) => {
    let drink = {}
    let cleaned = wikitext;
    cleaned = cleaned.slice(cleaned.indexOf('{{Infobox'));
    cleaned = cleaned.slice(2, cleaned.indexOf("\n}}\n"));
    cleaned = cleaned.split('\n|');
    for (let i = 0; i < cleaned.length; i++){
      cleaned[i] = cleaned[i].trim();
      cleaned[i] = cleaned[i].split('=');
      for (let j = 0; j < cleaned[i].length; j++){
        cleaned[i][j] = cleaned[i][j].trim();
      }
      if (cleaned[i][0] === "name"){
        drink.name = cleaned[i][1];
      } else if (cleaned[i][0] === "served"){
        drink.served = cleaned[i][1];
      } else if (cleaned[i][0] === "garnish"){
        drink.garnish = cleaned[i][1];
      } else if (cleaned[i][0] === "drinkware"){
        drink.drinkware = cleaned[i][1];
      } else if (cleaned[i][0] === "ingredients"){
        drink.ingredients = cleaned[i][1].split('\n');
      } else if (cleaned[i][0] === "prep"){
        drink.prep = cleaned[i][1];
      } else if (cleaned[i][0] === "timing"){
        drink.timing = cleaned[i][1];
      }
    }
    return drink;

  }

  // getPageIDs = async () => {
  //   const url = 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&redirects=true&prop=&page=';
  //   for (let i = 0; i < this.state.drinklinks.length; i++){
  //     let response = await fetch(url+this.state.drinklinks[i]);
  //     let json = await response.json();
  //     console.log(json.parse.pageid, json.parse.title);
  //   }
  // }

  // fetchtest3 = async () => {
  //   const response = await fetch('https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=Albert+Einstein&prop=links&format=json');
  //   const json = await response.json();
  //   let processed = json.query.pages['736'].links[3].title;
  //   this.setState({data: processed});
  // }

  dummylist = () => {
    let ret = []
    this.state.drinklinks.forEach(function(item, i){
      ret.push(<li key={i}>{item}</li>);
    });
    return ret;

  }


  componentDidMount = async () => {
    //await this.fetchtest3();
    await this.getDrinkLinks();
    await this.getDrinkInfo(53);
    await this.getDrinkInfo(0);
    //await this.getPageIDs();
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
