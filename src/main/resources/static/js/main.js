var loginElement = document.querySelector('#login');   // get the element(div) all
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var userName= null;
var stomp = null;
var URL = "http://localhost:8080"

function connectSocket(event){
    userName = document.querySelector('#username').value.trim();  // get the value of id=username
    if (userName){   // if there is a value in userName
        loginElement.classList.add('dis'); // put dis class inside this element(dis class use to disappear)
        chatElement.classList.remove('dis');  // remove class dis from chatElement
        var socket = new SockJS(URL + '/connect');   // connect path is from backEnd to open a connection between client and backend
        stomp = Stomp.over(socket); // make connection via socket
        stomp.connect({},connectedDone);
    }
    event.preventDefault();
}


function connectedDone(){
    stomp.send("/app/chat.login",{},JSON.stringify({sender:userName, chatType:'JOIN'}));
    stomp.subscribe("/app/chat.send",sendMessage);
}

function sendMessage(){

}

userForm.addEventListener('submit',connectSocket); // when you submit let's connectSocket method work