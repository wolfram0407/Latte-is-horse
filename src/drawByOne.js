const baseurl = "https://image.tmdb.org/t/p/w500";

const drawItem_detail = (movie) => {
  // draw poster
  const imageUrl = baseurl + movie.poster_path;
  const poster = document.querySelector(".poster");
  poster.setAttribute("style", `background-image:url(${imageUrl})`);
  // draw title
  const title = document.querySelector(".title");
  title.innerHTML = `${movie.title}`;
  // draw release date and runtime
  const labels = document.querySelector(".labels");
  labels.innerHTML = `
    <span>${movie.release_date} </span>
    <span>${movie.runtime} 분</span>
  `;
  // draw plot
  const plot = document.querySelector(".plot");
  plot.innerHTML = `${movie.overview}`;
  // draw ratings
  const ratings = document.querySelector(".rating");
  const rating = document.createElement("span");
  ratings.appendChild(rating);
  let z = ratings.children.item(0);
  z.innerHTML = `${movie.vote_average} / ${movie.vote_count} votes`;
  // draw company
  const companies = document.querySelector(".companies");
  const company = document.createElement("span");
  companies.appendChild(company);
  z = companies.children.item(1);
  z.innerHTML = `${movie.production_companies[0].name}`;
  // draw genres
  const genres = document.querySelector(".genres");
  for (let i in movie.genres) {
    let addSpan = document.createElement("span");
    genres.appendChild(addSpan);
    let v = parseInt(i) + 1;
    let a = genres.children.item(v);
    a.innerHTML = `${movie.genres[i].name}`;
  }

  //리뷰
  let reviewtext = drawReview(movie);
  const reviewCheck = document.querySelector(".review-check");
  reviewCheck.innerHTML += `${reviewtext}`;
};

const drawReview = (movie) => {
  //해당 movie의 id를 갖는 key값의 review를 화면에 표시한다.
  //1, 2, 3 연속으로 나오게? 아니면 next를 눌러 하나씩 확인하도록?
  let reviewCount = 0;
  let text = "";
  let getreview = "";
  let keynum = 1;
  let key = "key" + movie.id + "_" + String(keynum);

  while (localStorage.getItem(key) !== null) {
    let review = JSON.parse(localStorage.getItem(key));
    console.log(review);
    reviewCount++;
    getreview += `
    <div class="review-value" id = ${key}>
      <span>작성자 : ${review.name} </span> <br>
      <span> ${review.context} </span> <br>
      <input type="password" id="edit-password" class="edit-password" placeholder="비밀번호4자리">
      <button type="submit" id="remove-submitBtn" class="remove-submitBtn">리뷰삭제</button>
    </div>
    `;

    key = "key" + movie.id + "_" + String(++keynum);
  }

  text = `<h4>리뷰 개수 : ${reviewCount}</h4>` + getreview;

  //리뷰 없음
  if (reviewCount === 0) {
    text = `<h4>현재 리뷰가 존재하지 않습니다.</h4>`;
  }

  //const reviewCheck = document.querySelector(".review-check");
  //reviewCheck.innerHTML = `${text}`;

  return text;
};

export { drawItem_detail, drawReview };
