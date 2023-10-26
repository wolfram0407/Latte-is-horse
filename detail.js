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
let parsingdata = JSON.parse(localStorage.getItem(`${getMovie.id}`));

let saveinfo = function () {
  let reviewdata = [];
  let reviewer = document.getElementById("userName");
  let reviewcontent = document.getElementById("reviewText");
  let password = document.getElementById("password");
  let userInfo = {
    user: reviewer.value,
    review: reviewcontent.value,
    pw: password.value,
    date: new Date().getTime()
  };
  // if (!Boolean(reviewer) || !Boolean(reviewcontent) || !Boolean(password)) {
  //   alert("빈칸을 모두 입력해주세요!");
  // } else if (typeof password !== 'number') {
  //   console.log(typeof password);
  //   alert("비밀번호는 숫자만 입력 가능합니다!"); //비밀번호칸의 숫자가 문자열로 들어감
  // } else if (password.length < 4) {
  //   alert("비밀번호는 4자리 이상입니다!");
  // } else {
  if (Boolean(parsingdata)) {
    reviewdata.push(...parsingdata);
  }
  reviewdata.push(userInfo);
  localStorage.setItem(`${getMovie.id}`, JSON.stringify(reviewdata));
  alert("저장 완료!");
  window.location.reload();
};

document.getElementById("reviewBtn").addEventListener("click", function () {
  saveinfo();
});

// 객체 배열을 생성하여 localStorage의 데이터를 저장
const reviewData = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const eachInfo = JSON.parse(localStorage.getItem(key));
  const eachUser = eachInfo.user;
  const eachReview = eachInfo.review;
  const timestamp = eachInfo.date;

  // getMovie.id를 키에 포함하는 항목만 포함
  if (key.includes(getMovie.id)) {
    reviewData.push({
      key: key,
      user: eachUser,
      review: eachReview,
      date: timestamp
    });
  }
}

// reviewData를 타임스탬프 순으로 정렬
reviewData.sort((a, b) => {
  return a.date - b.date;
});

// 정렬된 데이터를 사용하여 HTML을 생성
// const reviewList = document.getElementById("review-list");
// reviewData.forEach((item) => {
//   const temp_html = document.createElement("div");
//   temp_html.className = "review";
//   temp_html.innerHTML = `
//     <div id="username">${item.user}</div>
//     <div>${item.review}</div>
//     <div class="review-actions">
//       <button class="edit-button">수정</button>
//       <button class="delete-button">삭제</button>
//     </div>
//   `;
//   reviewList.appendChild(temp_html);
// });
