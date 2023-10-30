// import { drawItems } from "./src/js/drawItems.js";
// import { getMovies } from "./src/js/movies.js";

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

fetch(`https://api.themoviedb.org/3/genre/movie/list?${api_key}&language=en`, options)
  .then(response => response.json())
  .then(response => {
    let genres = response.genres;
    console.log(genres);
    // 장르id를 담을 배열(여러 장르를 select 했을 때 모두 관련된 영화만 보이게)
    let selectedGenre = [];

    setGenre();
    function setGenre() {
      tagsEl.innerHTML = '';
      genres.forEach(genre => {
        // 장르를 집어넣을 div 생성, class와 id, 장르명 부여
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = genre.id;
        t.innerText = genre.name;
        // 장르 div를 클릭하면 selectedGenre 배열에 담기
        t.addEventListener('click', () => {
          if (selectedGenre.length == 0) {  // 배열에 아무것도 담겨있지 않으면
            selectedGenre.push(genre.id); // 조건없이 push
          } else {  // 배열에 뭔가 담겨있긴 해
            // 그게 내가 click한 장르와 같은 id라면
            if (selectedGenre.includes(genre.id)) {
              // 배열을 돌면서 걑은 id를 가진 장르 빼기
              selectedGenre.forEach((id, idx) => {
                if (id == genre.id) {
                  selectedGenre.splice(idx, 1);
                }
              })
            } else {
              selectedGenre.push(genre.id);
            }
          }
          console.log(selectedGenre);
          // getMovies(api_url);
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
          // getMovies(api_url);
        })
        tagsEl.append(clear);
      }
    }
  })
  .catch(err => console.error(err));

// movie.js 의 getMovies(), main.js 의 draw(), drawItem.js 사용하여 hrml에 뿌려야 함..