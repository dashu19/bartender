import React from 'react';
import './App.css';

//still need to figure out how to handle drinks that are variations, '#' in the linke
//still need to figure out how to handle infoboxs that dont haveinformation

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
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=wikitext&format=json&section=';
    const sections = ['2', '3', '4'];
    for (var i = 0; i < 3; i++){
      let response = await fetch(url+sections[i]);
      let json = await response.json();
      let dirty = json.parse.wikitext['*'];
      let cleaned = this.parseList(dirty);
      for (let j = 0; j < cleaned.length;j++){
          drinklist.push(cleaned[j]);
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
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&format=json&page=';
    const link = this.state.drinklinks[n];
    const url1 = url + link[0];
    const response = await fetch(url1);
    const json = await response.json();
    let parsed = this.parseInfobox(json.parse.wikitext['*'],link[link.length - 1]);
    this.setState({name:parsed.name});
    this.setState({served:parsed.served});
    this.setState({garnish:parsed.garnish});
    this.setState({drinkware:parsed.drinkware});
    this.setState({ingredients:parsed.ingredients});
    this.setState({prep:parsed.prep});
    console.log(n, parsed.name, parsed.prep);
  }

  parseInfobox = (wikitext, name) => {
    let drink = {}
    let cleaned = wikitext;

    //DONE: Get correct infobox
    let count = (cleaned.match(/nfobox/g) || []).length;
    if (count>1){
      let infoboxflag = true;
      let endinfobox = -50;
      let nameindex = -50;
      while(infoboxflag){
        cleaned = cleaned.slice(cleaned.indexOf('nfobox')+6);
        endinfobox = cleaned.indexOf('\n}}\n');
        nameindex = cleaned.indexOf(name);
        if (endinfobox > nameindex){
          infoboxflag = false;
        }
      }
    } else{
      cleaned = cleaned.slice(cleaned.indexOf('nfobox')+6);
    }
    cleaned = cleaned.slice(0, cleaned.indexOf("\n}}\n"));

    //TODO?: Universal cleans
    cleaned = cleaned.replace(/\* /g, '*');

    //DONE: Split infobox wikitext by line and remove '|' character
    cleaned = cleaned.split('\n|');

    for (let i = 0; i < cleaned.length; i++){
      cleaned[i] = cleaned[i].trim();

      //DONE: Remove internal wikilinks from wikitext markup
      let openbracketindex = -50;
      let barindex = -50;
      let closebracketindex = -50;
      while (cleaned[i].includes('[[')){
        openbracketindex = cleaned[i].indexOf('[[');
        barindex = cleaned[i].indexOf('|');
        closebracketindex = cleaned[i].indexOf(']]');
        if (openbracketindex < barindex && barindex < closebracketindex){
          cleaned[i] = cleaned[i].slice(0,openbracketindex+2) + cleaned[i].slice(barindex+1);
        }
        cleaned[i] = cleaned[i].replace('[[','');
        cleaned[i] = cleaned[i].replace(']]','');
      }

      //DONE: Remove braces references from wikitext markup
      let openbracesindex = -50;
      let closebracesindex = -50;
      while (cleaned[i].includes('{{')){
        openbracesindex = cleaned[i].indexOf('{{');
        closebracesindex = cleaned[i].indexOf('}}');
        cleaned[i] = cleaned[i].slice(0,openbracesindex+2) + cleaned[i].slice(closebracesindex);
        cleaned[i] = cleaned[i].replace('{{','');
        cleaned[i] = cleaned[i].replace('}}','');
      }

      //DONE: Remove html like tags from wikitext markup
      let opentagindex = -50;
      let closetagindex = -50;
      while (cleaned[i].includes('<')){
        opentagindex = cleaned[i].indexOf('<');
        closetagindex = cleaned[i].indexOf('>');
        cleaned[i] = cleaned[i].slice(0,opentagindex) + cleaned[i].slice(closetagindex+1);
        // cleaned[i] = cleaned[i].replace('<','');
        // cleaned[i] = cleaned[i].replace('>','');
      }

      //DONE: Split and clean each line entry into key value pairs
      cleaned[i] = cleaned[i].split('=');
      for (let j = 0; j < cleaned[i].length; j++){
        cleaned[i][j] = cleaned[i][j].trim();
      }

      //DONE: Add key value pairs to drink object
      if (cleaned[i][0] === "name"){
        drink.name = cleaned[i][1];
      } else if (cleaned[i][0] === "served"){
        drink.served = cleaned[i][1];
      } else if (cleaned[i][0] === "garnish"){
        drink.garnish = cleaned[i][1];
      } else if (cleaned[i][0] === "drinkware"){
        drink.drinkware = cleaned[i][1];
      } else if (cleaned[i][0] === "ingredients"){
        let dirtyingredients = cleaned[i][1].replace(/[*]/g,'');
        drink.ingredients = dirtyingredients.split('\n');
      } else if (cleaned[i][0] === "prep"){
        drink.prep = cleaned[i][1];
      }
    }
    return drink;
  }

  getDrink = async () => {
    for (let i = 0; i <this.state.drinklinks.length;i++){
      await this.getDrinkInfo(i);
    }
    // this.getDrinkLinks2();
    // this.getDrinkInfo(Math.floor(Math.random() * this.state.drinklinks.length));
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
        <div>{this.state.served}</div>
        <div>{this.state.garnished}</div>
        <div>{this.state.drinkware}</div>
        <div>{this.state.ingredients}</div>
        <div>{this.state.prep}</div>
        <div>{this.state.timing}</div>
      </div>
    );
  }
}

export default Bartender;
