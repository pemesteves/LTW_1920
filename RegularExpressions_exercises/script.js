'use strict';

let username = document.querySelector('form input[name="username"]');
let password = document.querySelector('form input[name="password"]');

password.addEventListener('keyup', checkUsername);

function checkUsername(){
    if(password.value.includes(username.value)){
        password.style.borderColor = "red";
    }else{
        password.style.borderColor = "initial";
    }
}

let form = document.querySelector('form');

form.addEventListener('submit', checkValid, true);

function checkValid(e){
    e.preventDefault();
    if(password.style.borderColor === "initial"){
        form.submit();
        return true;
    }
    return false;
}