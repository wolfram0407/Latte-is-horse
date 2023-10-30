let userName = document.getElementById("userName");
let passwordInput = document.getElementById("password");
let reviewText = document.getElementById("reviewText");
let reviewBtn = document.getElementById("reviewBtn");

reviewBtn.addEventListener("click", () => {
  let user = userName.value;
  let password = passwordInput.value;
  let review = reviewText.value;

  let userData = {
    user: user,
    password: password,
    review: review,
  };

  let userDataJSON = JSON.stringify(userData);
  localStorage.setItem(user, userDataJSON);
  alert("리뷰가 작성되었습니다");

  userName.value = "";
  passwordInput.value = "";
  reviewText.value = "";

  displayReviews();
});

function displayReviews() {
  let reviewField = document.getElementById("reviewField");

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let userDataJSON = localStorage.getItem(key);

    let userData = JSON.parse(userDataJSON);

    let user = userData.user;
    let review = userData.review;

    let reviewElement = document.createElement("div");
    reviewElement.className = "list";
    reviewElement.innerHTML = `<p>${user}</p>${review}`;
    reviewField.appendChild(reviewElement);
  }
}
displayReviews();
