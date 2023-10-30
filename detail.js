import { findByOneDetail } from "./src/js/movies.js";
import { drawItem_detail } from "./src/js/drawByOne.js";

const url = new URL(window.location.href);
const headerInfo = document.querySelector(".header_info");
headerInfo.style.visibility = "visible";
headerInfo.href = url.href;
const urlParams = url.searchParams.get("id");
const back = document.querySelector(".back");
let getMovie = await findByOneDetail(urlParams);

drawItem_detail(getMovie);

const reviewsubmit = document.querySelector(".review-submitBtn");
const reviewremove = document.querySelector(".remove-submitBtn");

back.addEventListener("click", () => {
  history.go(-1);
});

/*
reviewsubmit.addEventListener("click", async () => {
  let username = document.querySelector(".review-name").value;
  let usercontext = document.querySelector(".review-context").value;
  let userpassword = document.getElementById("review-password").value;

  let review = {
    name: username,
    context: usercontext,
    password: userpassword,
  };

  //밑 내용을 따로 함수로 빼어도 좋을 것.
  if ((await reviewValidation(review)) === true) {
    let keynum = 1;
    let key = "key" + z.id + "_" + String(keynum);

    while (localStorage.getItem(key) !== null) {
      key = "key" + z.id + "_" + String(++keynum);
    }

    localStorage.setItem(key, JSON.stringify(review));
    alert(`리뷰가 등록되었습니다! ${userpassword}`);
  }

  let newz = await findByOneDetail(urlParams);
  window.location.reload(true);
});
*/
if (reviewremove) {
  reviewremove.addEventListener("click", async () => {
    let keynum = 1;
    //div의 key를 가져온다.
    let key = "key" + z.id + "_" + String(keynum);

    localStorage.removeItem(key);
    alert(`리뷰가 삭제되었습니다!`);

    let newz = await findByOneDetail(urlParams);
    history.go(-1);
  });
}
