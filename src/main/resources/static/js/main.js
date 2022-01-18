var loginElement = document.querySelector('#login');   // get the element(div) all
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var userName= null;
var stomp = null;

function connectSocket(event){
    userName = document.querySelector('#username').value.trim();  // get the value of id=username
    if (userName){   // if there is a value in userName
        loginElement.classList.add('dis'); // put dis class inside this element(dis class use to disappear)
        chatElement.classList.remove('dis');  // remove class dis from chatElement
        var socket = new SockJS("/connect");   // connect path is from backEnd to open a connection between client and backend
        stomp = Stomp.over(socket); // make connection via socket
    }
    event.preventDefault();
}


userForm.addEventListener('submit',connectSocket); // when you submit let's connectSocket method work