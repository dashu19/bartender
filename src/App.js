import React from 'react';
import './App.css';

class Bartender extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initial: true,
      clicked: false,
      about: false,
      drinklinks: [],
      drink: null,
      name: null,
      served: null,
      garnish: null,
      drinkware: null,
      ingredients: null,
      prep: null,
      fulllink: null,
    };
  }

  //Get list of IBA drinks from IBA cocktail page on wikipedia
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
    this.setState({drinklinks: drinklist});
    this.setState({initial: false});
  }

  //Parses wikitext to get list of drinks, takes string json string from getDrinkLinks()
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
    return cleaned;
  }

  //Takes an integer and fetches the matching drink link from this.state.drinklinks (by index) info from the wikipedia api
  getDrinkInfo = async (n) => {
    const url = 'https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&format=json&page=';
    const link = this.state.drinklinks[n];
    const url1 = url + link[0];
    const fulllink = 'https://en.wikipedia.org/wiki/' + link[0];
    const response = await fetch(url1);
    const json = await response.json();
    let parsed = this.parseInfobox(json.parse.wikitext['*'],link[link.length - 1]);
    this.setState({name:parsed.name});
    this.setState({served:parsed.served});
    this.setState({garnish:parsed.garnish});
    this.setState({drinkware:parsed.drinkware});
    this.setState({ingredients:parsed.ingredients});
    this.setState({prep:parsed.prep});
    this.setState({fulllink: fulllink});
    //console.log(n, parsed.name, 'end of getDrinkInfo');
  }

  //Takes text from fetched JSON from getDrinkInfo() and parses it, and stores data into an object
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
        cleaned[i] = cleaned[i].slice(0,openbracesindex) + cleaned[i].slice(closebracesindex+2);
      }

      //DONE: Remove html like tags from wikitext markup
      let opentagindex = -50;
      let closetagindex = -50;
      while (cleaned[i].includes('<')){
        opentagindex = cleaned[i].indexOf('<');
        closetagindex = cleaned[i].indexOf('>');
        cleaned[i] = cleaned[i].slice(0,opentagindex) + cleaned[i].slice(closetagindex+1);
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
    // console.log('end of parseInfobox');
    return drink;
  }

  //Get drinkware image
  generateDrinkwareImage = () => {
    let drinkware = this.state.drinkware;
    const values = {"cocktail":"",
                    "poco":"",
                    "hurricane":"",
                    "winew":"",
                    "collins":"",
                    "highball":"",
                    "shot":"",
                    "margarita":"",
                    "flute":"",
                    "coffee":"",
                    "old":"",
                  };
    let ret = "";
    if (drinkware in values){
      ret = drinkware + ".png";
    }
    return (
        <img className="Bartender-image" src={ret} alt="dummyalt"/>
    );
  }

  //Generate drinkware text
  generateDrinkwareText = () => {
    const values = {"cocktail":"Cocktail glass",
                    "poco":"Poco grande glass",
                    "hurricane":" Hurricane glass",
                    "winew":"Wine glass",
                    "collins":"Collins glass",
                    "highball":"Highball glass",
                    "shot":"Shot glass",
                    "margarita":"Margarita glass",
                    "flute":"Champagne flute",
                    "coffee":"Irish coffee mug",
                    "old":"Old fashioned glass",
                  };
    let drinkware = this.state.drinkware;
    if (drinkware in values){
      drinkware = values[drinkware];
    }
    return (
      <span>
        <span className="Bartender-sectionheader">Drinkware: </span><span className="Bartender-sectiontext">{drinkware}</span><br /><br />
      </span>
    );
  }

  //Generate served actual text
  generateServedText = () => {
    let served = this.state.served;
    const values = {"straight": "Straight, without ice",
                    "rocks": "On the rocks",
                    "blended": "Blended with ice"
                  };
    if (served in values){
      served = values[served];
    }
    return (
      <span>
        <span className="Bartender-sectionheader">Served: </span><span className="Bartender-sectiontext">{served}</span><br /><br />
      </span>
    );
  }

  //Generate ingredients
  generateIngredientsText = () => {
    let ret = [];
    for (let i = 0; i < this.state.ingredients.length; i++){
      ret.push(<li key={this.state.ingredients[i]}>{this.state.ingredients[i]}</li>);
    }
    return(
      <span>
        <span className="Bartender-sectionheader">Ingredients:</span>
        <ul className="Bartender-ingredientslist">
          {ret}
        </ul>
      </span>
    );
  }

  //Generate garnish
  generateGarnish = () => {
    if (this.state.garnish === "") {
      return <span />;
    } else {
      return (
        <span>
          <span className="Bartender-sectionheader">Garnish: </span>
          <span className="Bartender-sectiontext">{this.state.garnish}</span>
          <br /><br />
        </span>
      );
    }
  }

  //Generate content text
  generateContentText = () => {
    return (
      <div className= "Bartender-content">
        <div className= "Bartender-title"><a href={this.state.fulllink} target="_blank" rel="noopener noreferrer">{this.state.name}</a></div>
        <div className="Bartender-contenttext">
          {this.generateDrinkwareImage()}
          {this.generateDrinkwareText()}
          {this.generateServedText()}
          {this.generateIngredientsText()}
          {this.generateGarnish()}
          <span className="Bartender-sectionheader">Preparation:</span><br /><span className="Bartender-sectiontext">{this.state.prep}</span>
        </div>
      </div>
    );
  }

  //Generates content
  generateContent = () => {
    if (this.state.clicked === false){
      return (<div></div>);
    }
    return (this.generateContentText());
  }

  //Handles click
  getDrink = async () => {
    // for (let i = 0; i <this.state.drinklinks.length;i++){
    //   await this.getDrinkInfo(i);
    // }
    await this.getDrinkInfo(Math.floor(Math.random() * this.state.drinklinks.length));
    await this.setState({clicked: true});
    // console.log('end of getDrink');
  }

  //Generates button
  generateButton = () => {
    let buttontext = (this.state.clicked) ? 'Another':'Surprise';
    return(
      <div className='Bartender-header'>
        <button className='Bartender-button' onClick={() => this.getDrink()}>{buttontext}</button>
      </div>
    );
  }

  //Generate about button
  generateAboutButton = () => {
    let buttontext = (this.state.about) ? 'Back':'About';
    return(
      <div className='Bartender-aboutheader'>
        <button className='Bartender-aboutbutton' onClick={() => this.getAbout()}>{buttontext}</button>
      </div>
    );
  }

  //Generate about text
  generateAboutText = () => {
    return(
      <div className="Bartender-abouttextwrapper">
        <div className="Bartender-abouttext">
          This is a small React app created by <a className="Bartender-aboutlinks" href="https://github.com/dashu19" target="_blank" rel="noopener noreferrer">dashu19</a>.<br /><br />

          When the app loads and mounts, it fetches the links of the drinks listed on <a className="Bartender-aboutlinks" href="https://en.wikipedia.org/wiki/List_of_IBA_official_cocktails" target="_blank" rel="noopener noreferrer">this Wikipedia page of IBA official cocktails</a> using <a className="Bartender-aboutlinks" href="https://www.mediawiki.org/wiki/API:Main_page" target="_blank" rel="noopener noreferrer">Wikipedia's API</a>.<br /><br />

          By clicking the "Surprise" button (which will subsequently show the text "Another"), the app will then randomly select one of those links and fetch data from the corresponding Wikipedia page.<br /><br />

          The app will then parse through the fetched data (a snippit of wikitext, Wikipedia's own markup language used to make their pages) to get the relevant information to present to the user in a small "drink information card".<br /><br />

          You can see the code <a className="Bartender-aboutlinks" href="https://github.com/dashu19/bartender" target="_blank" rel="noopener noreferrer">here</a>.
        </div>
      </div>

    );
  }

  //handles click for about
  getAbout = () => {
    let newabout = !this.state.about;
    this.setState({about: newabout});
  }

  componentDidMount = async () => {
    await this.getDrinkLinks();
    //console.log('endofdidmount');
  }

  componentDidUpdate = () => {
    // console.log(this.state.drink);
  }

  render = () => {
    if (this.state.about){
      return(
        <div>
        {this.generateAboutButton()}
        {this.generateAboutText()}
        </div>
      );
    } else{
      return(
        <div>
          {this.generateAboutButton()}
          {this.generateButton()}
          {this.generateContent()}
        </div>
      );
    }
  }
}

export default Bartender;
