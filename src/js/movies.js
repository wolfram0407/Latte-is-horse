const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjM5OTQ5MDNkZWZlNjNlMDEzYTRmNzE0YWVlNzg2YiIsInN1YiI6IjY1MmY3YWI1MzU4ZGE3NWI1ZjdiMDAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7EuTjSL9EYom7fy58GEjhQqMBdM_U11AqVOQrR1AfY",
  },
};
// 일간
const kofic_movie_List = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";
const keys = "?key=8c82591d207517bee53548604aaff88d";
const targetDt = "&targetDt=20231022";

const getMovies = async (page) => {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  try {
    const res = await fetch(popularUrl, options);
    const data = await res.json();
    let temp = data.results;
    return temp;
  } catch (error) {
    console.log(error);
  }
};

const search_Posts = async (title, year) => {
  const search_url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=ko-KR&page=1&year=${year}`;
  try {
    const res = await fetch(search_url, options);
    const data = await res.json();
    let datas = {
      path: data.results[0].poster_path,
      id: data.results[0].id,
    };
    return datas;
  } catch (err) {
    console.log(err);
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
