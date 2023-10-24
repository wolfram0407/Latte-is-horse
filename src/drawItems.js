const baseurl = "https://image.tmdb.org/t/p/w500";
const drawItems = (movie) => {
  const imageUrl = baseurl + movie.path;
  const url = new URL(window.location.href).host;
  const urls = "http://" + url + "/detail.html?id=" + movie.id;
  let name = movie.movieNm;
  let date = movie.openDt;

  let text = `  
      <a class="movie" href="${urls}" style="background-image:url(${imageUrl})">
        <div class="info">
          <div class="title">${name}</div>
          <div class="year">${date}</div>
        </div>
      </a>`;
  return text;
};

export { drawItems };
