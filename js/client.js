// const socket = io('http://localhost:8000');

// import io from '../nodeserver/node_modules/socket.io';

const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInput");
const messageContainer = document.querySelector(".container");
const audio = new Audio("ting.mp3");

// append function to be called when user-joined event is listened
const append2 = (message, position) => {
  const newMessage = document.createElement("div");
  newMessage.innerText = message;
  if (position === "middle") {
    newMessage.classList.add("message2");
    newMessage.classList.add(position);
  } else {
    newMessage.classList.add("message");
    newMessage.classList.add(position);
  }

  messageContainer.append(newMessage);
  if (position == "left") {
    audio.play();
  }
};

// User Joins -> socket emits 'new-user-joined' event from client -> socket listens 'new-user-joined' event on server and broadcast emits 'user-joined' event
// -> socket listens 'user-joined' event on client and calls the a]end function
let new_name = prompt("Enter your name to join");
socket.emit("new-user-joined", new_name);

socket.on("user-joined", (name) => {
  append2(`${name} joined the chat!!`, "middle");
});

// Handling send event when form is submitted , socket emits send event fron client side
// Socket listens sned event on server side and socket then emits receive event

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append2(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.on("receive", (data) => {
  append2(`${data.name} : ${data.message}`, "left");
});

// Dusconned
socket.on("left", (name) => {
  append2(`${name} left the chat!!`, "middle");
});
