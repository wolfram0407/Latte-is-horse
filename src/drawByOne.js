const baseurl = "https://image.tmdb.org/t/p/w500";
const zz = "/NNxYkU70HPurnNCSiCjYAmacwm.jpg";
const la = "https://image.tmdb.org/t/p/w50/NNxYkU70HPurnNCSiCjYAmacwm.jpg";
const test = "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";

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

  return true;
};

export { drawItem_detail };
