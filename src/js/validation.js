const badwords = ["바보", "멍청이", "시발", "머저리", "새끼"];

const reviewValidation = (userData) => {
  let check = true;

  let badcheck = true;
  badwords.find((element) => {
    if (userData.review.includes(element) === true || userData.user.includes(element) === true || isCheckBadWord(userData.review)) {
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

const isComparePassword = (inputPW, password) => {
  let isSame = true;
  if (inputPW === "") {
    alert(`비밀번호를 입력해주세요!`);
    isSame = false;
  } else if (inputPW !== password) {
    alert(`비밀번호가 일치하지 않습니다!`);
    isSame = false;
  }
  return isSame;
};

const isCheckBadWord = (review) => {
  let isWord = false;
  badwords.find((element) => {
    if (review.includes(element) === true) {
      isWord = true;
    }
  });

  return isWord;
};

export { reviewValidation, isComparePassword, isCheckBadWord };
