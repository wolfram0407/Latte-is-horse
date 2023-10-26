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

const reviewValidation = async (review) => {
  let check = true;
  const badwords = ["바보", "멍청이", "시발", "머저리", "새끼"];
  let badcheck = true;
  badwords.forEach((element) => {
    if (review.context.includes(element) === true) {
      badcheck = false;
    }
  });

  console.log(Number("a111")); //NaN

  if (review.name === "" || review.context === "" || review.password === "") {
    alert(`내용을 모두 입력해주세요!`);
    check = false;
  } else if (
    review.password.length !== 4 ||
    parseInt(review.password).length !== 4
  ) {
    alert(`비밀번호는 4자리 숫자입니다!`);
    check = false;
  } else if (review.context.length < 20 || review.context.length > 400) {
    alert(`리뷰는 20자 이상 400자 이하로 작성 부탁드립니다.`);
    check = false;
  } else if (badcheck === false) {
    alert(`욕은 작성할 수 없습니다.`);
    check = false;
  }

  return check;
};

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
