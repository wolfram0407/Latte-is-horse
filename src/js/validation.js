const reviewValidation = (userData) => {
  let check = true;
  const badwords = ["바보", "멍청이", "시발", "머저리", "새끼"];
  let badcheck = true;

  badwords.forEach((element) => {
    if (userData.review.includes(element) === true || userData.user.includes(element) === true) {
      badcheck = false;
    }
  });

  if (userData.user === "" || userData.review === "" || userData.password === "") {
    alert(`내용을 모두 입력해주세요!`);
    check = false;
  } else if (isavailablepassword(userData.pw) === false) {
    alert(`비밀번호는 8자리 이상 20자리 이하의 연속되지 않은 숫자, 문자, 특수문자를 포함해야 합니다!`);
    check = false;
  } else if (userData.review.length < 20 || userData.review.length > 400) {
    alert(`리뷰는 20자 이상 400자 이하로 작성 부탁드립니다.`);
    check = false;
  } else if (badcheck === false) {
    alert(`욕은 작성할 수 없습니다.`);
    check = false;
  }
  return check;
};

const isavailablepassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?!.*\s)(?!.*(.)\1{2,})(?!.*(123|abc)).{8,20}$/;

  return passwordRegex.test(password);
};

export { reviewValidation };
