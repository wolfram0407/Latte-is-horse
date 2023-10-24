import { getMovies, findByTitle } from "./src/movies.js";
import { drawItems } from "./src/drawItems.js";

const moviesEl = document.querySelector(".movies");
const btnEl = document.querySelector(".btn");
const viewMoreEl = document.querySelector(".view-more");
const url = new URL(window.location.href);
const inputEl = document.querySelector("input");
let page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;

let x = await getMovies(page);
let text = draw(x);
moviesEl.innerHTML = text;

let findText = null;
inputEl.focus();
btnEl.addEventListener("click", async () => {
  page = 1;
  findText = inputEl.value;
  if (!findText) {
    alert("please input search item");
  } else {
    let y = await findByTitle(findText, page);
    if (y.results.length < 20) {
      viewMoreEl.setAttribute("class", "hidden");
    }
    text = draw(y.results);
    moviesEl.innerHTML = text;
  }
  inputEl.focus();
});
viewMoreEl.addEventListener("click", async () => {
  page += 1;

  if (findText) {
    let add = await findByTitle(findText, page);
    text += draw(add.results);
  } else {
    let add = await getMovies(page);
    text += draw(add.results);
  }
  moviesEl.innerHTML = text;
  inputEl.focus();
});

function draw(x) {
  let text = "";
  for (let i = 0; i < x.length; i++) {
    text += drawItems(x[i]);
  }
  return text;
}
