import { findByTitle } from "./src/js/movies.js";
import { drawItems } from "./src/js/drawItems.js";

const moviesEl = document.querySelector(".searchs");
const searchBtn = document.querySelector(".searchbtn");
const url = new URL(window.location.href);

let findText = null;
const inputEl = document.querySelector(".searchInput");
let search = url.searchParams.get("search");
inputEl.value = search;
inputEl.focus();

let x = await findByTitle(search, 1);
let text = draw(x);
moviesEl.innerHTML = text;

searchBtn.addEventListener("click", async () => {
  findText = inputEl.value;
  if (!findText) {
    alert("please input search item");
  } else {
    let x = await findByTitle(findText, 1);
    let temp = draw(x);
    moviesEl.innerHTML = temp;
  }
});

function draw(x) {
  let text = "";
  for (let i = 0; i < x.length; i++) {
    text += drawItems(x[i]);
  }
  return text;
}
