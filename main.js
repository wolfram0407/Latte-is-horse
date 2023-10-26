import { getMovies } from "./src/js/movies.js";
import { drawItems } from "./src/js/drawItems.js";
import { weeklyBoxOffice } from "./weeklyBoxOffice.js";
// 영화리스트
const moviesEl = document.querySelector(".populars");
const commingEl = document.querySelector(".upcomings");
const weeklyEl = document.querySelector(".weekly");
const btnEl = document.querySelector(".btn");

const url = new URL(window.location.href);
const inputEl = document.querySelector("input");
let page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
let findText = null;

let populars = await getMovies(page, 0);
moviesEl.innerHTML = draw(populars);
let upcomings = await getMovies(page, 1);
commingEl.innerHTML = draw(upcomings);
let weekly = await weeklyBoxOffice();
weeklyEl.innerHTML = draw(weekly);
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

new Swiper(".mySwiper", {
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

new Swiper(".mySwiper2", {
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
