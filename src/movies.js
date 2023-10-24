const getMovies = async (page) => {
  const popularUrl = kofic_movie_List + keys + targetDt;

  try {
    //const res = await fetch(popularUrl, options);
    const res = await fetch(popularUrl);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const findByTitle = async (search, page) => {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=ko-KR&page=${page}`;
  try {
    const res = await fetch(searchUrl, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const findByOneDetail = async (search) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${search}?language=ko-KR`;
  try {
    const res = await fetch(movieUrl, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { getMovies, findByTitle, findByOneDetail };
