import { findByOneDetail } from "./movies.js";
import { drawItem_detail } from "./drawByOne.js";
import { displayReviews } from "./drawReviews.js";
import { reviewValidation } from "./validation.js";
//헤더 정보 표시
const headerInfo = document.querySelector(".header_info");
headerInfo.style.visibility = "visible";

const url = new URL(window.location.href);
headerInfo.href = url.href;
const urlParamsId = url.searchParams.get("id");
// 클릭시 이전으로 이동
const back = document.querySelector(".back");
back.addEventListener("click", () => {
  history.go(-1);
});
// 영화 정보 가지고 와서 표현
let getMovie;
try {
  getMovie = await findByOneDetail(urlParamsId);
} catch (e) {
  console.error("Couldn't find");
}
drawItem_detail(getMovie);

const parsingdata = JSON.parse(localStorage.getItem(`${getMovie.id}`)) ? JSON.parse(localStorage.getItem(`${getMovie.id}`)) : [];
// 등록
document
  .getElementById("reviewBtn")
  .addEventListener("click", async function () {
    let reviewdata = [];
    let reviewer = document.getElementById("userName");
    let reviewcontent = document.getElementById("reviewText");
    let password = document.getElementById("password");
    let userInfo = {
      user: reviewer.value,
      review: reviewcontent.value,
      pw: password.value,
      date: new Date().getTime(),
    };

    if (reviewValidation(userInfo)) {
      //처음 parsingdata를 가져올때 key가 없으면 null을 넣기에 null을 제외하는 if문
      if (parsingdata) {
        reviewdata.push(...parsingdata);
      }
      reviewdata.push(userInfo);
      localStorage.setItem(`${getMovie.id}`, JSON.stringify(reviewdata));
      alert("리뷰가 작성되었습니다.");
      window.location.reload();
    }
  });

displayReviews(parsingdata);

//댓글 삭제
document.querySelectorAll(".removeBtn").forEach((btn) =>
  btn.addEventListener("click", async (event) => {
    // 댓글 삭제
    event.preventDefault();
    //html에 넣어놓은 index값을 참조
    const reviewIndex = event.target.getAttribute("data");

    const inputpw = prompt("비밀번호를 입력해주세요.");

    if (inputpw) {
      const result = parsingdata[reviewIndex];
      console.log(result);
      const password = result.pw;
      const leftdata = [];
      if (password === inputpw) {
        parsingdata.splice(reviewIndex, 1);
        leftdata.push(...parsingdata);
        if (leftdata.length === 0) {
          //localStorage의 value가 빈 배열일때 key를 삭제
          localStorage.removeItem(`${getMovie.id}`);
        } else {
          //빈 배열이 아니라면 다시 setItem으로 남은값을 저장
          localStorage.setItem(`${getMovie.id}`, JSON.stringify(leftdata));
        }
        alert("삭제 완료!");
        window.location.reload();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else if (inputpw !== null) {
      alert("비밀번호를 입력해주세요!");
    }
  })
);

//댓글 수정
document.querySelectorAll(".editBtn").forEach((btn) =>
  btn.addEventListener("click", (event) => {
    console.log(event);
    const reviewIndex = event.target.getAttribute("data");
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
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else if (inputpw !== null) {
      alert("비밀번호를 입력해주세요!");
    }
  })
);
