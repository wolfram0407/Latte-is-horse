function displayReviews(reviewArray) {
  let reviewField = document.getElementById("reviewField");
  reviewField.innerHTML = "";

  reviewArray.sort((a, b) => b.date - a.date);
  let length = 0;
  for (let userData of reviewArray) {
    let user = userData.user;
    let review = userData.review;
    let date = new Date(userData.date);
    reviewField.innerHTML += `
          <div class="reviewList">
            <div class="user">
              <p>${user}</p>
            </div>
            <div class="review">
              ${review}
            </div>
            <div class="reviewBottom">
              <div class="date">
                <p>${formatDateTime(date)}</p>
              </div>
              <div>
                <button class="removeBtn" data=${length}>삭제</button>
              </div>
            </div>
          </div>
        `;

    length++;
  }
}
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}

export { displayReviews };
