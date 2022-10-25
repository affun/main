const boxes = 448+1;
const states = ['cell-blank','cell-dashed','cell-tick','cell-crossed'];

function classWrite(){
    for (let i = 1; i <= lenLS; i++) {
        let element = document.getElementById(i);
        for (let j = 0; j < states.length; j++) {
            if (element.classList.contains(states[j])) {
                element.classList.remove(states[j])
                break;
            }
        }
        document.getElementById(i).classList.add(localStorage.getItem(i))
    }
}
function dataWrite(){
    localStorage.setItem("start","True")
    for (let i = 1; i <= boxes; i++) {
        let element = document.getElementById(i);
        for (let j = 0; j < states.length; j++) {
            if (element.classList.contains(states[j])) {
                element.classList.remove(states[j])
                break;
            }
        }
        localStorage.setItem(i,'cell-blank')
    }
}

if ("start" in localStorage) {
    var lenLS = Object.keys(localStorage).length-1
    if (lenLS > boxes){for (let i = boxes; i <= lenLS; i++) {localStorage.removeItem(i)}}
    else {for (let i = lenLS; i <= boxes; i++) {localStorage.setItem(i,'cell-blank')}}
} else {
    localStorage.clear()
    classWrite();
    dataWrite();
    var lenLS = boxes
}

function check(idv){
    let element = document.getElementById(idv);
    for (let i = 0; i < states.length; i++) {
        if (element.classList.contains(states[i])){
            let j = i+1
            if (i+1 == states.length){j = 0}
            element.classList.replace(states[i],states[j])
            localStorage.setItem(element.id,states[j])
            break;
        }
    }
}


function reset(){
    if(confirm("Are you sure you want to reset all data. ")){
        localStorage.clear();
        dataWrite();
        classWrite();
    }
}

setInterval(classWrite, 800);
