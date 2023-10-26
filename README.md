# nbc_individual_1

demo : https://charming-mermaid-9c649f.netlify.app/

- 팀 과제 요구 사항 체크 리스트
    - 필수 요구 사항
        - [ ]  TMDB or 영화진흥위원회 open API 사용 (택1 or 중복 가능)
        - [ ]  영화 상세 페이지 구현
            - [ ]  카드 클릭 시 상세 페이지로 이동
            - [ ]  상세 페이지에서 메인 페이지로 이동하는 기능 구현
        - [ ]  상세 페이지 영화 리뷰 작성 기능
            - [ ]  영화에 대한 의견 작성 기능
            - [ ]  작성자 표시
            - [ ]  확인 비밀번호 입력
            - [ ]  작성 정보는 브라우저 localStorage에 적재
        - [ ]  github를 사용한 협업
        - [ ]  UX를 고려한 validation check(유효성 검사)
            - [ ]  영화 검색 시
            - [ ]  댓글 작성 시 (ex 30자 이상 작성)
            - [ ]  추가 기능 구현 필수
        - [ ]  문법 리스트 5개 이상 사용
            - [ ]  변수 선언 const, let만 사용
            - [ ]  형 변환 2개 이상 사용
                - [ ]  (number → string)
                - [ ]  (string → number)
                - [ ]  (boolean → string)
            - [ ]  연산자 3개 이상 사용
                - [ ]  &&
                - [ ]  ||
                - [ ]  !
                - [ ]  ? :
            - [ ]  화살표 함수 2개 이상 사용
                - [ ]  일반 (x) ⇒ {x};
                - [ ]  한 줄 (x) ⇒ x;
                - [ ]  단일 매개변수 x ⇒ x;
            - [ ]  조건문 전부 사용
                - [ ]  if문 1개 이상 사용
                    - [ ]  if
                    - [ ]  if - else
                    - [ ]  if - else if - else
                - [ ]  switch문
                - [ ]  삼항 연산자
                - [ ]  조건문 중첩 1개 이상 사용
                    - [ ]  이중 if문
                    - [ ]  if 내부 switch
            - [ ]  반복문 전부 사용
                - [ ]  for문 2개 이상 사용
                    - [ ]  for
                    - [ ]  for in
                    - [ ]  for of
                - [ ]  while문 1개 이상 사용
                    - [ ]  while
                    - [ ]  do while
                - [ ]  반복 제어 명령문 1개 이상 사용
                    - [ ]  break
                    - [ ]  continue
            - [ ]  객체 병합 (…x1, …x2)
            - [ ]  배열 메소드(1) 2개 이상 사용
                - [ ]  push
                - [ ]  pop
                - [ ]  shift
                - [ ]  unshift
                - [ ]  splice
                - [ ]  slice
            - [ ]  배열 메소드(2) 3개 이상 사용
                - [ ]  forEach
                - [ ]  map
                - [ ]  filter
                - [ ]  reduce
                - [ ]  find
            - [ ]  자료구조 1개 이상 사용
                - [ ]  map
                    - [ ]  new Map()
                    - [ ]  map.set(k,v)
                    - [ ]  map.get(k)
                    - [ ]  map.has(k)
                    - [ ]  map.delete(k)
                    - [ ]  map.clear()
                    - [ ]  map.size
                - [ ]  set
                    - [ ]  new Set()
                    - [ ]  set.add(v)
                    - [ ]  set.has(v)
                    - [ ]  set.delete(v)
                    - [ ]  set.clear()
                    - [ ]  set.size
                - [ ]  list
            - [ ]  null, undefined를 사용한 ‘없는 값’ 필수 구현
            - [ ]  callback 함수 필수 구현
                - [ ]  setTimeout
                - [ ]  setInterval
            - [ ]  DOM제어 4개 이상 사용
                1. 문서 객체 생성과 선택
                - [ ]  createElement
                - [ ]  getById
                - [ ]  getByTag
                - [ ]  getByClass
                - [ ]  querySelector
                - [ ]  querySelectorAll
                1. 문서 객체 조작
                - [ ]  innerHTML
                - [ ]  textContent
                - [ ]  setAttribute
                - [ ]  getAttribute
                - [ ]  style.property
                - [ ]  appendChild
                - [ ]  removeChild
                - [ ]  classList.add
                - [ ]  classList.remove
                - [ ]  classList.toggle
                1. 이벤트 처리
                - [ ]  addEventListener
                - [ ]  removeEventListener
                - [ ]  preventDefalt
                - [ ]  stopPropagating
                1. 기타
                - [ ]  window.location.href
                - [ ]  window.alert
                - [ ]  window.confirm
            - [ ]  module
                - [ ]  import
                - [ ]  export
    - 선택 요구사항
        - [ ]  CSS
            - [ ]  flex 사용
            - [ ]  grid 사용
            - [ ]  반응형 UI 구성
        - [ ]  상세 페이지 리뷰 수정 및 삭제 기능
        - [ ]  메인 페이지
            - [ ]  조건에 맞는 카드리스트 정렬 기능 ( 이름순, 별점순 + … )
        - [ ]  기타 API