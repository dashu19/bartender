(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(4),s=n.n(i),l=(n(15),n(1)),o=n.n(l),c=n(2),u=n(5),d=n(7),p=n(6),m=n(8),g=(n(17),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(d.a)(this,Object(p.a)(t).call(this,e))).getDrinkLinks=Object(c.a)(o.a.mark(function e(){var t,a,r,i,s,l,c,u,d;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=[],a="https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=wikitext&format=json&section=",r=["2","3","4"],i=0;case 4:if(!(i<3)){e.next=17;break}return e.next=7,fetch(a+r[i]);case 7:return s=e.sent,e.next=10,s.json();case 10:for(l=e.sent,c=l.parse.wikitext["*"],u=n.parseList(c),d=0;d<u.length;d++)t.push(u[d]);case 14:i++,e.next=4;break;case 17:n.setState({drinklinks:t}),n.setState({initial:!1});case 19:case"end":return e.stop()}},e)})),n.parseList=function(e){var t=e;t=(t=(t=(t=(t=t.slice(t.indexOf("*"))).slice(1,t.indexOf("\n{{"))).replace(/]/g,"")).replace(/[[]/g,"")).split("\n*");for(var n=0;n<t.length;n++)t[n]=t[n].trim(),t[n]=t[n].split("|");return t},n.getDrinkInfo=function(){var e=Object(c.a)(o.a.mark(function e(t){var a,r,i,s,l,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&format=json&page=",a=n.state.drinklinks[t],r="https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&format=json&page="+a[0],i="https://en.wikipedia.org/wiki/"+a[0],e.next=6,fetch(r);case 6:return s=e.sent,e.next=9,s.json();case 9:l=e.sent,c=n.parseInfobox(l.parse.wikitext["*"],a[a.length-1]),n.setState({name:c.name}),n.setState({served:c.served}),n.setState({garnish:c.garnish}),n.setState({drinkware:c.drinkware}),n.setState({ingredients:c.ingredients}),n.setState({prep:c.prep}),n.setState({fulllink:i});case 18:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.parseInfobox=function(e,t){var n={},a=e;if((a.match(/nfobox/g)||[]).length>1)for(var r=!0;r;)(a=a.slice(a.indexOf("nfobox")+6)).indexOf("\n}}\n")>a.indexOf(t)&&(r=!1);else a=a.slice(a.indexOf("nfobox")+6);a=(a=(a=a.slice(0,a.indexOf("\n}}\n"))).replace(/\* /g,"*")).split("\n|");for(var i=0;i<a.length;i++){a[i]=a[i].trim();for(var s=-50,l=-50,o=-50;a[i].includes("[[");)s=a[i].indexOf("[["),l=a[i].indexOf("|"),o=a[i].indexOf("]]"),s<l&&l<o&&(a[i]=a[i].slice(0,s+2)+a[i].slice(l+1)),a[i]=a[i].replace("[[",""),a[i]=a[i].replace("]]","");for(var c=-50,u=-50;a[i].includes("{{");)c=a[i].indexOf("{{"),u=a[i].indexOf("}}"),a[i]=a[i].slice(0,c)+a[i].slice(u+2);for(var d=-50,p=-50;a[i].includes("<");)d=a[i].indexOf("<"),p=a[i].indexOf(">"),a[i]=a[i].slice(0,d)+a[i].slice(p+1);a[i]=a[i].split("=");for(var m=0;m<a[i].length;m++)a[i][m]=a[i][m].trim();if("name"===a[i][0])n.name=a[i][1];else if("served"===a[i][0])n.served=a[i][1];else if("garnish"===a[i][0])n.garnish=a[i][1];else if("drinkware"===a[i][0])n.drinkware=a[i][1];else if("ingredients"===a[i][0]){var g=a[i][1].replace(/[*]/g,"");n.ingredients=g.split("\n")}else"prep"===a[i][0]&&(n.prep=a[i][1])}return n},n.generateDrinkwareImage=function(){var e=n.state.drinkware,t="";return e in{cocktail:"",poco:"",hurricane:"",winew:"",collins:"",highball:"",shot:"",margarita:"",flute:"",coffee:"",old:""}&&(t=e+".png"),r.a.createElement("img",{className:"Bartender-image",src:t,alt:"dummyalt"})},n.generateDrinkwareText=function(){var e={cocktail:"Cocktail glass",poco:"Poco grande glass",hurricane:" Hurricane glass",winew:"Wine glass",collins:"Collins glass",highball:"Highball glass",shot:"Shot glass",margarita:"Margarita glass",flute:"Champagne flute",coffee:"Irish coffee mug",old:"Old fashioned glass"},t=n.state.drinkware;return t in e&&(t=e[t]),r.a.createElement("span",null,r.a.createElement("span",{className:"Bartender-sectionheader"},"Drinkware: "),r.a.createElement("span",{className:"Bartender-sectiontext"},t),r.a.createElement("br",null),r.a.createElement("br",null))},n.generateServedText=function(){var e=n.state.served,t={straight:"Straight, without ice",rocks:"On the rocks",blended:"Blended with ice"};return e in t&&(e=t[e]),r.a.createElement("span",null,r.a.createElement("span",{className:"Bartender-sectionheader"},"Served: "),r.a.createElement("span",{className:"Bartender-sectiontext"},e),r.a.createElement("br",null),r.a.createElement("br",null))},n.generateIngredientsText=function(){for(var e=[],t=0;t<n.state.ingredients.length;t++)e.push(r.a.createElement("li",{key:n.state.ingredients[t]},n.state.ingredients[t]));return r.a.createElement("span",null,r.a.createElement("span",{className:"Bartender-sectionheader"},"Ingredients:"),r.a.createElement("ul",{className:"Bartender-ingredientslist"},e))},n.generateGarnish=function(){return""===n.state.garnish?r.a.createElement("span",null):r.a.createElement("span",null,r.a.createElement("span",{className:"Bartender-sectionheader"},"Garnish: "),r.a.createElement("span",{className:"Bartender-sectiontext"},n.state.garnish),r.a.createElement("br",null),r.a.createElement("br",null))},n.generateContentText=function(){return r.a.createElement("div",{className:"Bartender-content"},r.a.createElement("div",{className:"Bartender-title"},r.a.createElement("a",{href:n.state.fulllink,target:"_blank",rel:"noopener noreferrer"},n.state.name)),r.a.createElement("div",{className:"Bartender-contenttext"},n.generateDrinkwareImage(),n.generateDrinkwareText(),n.generateServedText(),n.generateIngredientsText(),n.generateGarnish(),r.a.createElement("span",{className:"Bartender-sectionheader"},"Preparation:"),r.a.createElement("br",null),r.a.createElement("span",{className:"Bartender-sectiontext"},n.state.prep)))},n.generateContent=function(){return!1===n.state.clicked?r.a.createElement("div",null):n.generateContentText()},n.getDrink=Object(c.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.getDrinkInfo(Math.floor(Math.random()*n.state.drinklinks.length));case 2:return e.next=4,n.setState({clicked:!0});case 4:case"end":return e.stop()}},e)})),n.generateButton=function(){var e=n.state.clicked?"Another":"Surprise";return r.a.createElement("div",{className:"Bartender-header"},r.a.createElement("button",{className:"Bartender-button",onClick:function(){return n.getDrink()}},e))},n.generateAboutButton=function(){var e=n.state.about?"Back":"About";return r.a.createElement("div",{className:"Bartender-aboutheader"},r.a.createElement("button",{className:"Bartender-aboutbutton",onClick:function(){return n.getAbout()}},e))},n.generateAboutText=function(){return r.a.createElement("div",{className:"Bartender-abouttextwrapper"},r.a.createElement("div",{className:"Bartender-abouttext"},"This is a small React app created by ",r.a.createElement("a",{className:"Bartender-aboutlinks",href:"https://github.com/dashu19",target:"_blank",rel:"noopener noreferrer"},"dashu19"),".",r.a.createElement("br",null),r.a.createElement("br",null),"When the app loads and mounts, it fetches the links of the drinks listed on ",r.a.createElement("a",{className:"Bartender-aboutlinks",href:"https://en.wikipedia.org/wiki/List_of_IBA_official_cocktails",target:"_blank",rel:"noopener noreferrer"},"this Wikipedia page of IBA official cocktails")," using ",r.a.createElement("a",{className:"Bartender-aboutlinks",href:"https://www.mediawiki.org/wiki/API:Main_page",target:"_blank",rel:"noopener noreferrer"},"Wikipedia's API"),".",r.a.createElement("br",null),r.a.createElement("br",null),'By clicking the "Surprise" button (which will subsequently show the text "Another"), the app will then randomly select one of those links and fetch data from the corresponding Wikipedia page.',r.a.createElement("br",null),r.a.createElement("br",null),'The app will then parse through the fetched data (a snippit of wikitext, Wikipedia\'s own markup language used to make their pages) to get the relevant information to present to the user in a small "drink information card".',r.a.createElement("br",null),r.a.createElement("br",null),"You can see the code ",r.a.createElement("a",{className:"Bartender-aboutlinks",href:"https://github.com/dashu19/bartender",target:"_blank",rel:"noopener noreferrer"},"here"),"."))},n.getAbout=function(){var e=!n.state.about;n.setState({about:e})},n.componentDidMount=Object(c.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.getDrinkLinks();case 2:case"end":return e.stop()}},e)})),n.componentDidUpdate=function(){},n.render=function(){return n.state.about?r.a.createElement("div",null,n.generateAboutButton(),n.generateAboutText()):r.a.createElement("div",null,n.generateAboutButton(),n.generateButton(),n.generateContent())},n.state={initial:!0,clicked:!1,about:!1,drinklinks:[],drink:null,name:null,served:null,garnish:null,drinkware:null,ingredients:null,prep:null,fulllink:null},n}return Object(m.a)(t,e),t}(r.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,n){e.exports=n(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.a979e514.chunk.js.map