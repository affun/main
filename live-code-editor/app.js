// initializing code editor

const lang = ["xml","css","javascript"]

// const comments = ["html goes here","/*css goes here*/","//javascript goes here"]

const comments = ["<!-- html goes here -->","/*css goes here*/\n","//javascript goes here\n"]

// const comments = ["<!DOCTYPE html>\n<html>\n<head>\n\t<title></title>\n</head>\n<body>\n<!-- html goes here -->\n</body>\n</html>","/*css goes here*/\n","//javascript goes here\n"]

const containers = document.querySelectorAll(".codeMirror")

const iframe = document.querySelector("#output")

const Codenator = []

// var leftSection = document.getElementById('#left').style.width
// var rightSection = document.getElementById('#right').style.width

let autoRun = true;

//Gutter part

Split(['#left', '#right'], {

    gutterSize: 16,
    sizes:[30,70]

})

Split(['#html', '#css', '#js'], {

    gutterSize: 16,
    direction:"vertical"

})




// containers.for each

for (let i=0; i<3; i++){

  let temp = CodeMirror(containers[i],{

    // value: comments[i],
    placeholder: comments[i],
    mode: lang[i],
    lineNumbers:true,
    theme: "material-darker",
    extraKeys: {"Ctrl-Space":"autocomplete"},

    autoCloseTags:true,
    autoCloseBrackets:true,
  })

  temp.on("change",()=>update(temp))
  Codenator.push(temp)

}

function update(container){

  // console.log(container)
  console.log(container.getValue())

}

function update(){

  if (autoRun) {

    iframe.srcdoc = Codenator[0].getValue() + 
    "<style>" + 
    Codenator[1].getValue() + 
    "</style>" + 
    "<script>" + 
    Codenator[2].getValue() + 
    "</script>"

  }

}

function Run() {

  iframe.srcdoc = Codenator[0].getValue() + 
  "<style>" + 
  Codenator[1].getValue() + 
  "</style>" + 
  "<script>" + 
  Codenator[2].getValue() + 
  "</script>"

}

function toggleRun(button){

  autoRun = !autoRun
  button.classList.toggle("bg-green-500")
  // button.classList.toggle("fa-toggle-on")

}

function toggleRunBtn(button){

  button.classList.toggle("fa-toggle-on")

}

function save() {

  let link = document.createElement('a')
  let source = iframe.contentWindow.document.documentElement.outerHTML
  link.setAttribute("download","index.html")
  link.setAttribute("href","data:text/html;charset-utf-8," + encodeURIComponent(source))
  link.click()

}

function fullscreenIframe(button){
  iframe.classList.toggle("fullscreen")
  button.innerText = button.innerText === "BACK" ? "FULLSCREEN" : "BACK"
  
}

function fullscreenEditor(id){

  document.querySelector("#"+id).classList.toggle("fullscreen-codeEditor")

  if (document.querySelector("#"+id).classList.contains("fullscreen-codeEditor")) {
    
  preSize = document.querySelector("#"+id).style.height
  document.querySelector("#"+id).style.height = "100vh"

  } else {

    document.querySelector("#"+id).style.height = preSize
    
  }

}


// document.querySelector("#html").style.height = "100vh"

// //locking system for gutter

// while (true) {

//   if ((leftSection > "25vw")&&(leftSection < "35vw")){  
//     console.log("it is it")
//   }

// }

document.addEventListener('keydown', (event) => {
  // var KeyName = event.key;
  var KeyCode = event.code;
  if (KeyCode === "KeyQ"&&event.ctrlKey){
    Run();
  }
}, false);