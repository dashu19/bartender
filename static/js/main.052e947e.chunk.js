(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,n,t){},17:function(e,n,t){},18:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),i=t(4),s=t.n(i),l=(t(15),t(1)),c=t.n(l),o=t(2),d=t(5),u=t(7),p=t(6),g=t(8),f=(t(17),function(e){function n(e){var t;return Object(d.a)(this,n),(t=Object(u.a)(this,Object(p.a)(n).call(this,e))).getDrinkLinks=Object(o.a)(c.a.mark(function e(){var n,r,a,i,s,l,o,d,u;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=[],r="https://en.wikipedia.org/w/api.php?action=parse&pageid=8702622&origin=*&prop=wikitext&format=json&section=",a=["2","3","4"],i=0;case 4:if(!(i<3)){e.next=17;break}return e.next=7,fetch(r+a[i]);case 7:return s=e.sent,e.next=10,s.json();case 10:for(l=e.sent,o=l.parse.wikitext["*"],d=t.parseList(o),u=0;u<d.length;u++)n.push(d[u]);case 14:i++,e.next=4;break;case 17:t.setState({drinklinks:n}),t.setState({initial:!1});case 19:case"end":return e.stop()}},e)})),t.parseList=function(e){var n=e;n=(n=(n=(n=(n=n.slice(n.indexOf("*"))).slice(1,n.indexOf("\n{{"))).replace(/]/g,"")).replace(/[[]/g,"")).split("\n*");for(var t=0;t<n.length;t++)n[t]=n[t].trim(),n[t]=n[t].split("|");return n},t.getDrinkInfo=function(){var e=Object(o.a)(c.a.mark(function e(n){var r,a,i,s,l,o;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return"https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&format=json&page=",r=t.state.drinklinks[n],a="https://en.wikipedia.org/w/api.php?action=parse&origin=*&prop=wikitext&redirects=true&format=json&page="+r[0],i="https://en.wikipedia.org/wiki/"+r[0],e.next=6,fetch(a);case 6:return s=e.sent,e.next=9,s.json();case 9:l=e.sent,o=t.parseInfobox(l.parse.wikitext["*"],r[r.length-1]),t.setState({name:o.name}),t.setState({served:o.served}),t.setState({garnish:o.garnish}),t.setState({drinkware:o.drinkware}),t.setState({ingredients:o.ingredients}),t.setState({prep:o.prep}),t.setState({fulllink:i}),console.log(n,o.drinkware);case 19:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}(),t.parseInfobox=function(e,n){var t={},r=e;if((r.match(/nfobox/g)||[]).length>1)for(var a=!0;a;)(r=r.slice(r.indexOf("nfobox")+6)).indexOf("\n}}\n")>r.indexOf(n)&&(a=!1);else r=r.slice(r.indexOf("nfobox")+6);r=(r=(r=r.slice(0,r.indexOf("\n}}\n"))).replace(/\* /g,"*")).split("\n|");for(var i=0;i<r.length;i++){r[i]=r[i].trim();for(var s=-50,l=-50,c=-50;r[i].includes("[[");)s=r[i].indexOf("[["),l=r[i].indexOf("|"),c=r[i].indexOf("]]"),s<l&&l<c&&(r[i]=r[i].slice(0,s+2)+r[i].slice(l+1)),r[i]=r[i].replace("[[",""),r[i]=r[i].replace("]]","");for(var o=-50,d=-50;r[i].includes("{{");)o=r[i].indexOf("{{"),d=r[i].indexOf("}}"),r[i]=r[i].slice(0,o)+r[i].slice(d+2);for(var u=-50,p=-50;r[i].includes("<");)u=r[i].indexOf("<"),p=r[i].indexOf(">"),r[i]=r[i].slice(0,u)+r[i].slice(p+1);r[i]=r[i].split("=");for(var g=0;g<r[i].length;g++)r[i][g]=r[i][g].trim();if("name"===r[i][0])t.name=r[i][1];else if("served"===r[i][0])t.served=r[i][1];else if("garnish"===r[i][0])t.garnish=r[i][1];else if("drinkware"===r[i][0])t.drinkware=r[i][1];else if("ingredients"===r[i][0]){var f=r[i][1].replace(/[*]/g,"");t.ingredients=f.split("\n")}else"prep"===r[i][0]&&(t.prep=r[i][1])}return t},t.getDrink=Object(o.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getDrinkInfo(Math.floor(Math.random()*t.state.drinklinks.length));case 2:return e.next=4,t.setState({clicked:!0});case 4:console.log("end of getDrink");case 5:case"end":return e.stop()}},e)})),t.generateButton=function(){var e=t.state.clicked?"Another":"Surprise";return a.a.createElement("div",{className:"Bartender-header"},a.a.createElement("button",{className:"Bartender-button",onClick:function(){return t.getDrink()}},e))},t.generateServed=function(){var e=t.state.served,n={straight:"Straight, without ice",rocks:"On the rocks",blended:"Blended with ice"};return e in n&&(e=n[e]),e},t.generateDrinkwareImage=function(){var e=t.state.drinkware,n="";return e in{cocktail:"",poco:"",hurricane:"",winew:"",collins:"",highball:"",shot:"",margarita:"",flute:"",coffee:"",old:""}&&(n=e+".png"),a.a.createElement("img",{className:"Bartender-image",src:n,alt:"dummyalt"})},t.generateDrinkwareText=function(){var e={cocktail:"Cocktail glass",poco:"Poco grande glass",hurricane:" Hurricane glass",winew:"Wine glass",collins:"Collins glass",highball:"Highball glass",shot:"Shot glass",margarita:"Margarita glass",flute:"Champagne flute",coffee:"Irish coffee mug",old:"Old fashioned glass"},n=t.state.drinkware;return n in e&&(n=e[n]),n},t.generateIngredients=function(){for(var e=[],n=0;n<t.state.ingredients.length;n++)e.push(a.a.createElement("li",{key:t.state.ingredients[n]},t.state.ingredients[n]));return a.a.createElement("ul",{className:"Bartender-ingredientslist"},e)},t.generateGarnish=function(){return""===t.state.garnish?a.a.createElement("span",null):a.a.createElement("span",null,a.a.createElement("span",{className:"Bartender-sectionheader"},"Garnish: "),a.a.createElement("span",{className:"Bartender-sectiontext"},t.state.garnish),a.a.createElement("br",null),a.a.createElement("br",null))},t.generateContentText=function(){return a.a.createElement("div",{className:"Bartender-contenttext"},t.generateDrinkwareImage(),a.a.createElement("span",{className:"Bartender-sectionheader"},"Drinkware: "),a.a.createElement("span",{className:"Bartender-sectiontext"},t.generateDrinkwareText()),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("span",{className:"Bartender-sectionheader"},"Served: "),a.a.createElement("span",{className:"Bartender-sectiontext"},t.generateServed()),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("span",{className:"Bartender-sectionheader"},"Ingredients:"),t.generateIngredients(),t.generateGarnish(),a.a.createElement("span",{className:"Bartender-sectionheader"},"Preparation:"),a.a.createElement("br",null),a.a.createElement("span",{className:"Bartender-preptext"},t.state.prep))},t.generateContent=function(){return!1===t.state.clicked?a.a.createElement("div",null):a.a.createElement("div",{className:"Bartender-content"},a.a.createElement("div",{className:"Bartender-title"},a.a.createElement("a",{href:t.state.fulllink,target:"_blank",rel:"noopener noreferrer"},t.state.name)),t.generateContentText())},t.componentDidMount=Object(o.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getDrinkLinks();case 2:console.log("endofdidmount");case 3:case"end":return e.stop()}},e)})),t.componentDidUpdate=function(){},t.render=function(){return a.a.createElement("div",null,t.generateButton(),t.generateContent())},t.state={initial:!0,clicked:!1,drinklinks:[],drink:null,name:null,served:null,garnish:null,drinkware:null,ingredients:null,prep:null,timing:null,fulllink:null},t}return Object(g.a)(n,e),n}(a.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,n,t){e.exports=t(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.052e947e.chunk.js.map