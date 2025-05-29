
const text = "没有EVA的世界";
let index = 0;
const speed = 120;
const target = document.getElementById("typewriter");

function type() {
  if (index < text.length) {
    target.innerHTML += text.charAt(index);
    index++;
    setTimeout(type, speed);
  }
}

window.onload = type;
