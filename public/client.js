const socket = io();
let textarea = document.querySelector("#textarea");
let message_area = document.querySelector(".message_area");
let name;
do {
  name = prompt("enter your name here");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  appendMessage(msg, "output_msg");
  textarea.value = "";
  scrollToBottom();
  //send to server
  socket.emit("message", msg);
}
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className);
  let markup = `
<h3>${msg.user}</h3>
<p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  message_area.appendChild(mainDiv);
}
//receave message
socket.on("message", (msg) => {
  appendMessage(msg, "input_msg");
  scrollToBottom();
});
function scrollToBottom() {
  message_area.scrollTop = message_area.scrollHeight;
}
