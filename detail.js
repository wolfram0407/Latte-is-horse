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

const parsingdata = JSON.parse(localStorage.getItem(`${getMovie.id}`));

document.getElementById("reviewBtn").addEventListener("click", async function () {
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
    };
    reviewdata.push(userInfo);
    localStorage.setItem(`${getMovie.id}`, JSON.stringify(reviewdata));
    alert("리뷰가 작성되었습니다");

    // reviewer.value = "";
    // password.value = "";
    // reviewcontent.value = "";

    window.location.reload();
  // }
});

function displayReviews() {
  let reviewField = document.getElementById("reviewField");
  reviewField.innerHTML = "";

  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  for (let i = parsingdata.length - 1; i >= 0; i--) {
    let eachInfo = parsingdata[i];
    let eachUser = eachInfo.user;
    let eachReview = eachInfo.review;
    let eachdate = new Date(eachInfo.date);

    reviewField.innerHTML += `
      <div class="reviewList" reviewIndex="${i}">
        <div class="user">
          <p>${eachUser}</p>
        </div>
        <div class="review">
          ${eachReview}
        </div>
        <div class="reviewBottom">
          <div class="date">
            <p>${formatDateTime(eachdate)}</p>
          </div>
          <div>
            <button class="removeBtn" id="deleteBtn">삭제</button>
            <button class="editBtn" id="editBtn">수정</button>
          </div>
        </div>
      </div>
      `;
  };
}
displayReviews();

document.querySelectorAll('.removeBtn').forEach(btn => btn.addEventListener('click', async (event) => { // 댓글 삭제
  event.preventDefault();

  const reviewIndex = event.target.parentElement.parentElement.parentElement.getAttribute("reviewIndex");
  const inputpw = prompt("비밀번호를 입력해주세요.");

  if (inputpw) {
    const result = parsingdata[reviewIndex];
    const password = result.pw;
    const leftdata = [];
    if (password === inputpw) {
      parsingdata.splice(reviewIndex, 1);
      leftdata.push(...parsingdata);
      if (leftdata.length === 0) {
        localStorage.removeItem(`${getMovie.id}`);
      } else {
        localStorage.setItem(`${getMovie.id}`, JSON.stringify(leftdata));
      };
      alert("삭제 완료");
      window.location.reload();
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else if (inputpw !== null) { // 확인을 누를 시 비밀번호가 없을 경우
    alert('비밀번호를 입력해주세요!');
  }
}));

document.querySelectorAll('.editBtn').forEach(btn => btn.addEventListener('click', async (event) => { // 댓글 수정
  event.preventDefault();

  const reviewIndex = event.target.parentElement.parentElement.parentElement.getAttribute("reviewIndex");
  const inputpw = prompt("비밀번호를 입력해주세요.");

  if (inputpw) {
    const result = parsingdata[reviewIndex];
    const password = result.pw;
    const editdata = [];
    if (password === inputpw) {
      const editreview = prompt("리뷰 내용 수정");
      result.review = editreview;
      editdata.push(...parsingdata);
      localStorage.setItem(`${getMovie.id}`, JSON.stringify(editdata));
      alert("수정 완료");
      window.location.reload();
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else if (inputpw !== null) { // 확인을 누를 시 비밀번호가 없을 경우
    alert('비밀번호를 입력해주세요!');
  }
}));
// for (let i = 0; i < localStorage.length; i++) {
//   let eachInfo = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`));
//   let eachUser = eachInfo.user;
//   let eachReview = eachInfo.review;
//   if (localStorage.key(i).indexOf(z.id) != -1) {
//     let temp_html = `
//         <div class="review">
//             <div>${eachUser}</div>
//             <div>${eachReview}</div>
//             <div class="review-actions">
//                 <button class="delete-button">삭제</button>
//             </div>
//         </div>
//         `;
//     let reviewList = document.getElementById("review-list");
//     reviewList.append(temp_html);
//   };
// };

// // 객체 배열을 생성하여 localStorage의 데이터를 저장
// const reviewData = [];
// for (let i = 0; i < localStorage.length; i++) {
//   const key = localStorage.key(i);
//   const eachInfo = JSON.parse(localStorage.getItem(key));
//   const eachUser = eachInfo.user;
//   const eachReview = eachInfo.review;
//   const timestamp = eachInfo.date;

//   // getMovie.id를 키에 포함하는 항목만 포함
//   if (key.includes(getMovie.id)) {
//     reviewData.push({
//       key: key,
//       user: eachUser,
//       review: eachReview,
//       date: timestamp
//     });
//   }
// }

// // reviewData를 타임스탬프 순으로 정렬
// reviewData.sort((a, b) => {
//   return a.date - b.date;
// });

// // 정렬된 데이터를 사용하여 HTML을 생성
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
