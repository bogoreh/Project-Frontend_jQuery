// let's get our object
let input = document.querySelector("#add");
let btn = document.querySelector("#btn");
let list = document.querySelector("#list");
let el = document.getElementsByTagName("li");

// Now we will create a function that will allow us to add element on button click 

btn.onclick = function () {

    var txt = input.value;
    if (txt == '') {
        alert("you must write something");
    } else {
        li = document.createElement('li');
        li.innerHTML = txt;
        list.insertBefore(li, list.childNodes[0]);
        input.value = '';
    }
};

//now let's write the function that will allows us to work the done subject
list.onclick = function (ev) {
    if (e.target.tagName == 'LI') {
        e.target.classList.toggle('checked')
    }
};