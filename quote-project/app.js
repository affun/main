const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5d55c73cd2mshe28108c7236b163p18b08bjsn54f6806473bc",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
};

const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

var quoteText = document.getElementById("quote-text");
var quoteAuthor = document.getElementById("quote-author");

var quotePin = document.getElementById("save-pin");

var navBar = document.getElementById("nav");
var savedCards = document.getElementById("saved-qs");
var menuBtn = document.getElementById("menu");
var hamburger = document.getElementById("burger");

var sqText = document.getElementById("sq-text");
var sqWhen = document.getElementById("sq-when");
var sqAuthor = document.getElementById("sq-author");

var order = []

var quoteTextContent = "Haha you just got trolled BOZO";
var quoteTextLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
var quoteAuthorLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
var quoteAuthorName = "Vishwa OP";
var quoteTextID = 69;

var clip = document.getElementById("clip");
var genBtn = document.getElementById("gen-btn");
var quoteReq = undefined;
var MCM = true;

function nq() {
  if (MCM) {
    MCM = false;
    genBtn.classList.add("gen-btn-click");

    fetch(
      "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
      options
    )
      .then((response) => response.json())
      .then((response) => (quoteReq = response))
      .then((response) => {
        console.log(quoteReq);
  
        quotePin.classList.add("dis-b");
        genBtn.classList.remove("gen-btn-click");
        quoteTextContent = quoteReq.content;
        quoteTextLink = quoteReq.url;
        quoteAuthorName = quoteReq.originator.name;
        quoteAuthorLink = quoteReq.originator.url;
        quoteTextID = quoteReq.id;
  
        quoteText.innerHTML = ('"'+quoteTextContent+'"');
        quoteText.href = quoteTextLink;
  
        quoteAuthor.innerHTML = ('~ '+quoteAuthorName+'.');
        quoteAuthor.href = quoteAuthorLink;
        
        clip.classList.remove("clip-clked");
        clip.classList.add('dis-b');
        MCM = true;
      })
      .catch((err) => console.error(err));
  }
}

function copy() {
  clip.classList.add("clip-clked");
  navigator.clipboard.writeText(quoteTextContent);
}

function pin() {
  console.log(order)
  if (!order.includes(quoteTextID.toString())) {order.push(quoteTextID.toString())}
  console.log(order)
  otl()
  localStorage.setItem(quoteTextID+'-text', quoteTextContent);
  localStorage.setItem(quoteTextID+'-text-url', quoteTextLink);
  localStorage.setItem(quoteTextID+'-author', quoteAuthorName);
  localStorage.setItem(quoteTextID+'-author-url', quoteAuthorLink);
  console.log(order)
  navr(Array.from(order))
}

function dn() {
  navBar.classList.toggle('nav-open');
  hamburger.classList.toggle('is-active');
}

function otl(){
  localStorage.setItem('order','krishanu gay: ')
  console.log('reached')
  for (let i = 0; i < order.length; i++) {
    const id = order[i];
    localStorage.setItem('order',localStorage.getItem('order')+id+' ')   
    // console.log(id)
  }
  console.log(localStorage.getItem('order'))
}

function navr(o){
  savedCards.innerHTML = ''
  for (let i = 0; i < order.length; i++) {
    let ti = o.pop()
    savedCards.innerHTML = (savedCards.innerHTML+carw(localStorage.getItem(ti+'-text'),localStorage.getItem(ti+'-texturl'),localStorage.getItem(ti+'-author'),localStorage.getItem(ti+'-author-url'),ti))
  }
}

function carw(t,tl,a,al,d){
  console.log('a0'+a)
  return "<div class='sq-card' id='"+d+"'><div class='sq-upper'><div class='when' title='20/01/2023 - 22:53' id='sq-when'>20/01 - 10:53 PM</div><div class='sq-card-unpin' onclick='order.splice(order.indexOf("+d+"),1);otl();navr(order);'><i class='fa-solid fa-thumbtack'></i></div></div><a href='"+tl+"' target='_blank' class='sq-text' id='sq-text'>"+t+"</a><div class='sq-author'><a href='"+al+"' id='sq-author' target='_blank'>~"+a+"</a></div></div>"
} 

function start(){
  console.log(localStorage.getItem('order'))
  console.table(localStorage)
  if ('order' in localStorage){
    if (localStorage.getItem('order').slice(0,14)=='krishanu gay: '){
        console.log(order,'adsa')
        if(localStorage.getItem('order').length > 14){
          order = localStorage.getItem('order').slice(14,localStorage.getItem('order').length).split(' ')
          order.pop()
          otl();
          navr(Array.from(order))
          console.log(order,'pee')
        // for (let i = order.length-1; i > 0; i--) {
        //   if (order[i]==''){order.splice(i, 1)}
          
        // }
        localStorage.setItem('order','krishanu gay: ')  
      }
    }else{
      localStorage.setItem('order','krishanu gay: ')  
    }
  }else{
    localStorage.setItem('order','krishanu gay: ')
  }
  nq()
}

start()
