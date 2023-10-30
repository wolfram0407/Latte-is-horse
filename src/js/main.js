import { getMovies } from "./movies.js";
import { drawItems } from "./drawItems.js";
import { weeklyBoxOffice } from "./weeklyBoxOffice.js";
// 영화리스트
const moviesEl = document.querySelector(".populars");
const commingEl = document.querySelector(".upcomings");
const weeklyEl = document.querySelector(".weeklys");
const btnEl = document.querySelector(".btn");

const url = new URL(window.location.href);
const inputEl = document.querySelector("input");
let page = url.searchParams.get("page") ? url.searchParams.get("page") : 1;
let findText = null;
let populars;
let upcomings;
let weeklys;
try {
  populars = await getMovies(page, 0);
  upcomings = await getMovies(page, 1);
  weeklys = await weeklyBoxOffice();
} catch (err) {
  console.log(err);
}

moviesEl.innerHTML = draw(populars);
commingEl.innerHTML = draw(upcomings);
weeklyEl.innerHTML = draw(weeklys);
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

new Swiper(".popSwiper", {
  // autoplay: {
  //   delay: 100,
  // },
  slidesPerView: 5,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});

new Swiper(".upcommingSwiper", {
  // autoplay: {
  //   delay: 200,
  // },
  slidesPerView: 5,
  spaceBetween: 10,

  navigation: {
    nextEl: ".swiper-next2",
    prevEl: ".swiper-prev2",
  },
});

new Swiper(".weeklySwiper", {
  autoplay: {
    delay: 1000,
  },
  slidesPerView: 5,
  spaceBetween: 10,

  navigation: {
    nextEl: ".swiper-next3",
    prevEl: ".swiper-prev3 ",
  },
});
