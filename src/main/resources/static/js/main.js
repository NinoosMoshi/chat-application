var loginElement = document.querySelector('#login');   // get the element(div) all
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var connect = document.querySelector('#connect');
var mainChat = document.querySelector('#main-chat');
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
    stomp.subscribe("/topic/all",sendMessage);
    stomp.send("/app/chat.login",{},JSON.stringify({sender:userName, chatType:'JOIN'}));
    connect.classList.add('dis');
}

function sendMessage(payload){
   var message = JSON.parse(payload.body);
   if (message.chatType == 'JOIN'){
       joinMessage(message);
   }
}

function joinMessage(message){
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var hr1 = document.createElement('hr');
    var hr2 = document.createElement('hr');
    var messageJoin = document.createTextNode(message.sender + ' join');
    li1.classList.add('status');
    li1.appendChild(messageJoin);
    li2.appendChild(hr1);
    li2.appendChild(li1);
    li2.appendChild(hr2);
    mainChat.appendChild(li2);
}

userForm.addEventListener('submit',connectSocket); // when you submit let's connectSocket method work