import { findByTitle } from "./src/js/movies.js";
import { drawItems } from "./src/js/drawItems.js";

const moviesEl = document.querySelector(".searcheds");
const searchedBtn = document.querySelector(".searchedBtn");
const inputEl = document.querySelector(".searchedInput");

const url = new URL(window.location.href);

let findText = null;
let search = url.searchParams.get("search");

inputEl.value = search;
let searched = await findByTitle(search, 1);
moviesEl.innerHTML = draw(searched);
inputEl.focus();

searchedBtn.addEventListener("click", async () => {
  findText = inputEl.value;
  if (!findText) {
    alert("please input search item");
  } else {
    let newSearched = await findByTitle(findText, 1);
    moviesEl.innerHTML = draw(newSearched);
  }
});

function draw(x) {
  let text = "";
  for (let i = 0; i < x.length; i++) {
    text += drawItems(x[i]);
  }
  return text;
}
