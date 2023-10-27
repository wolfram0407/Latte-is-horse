import { findByTitle } from "./src/js/movies.js";

const api_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";
const api_key = "8c82591d207517bee53548604aaff88d";

const targetDt = "20231020";
const weekGb = "1";

const weeklyBoxOffice = async () => {
  try {
    const url = `${api_url}?key=${api_key}&targetDt=${targetDt}&weekGb=${weekGb}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    //return data;
    const weeklyBoxOfficeList = data.boxOfficeResult.weeklyBoxOfficeList;
    const weeklyfirst = weeklyBoxOfficeList[0].movieNm

    const searchKofic = await findByTitle (weeklyfirst, 1);
    console.log(searchKofic[0].release_date);
    // weeklyBoxOfficeList.forEach(weeklyMovie => {;
    //   console.log(weeklyMovie.movieNm)
    // });
    // const release = searchKofic.filter(date => searchKofic.release_date)

  } catch (error) {
    console.log(error);
  }
};


  export { weeklyBoxOffice };