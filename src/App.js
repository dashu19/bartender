import React from 'react';
import './App.css';

class Bartender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initial: true,
      drinklinks: [],
      drink: null,
      name: null,
      served: null,
      garnish: null,
      drinkware: null,
      ingredients: null,
      prep: null,
      timing: null,
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
    this.setState({initial: false});
  }

  getDrinkLinks2 = async () => {
    let drinklist = [];
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=wikitext&format=json&section=';
    const sections = ['2', '3', '4'];
    for (var i = 0; i < 3; i++){
      let response = await fetch(url+sections[i]);
      let json = await response.json();
      let dirty = json.parse.wikitext['*'];
      let cleaned = this.parseList(dirty);
      for (let j = 0; j < cleaned.length;j++){
        drinklist.push(cleaned[j][0]);
      }
    }
    // this.setState({drinklinks: drinklist});
    // this.setState({initial: false})
    console.log(typeof drinklist);
    console.log(drinklist);
    this.setState({drinklinks: drinklist});
    this.setState({initial: false});
  }

  parseList = (wikitext) =>{
    let cleaned = wikitext;
    cleaned = cleaned.slice(cleaned.indexOf('*'));
    cleaned = cleaned.slice(1,cleaned.indexOf('\n{{'));
    cleaned = cleaned.replace(/]/g,'');
    cleaned = cleaned.replace(/[[]/g,'');
    cleaned = cleaned.split('\n*');
    for (let i = 0; i<cleaned.length;i++){
      cleaned[i] = cleaned[i].trim();
      cleaned[i] = cleaned[i].split('|');
    }
    //console.log('in parseList', cleaned);
    return cleaned;
  }

  getDrinkInfo = async (n) => {
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&section=0&format=json&page=';
    const url1 = url + this.state.drinklinks[n];
    const response = await fetch(url1);
    const json = await response.json();
    let parsed = this.parseInfobox(json.parse.wikitext['*']);
    // console.log(typeof parsed);
    // console.log(parsed);
    //this.setState({name:parsed.name});
    console.log(n, this.state.drinklinks[n], parsed.name);
  }

  parseInfobox = (wikitext) => {
    let drink = {}
    let cleaned = wikitext;
    //cleaned = cleaned.slice(0, cleaned.indexOf("\n}}\n["));
    if(cleaned.indexOf('\n|')===-1){
      cleaned = cleaned.slice(cleaned.indexOf('\ n|')+4);
      cleaned = cleaned.split('\n |');
    } else {
      cleaned = cleaned.slice(cleaned.indexOf('\n|')+3);
      cleaned = cleaned.split('\n|');
    }

    for (let i = 0; i < cleaned.length; i++){
      cleaned[i] = cleaned[i].trim();
      cleaned[i] = cleaned[i].split('=');
      for (let j = 0; j < cleaned[i].length; j++){
        cleaned[i][j] = cleaned[i][j].trim();
        cleaned[i][j] = cleaned[i][j].replace(/]/g,'');
        cleaned[i][j] = cleaned[i][j].replace(/[[]/g,'');
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

  getDrink = async () => {
    for (let i = 0; i <this.state.drinklinks.length;i++){
      await this.getDrinkInfo(i);
    }
    // this.getDrinkLinks2();
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
    await this.getDrinkLinks2();
    await this.getDrinkInfo(48);
    await this.getDrinkInfo(51);
    // await this.getDrinkInfo(0);
    //await this.getPageIDs();
    console.log('endofdidmount');
  }

  componentDidUpdate = () => {
    // console.log(this.state.drink);
  }

  render = () => {
    return(
      <div>
        <button className="Bartender-button" onClick={() => this.getDrink()}>Make me a drink!</button>
        <div>{this.state.name}</div>
      </div>
    );
  }
}

export default Bartender;
