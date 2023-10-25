console.log("hello world");
let saveinfo = async function () {
    let reviewer = document.getElementById("review-id").value;
    let reviewcontent = document.getElementById("review-text").value;
    let password = document.getElementById("review-pw").value;
    let userInfo = { user: reviewer, review: reviewcontent, pw: password };
    // if (!Boolean(reviewer) || !Boolean(reviewcontent) || !Boolean(password)) {
    //   alert("빈칸을 모두 입력해주세요!");
    // } else if (typeof password !== 'number') {
    //   console.log(typeof password);
    //   alert("비밀번호는 숫자만 입력 가능합니다!");
    // } else if (password.length < 4) {
    //   alert("비밀번호는 4자리 이상입니다!");
    // } else {
    localStorage.setItem(`${reviewer}Info-${z.id}`, JSON.stringify(userInfo));
    alert("저장 완료!");
};