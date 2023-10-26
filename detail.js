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


// local storage에 댓글 및 영화 id 저장
let saveComment = function() {
  let writer = document.getElementsByClassName('writer');
  let password = document.getElementsByClassName('password');
  let commenting = document.getElementsByClassName('commenting');

  let comment = {
    writer : writer[0].value,
    password : password[0].value,
    commenting : commenting[0].value,
    movie_id : getMovie.id,
    date : new Date().getTime(),
  };

  localStorage.setItem(`${getMovie.id} : ${commenting[0].value}`, JSON.stringify(comment));
  alert('Save Complete!');

  location.reload;
};

document.getElementsByClassName('enter')[0].addEventListener('click', function() {
  saveComment();
});

// 댓글 html에 불러오기
document.getElementsByClassName('comment-list')[0].innerHTML = '';
for(let i = 0; i < localStorage.length; i++) {
  let eachComment = JSON.parse(localStorage.getItem(`${localStorage.key(i)}`));
  let eachWriter = eachComment.writer;
  let eachCommenting = eachComment.commenting;

  if (localStorage.key(i).indexOf(getMovie.id) != -1) {
    let temp_html = document.createElement('div');
    temp_html.classList.add('uploaded-comments');
    temp_html.innerHTML = `${eachWriter} : ${eachCommenting}<p></p>`;

    document.getElementsByClassName('comment-list')[0].appendChild(temp_html);
  }
}