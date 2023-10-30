const baseurl = "https://image.tmdb.org/t/p/w500";
const drawItems = (movie) => {
  const imageUrl = baseurl + movie.poster_path;
  const url = new URL(window.location.href).host;
  console.log(url);
  const urls = "/src/detail.html?id=" + movie.id;
  let name = movie.title ? movie.title : movie.original_title;
  let date = movie.first_air_date ? movie.first_air_date : movie.release_date;

  let text = `  
      <a class="movie swiper-slide" href="${urls}" style="background-image:url(${imageUrl})">
        <div class="info">
          <div class="title">${name}</div>
          <div class="year">${date}</div>
        </div>
      </a>`;
  return text;
};

export { drawItems };
