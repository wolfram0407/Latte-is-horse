import { getMovies } from "./src/js/movies.js";
import { drawItems } from "./src/js/drawItems.js";

const moviesEl = document.querySelector(".movies");
const commingEl = document.querySelector(".commings");
const btnEl = document.querySelector(".btn");
const url = new URL(window.location.href);
const inputEl = document.querySelector("input");
let page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;

let x = await getMovies(page, 0);
let text = draw(x);
moviesEl.innerHTML = text;
let z = await getMovies(page, 1);
let temp = draw(z);
commingEl.innerHTML = temp;

let findText = null;
inputEl.focus();
btnEl.addEventListener("click", async () => {
  findText = inputEl.value;
  if (!findText) {
    alert("please input search item");
  } else {
    location.href = `./search.html?search=${findText}`;
  }
});

function draw(x) {
  let text = "";
  for (let i = 0; i < x.length; i++) {
    text += drawItems(x[i]);
  }

  return text;
}

var swiper = new Swiper(".mySwiper", {
  // autoplay: {
  //   delay: 100,
  // },
  slidesPerView: 5,
  spaceBetween: 10,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});

var swiper = new Swiper(".mySwiper2", {
  // autoplay: {
  //   delay: 200,
  // },
  slidesPerView: 5,
  spaceBetween: 10,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-next2",
    prevEl: ".swiper-prev2",
  },
});
