const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjM5OTQ5MDNkZWZlNjNlMDEzYTRmNzE0YWVlNzg2YiIsInN1YiI6IjY1MmY3YWI1MzU4ZGE3NWI1ZjdiMDAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7EuTjSL9EYom7fy58GEjhQqMBdM_U11AqVOQrR1AfY",
  },
};

// Popular 20
const getMovies = async (page, idx) => {
  let url = "";
  if (idx == 0) {
    url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  } else if (idx == 1) {
    url = `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&region=KR&page=${page}`;
  }
  try {
    const res = await fetch(url, options);
    const data = await res.json();
    let temp = data.results;
    return temp;
  } catch (error) {
    console.log(error);
  }
};

const findByTitle = async (search, page) => {
  //const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=ko-KR&page=${page}`;
  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=ko-KR&page=${page}`;

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    let temp = data.results;
    return temp;
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

const weeklyBoxOffice = async () => {
  const api_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";
  const api_key = "8c82591d207517bee53548604aaff88d";

  const targetDt = "20231020";
  const weekGb = "1";

  try {
    const results = [];
    const url = `${api_url}?key=${api_key}&targetDt=${targetDt}&weekGb=${weekGb}`;

    const response = await fetch(url);
    const data = await response.json();
    //return data;
    const weeklyBoxOfficeList = data.boxOfficeResult.weeklyBoxOfficeList;

    for (let i = 0; i < weeklyBoxOfficeList.length; i++) {
      const weeklyKofic = weeklyBoxOfficeList[i].movieNm;
      const searchTmdb = await findByTitle(weeklyKofic, 1);

      if (weeklyKofic === searchTmdb[0].title) {
        let temp = {
          title: weeklyBoxOfficeList[i].movieNm,
          rank: weeklyBoxOfficeList[i].rank,
          id: searchTmdb[0].id,
          release_date: searchTmdb[0].release_date,
          overview: searchTmdb[0].overview,
          poster_path: searchTmdb[0].poster_path,
        };
        results.push(temp);
      }
    }
    return results;
  } catch (error) {
    console.log(error);
  }
};

export { getMovies, findByTitle, findByOneDetail, weeklyBoxOffice };
