// 장르 태그
const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 9b7a29c01a9d90170627cf0e1353ccc1'
  }
};

const api_key = 'api_key=9b7a29c01a9d90170627cf0e1353ccc1&';
fetch(`https://api.themoviedb.org/3/genre/movie/list?${api_key}language=en`, options)
  .then(response => response.json())
  .then(response => {
    console.log(response.genres);
  })
  .catch(err => console.error(err));


const tagsEl = document.getElementById('tags');

let selectGenre = [];

setGenre();
function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if(selectGenre.length == 0){
        selectGenre.push(genre.id);
      } else {
        if (selectGenre.includes(genre.id)) {
          selectGenre.forEach((id,idx) => {

          })
        }
      }
    })
    tagsEl.append(t);
  })
}



