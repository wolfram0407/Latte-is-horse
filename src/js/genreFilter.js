// import { drawItems } from "./drawItems.js";

import { drawItems } from "./drawItems.js";


// // 장르 태그
// const genres = [
//   { id: 28, name: "Action" },
//   { id: 12, name: "Adventure" },
//   { id: 16, name: "Animation" },
//   { id: 35, name: "Comedy" },
//   { id: 80, name: "Crime" },
//   { id: 99, name: "Documentary" },
//   { id: 18, name: "Drama" },
//   { id: 10751, name: "Family" },
//   { id: 14, name: "Fantasy" },
//   { id: 36, name: "History" },
//   { id: 27, name: "Horror" },
//   { id: 10402, name: "Music" },
//   { id: 9648, name: "Mystery" },
//   { id: 10749, name: "Romance" },
//   { id: 878, name: "Science Fiction" },
//   { id: 10770, name: "TV Movie" },
//   { id: 53, name: "Thriller" },
//   { id: 10752, name: "War" },
//   { id: 37, name: "Western" }
// ];

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 9b7a29c01a9d90170627cf0e1353ccc1'
  }
};

const api_key = 'api_key=9b7a29c01a9d90170627cf0e1353ccc1';
const base_url = 'https://api.themoviedb.org/3';
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;

const tagsEl = document.getElementById('tags');
const moviesEl = document.querySelector(".populars");

async function getGenre() {

  try {
    let temp = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${api_key}&language=en`, options);
    let temp2 = temp.json();

    // console.log(temp2);

    return temp2;
  } catch (error) {
    console.error(error);
  }

}
let genre = await getGenre();
// console.log(genre.genres);

// 장르id를 담을 배열(여러 장르를 select 했을 때 모두 관련된 영화만 보이게)
let selectedGenre = [];

setGenre();
function setGenre() {
  tagsEl.innerHTML = '';
  genre.genres.forEach(gen => {
    // 장르를 집어넣을 div 생성, class와 id, 장르명 부여
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = gen.id;
    t.innerText = gen.name;
    // 장르 div를 클릭하면 selectedGenre 배열에 담기
    t.addEventListener('click', async () => {
      if (selectedGenre.length == 0) {  // 배열에 아무것도 담겨있지 않으면
        selectedGenre.push(gen.id); // 조건없이 push
      } else {  // 배열에 뭔가 담겨있긴 해
        // 그게 내가 click한 장르와 같은 id라면
        if (selectedGenre.includes(gen.id)) {
          // 배열을 돌면서 걑은 id를 가진 장르 빼기
          selectedGenre.forEach((id, idx) => {
            if (id == gen.id) {
              selectedGenre.splice(idx, 1);
            }
          })
        } else {
          selectedGenre.push(gen.id);
        }
      }
      // console.log(selectedGenre);
      // getMovies(api_key + '&with_genres='+encodeURI(selectedGenre.join(',')));
      showMovies(selectedGenre);

      highlightSelection();
    })
    tagsEl.append(t);
  })
}

// select된 장르 보이게
function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => { // 기존에 있던 하이라이트class 지우기
    tag.classList.remove('highlight');
  })
  clearBtn();
  if (selectedGenre.length != 0) {  // 빈 배열이 아니라면
    selectedGenre.forEach(id => { // 배열에 저장된 id값을 다시 받아 하이라이트class 추가
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add('highlight');
    })
  } else { // 빈 배열이라면 clearBtn을 지우기 위해 장르버튼 다시 생성
    setGenre();
  }
}

// select된 장르 배열 한번에 비우기 버튼 생성
function clearBtn() {
  let clearBtn = document.getElementById('clear');
  if (clearBtn) { // 클리어 버튼이 있었다면 (highlightSelection에서 하이라이트 클래스 다 지웠으니까) 하이라이트 클래스 추가
    clearBtn.classList.add('highlight');
  } else {  // 없다면 클리어버튼 만들어주기
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Clear x';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenre();
      showMovies(selectedGenre);
    })
    tagsEl.append(clear);
  }
}

// movie.js 의 getMovies(), main.js 의 draw(), drawItem.js 사용하여 hrml에 뿌려야 함..
// getMovies(api_key + '&with_genres='+encodeURI(selectedGenre.join(',')));

async function getMovies2(selectedGenre) {
  let getGenre = selectedGenre[0];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjM5OTQ5MDNkZWZlNjNlMDEzYTRmNzE0YWVlNzg2YiIsInN1YiI6IjY1MmY3YWI1MzU4ZGE3NWI1ZjdiMDAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7EuTjSL9EYom7fy58GEjhQqMBdM_U11AqVOQrR1AfY",
    },
  };

  try {
    let temp = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=${encodeURI(selectedGenre.join(','))}`, options);
    let temp2 = temp.json();

    return temp2;
  } catch (error) {
    console.error(error);
  }

}

async function showMovies(selectedGenre) {
  let filtering = await getMovies2(selectedGenre);

  moviesEl.innerHTML = "";
  let text = "";
  for (const result of filtering.results) {
    text += drawItems(result);
  }
  moviesEl.innerHTML = text;
}

export { setGenre };