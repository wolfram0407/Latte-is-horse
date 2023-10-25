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

back.addEventListener("click", () => {
  history.go(-1);
});
function draw(x) {
  drawItem_detail(x);
};

let saveinfo = function () {
  let reviewer = document.getElementById("review-id");
  let reviewcontent = document.getElementById("review-text");
  let password = document.getElementById("review-pw");
  let userInfo = { user: reviewer.value, review: reviewcontent.value, pw: password.value, movieId: getMovie.id, date: new Date().getTime() };
  // if (!Boolean(reviewer) || !Boolean(reviewcontent) || !Boolean(password)) {
  //   alert("빈칸을 모두 입력해주세요!");
  // } else if (typeof password !== 'number') {
  //   console.log(typeof password);
  //   alert("비밀번호는 숫자만 입력 가능합니다!"); //비밀번호칸의 숫자가 문자열로 들어감
  // } else if (password.length < 4) {
  //   alert("비밀번호는 4자리 이상입니다!");
  // } else {
  localStorage.setItem(`${getMovie.id}:${reviewer.value}`, JSON.stringify(userInfo));
  alert("저장 완료!");
  // reviewer.value = "";
  // reviewcontent.value = "";
  // password.value = "";
  window.location.reload();
};

document.getElementById("submitBtn").addEventListener("click", function () {
  saveinfo();
});

for (let i = 0; i < localStorage.length; i++) {
  let eachInfo = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`));
  let eachUser = eachInfo.user;
  let eachReview = eachInfo.review;
  if (localStorage.key(i).indexOf(getMovie.id) != -1) {
    let temp_html = document.createElement('div');
    temp_html.className = 'review';
    temp_html.innerHTML = `
                <div>${eachUser}</div>
                <div>${eachReview}</div>
                <div class="review-actions">
                    <button class="delete-button">삭제</button>
                </div>
            `;
    let reviewList = document.getElementById("review-list");
    reviewList.appendChild(temp_html);
  };
}
