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
  if (!Boolean(reviewer.value) || !Boolean(reviewcontent.value) || !Boolean(password.value)) {
    alert("빈칸을 모두 입력해주세요!");
  } else if (!Boolean(parseInt(password.value))) {
    alert("비밀번호는 숫자만 입력 가능합니다!"); 
  } else if (password.value.length < 4) {
    alert("비밀번호는 4자리 이상입니다!");
  } else {
    //처음 parsingdata를 가져올때 key가 없으면 null을 넣기에 null을 제외하는 if문
    if (Boolean(parsingdata)) {
      reviewdata.push(...parsingdata);
    };
    reviewdata.push(userInfo);
    localStorage.setItem(`${getMovie.id}`, JSON.stringify(reviewdata));
    alert("리뷰가 작성되었습니다");
    console.log(password.value.length);

    window.location.reload();
  }
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

//댓글 삭제
document.querySelectorAll('.removeBtn').forEach(btn => btn.addEventListener('click', async (event) => { // 댓글 삭제
  event.preventDefault();
  //html에 넣어놓은 index값을 참조
  const reviewIndex = event.target.parentElement.parentElement.parentElement.getAttribute("reviewIndex");
  const inputpw = prompt("비밀번호를 입력해주세요.");

  if (inputpw) {
    const result = parsingdata[reviewIndex];
    const password = result.pw;
    const leftdata = [];
    if (password === inputpw) {
      parsingdata.splice(reviewIndex, 1);
      leftdata.push(...parsingdata);
      if (leftdata.length === 0) { //localStorage의 value가 빈 배열일때 key를 삭제
        localStorage.removeItem(`${getMovie.id}`);
      } else { //빈 배열이 아니라면 다시 setItem으로 남은값을 저장
        localStorage.setItem(`${getMovie.id}`, JSON.stringify(leftdata));
      };
      alert("삭제 완료");
      window.location.reload();
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else if (inputpw !== null) {
    alert('비밀번호를 입력해주세요!');
  }
}));

//댓글 수정
document.querySelectorAll('.editBtn').forEach(btn => btn.addEventListener('click', async (event) => { 
  event.preventDefault();

  const reviewIndex = event.target.parentElement.parentElement.parentElement.getAttribute("reviewIndex");
  const inputpw = prompt("비밀번호를 입력해주세요.");

  if (inputpw) {
    const result = parsingdata[reviewIndex];
    const password = result.pw;
    const editdata = [];
    if (password === inputpw) {
      const editreview = prompt("리뷰 내용 수정");
      result.review = editreview; //객체의 value를 수정
      editdata.push(...parsingdata);
      localStorage.setItem(`${getMovie.id}`, JSON.stringify(editdata));
      alert("수정 완료");
      window.location.reload();
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  } else if (inputpw !== null) { 
    alert('비밀번호를 입력해주세요!');
  }
}));