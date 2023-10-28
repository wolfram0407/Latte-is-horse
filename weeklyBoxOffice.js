import { findByTitle } from "./src/js/movies.js";

const api_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";
const api_key = "8c82591d207517bee53548604aaff88d";

const targetDt = "20231020";
const weekGb = "1";

const weeklyBoxOffice = async () => {
  try {
    const results =[];
    const url = `${api_url}?key=${api_key}&targetDt=${targetDt}&weekGb=${weekGb}`;

    const response = await fetch(url);
    const data = await response.json();
    //return data;
    const weeklyBoxOfficeList = data.boxOfficeResult.weeklyBoxOfficeList;

    for ( let i = 0; i < weeklyBoxOfficeList.length; i++) {
      const weeklyKofic = weeklyBoxOfficeList[i].movieNm;
      const searchTmdb = await findByTitle(weeklyKofic, 1);

      if (weeklyKofic === searchTmdb[0].title) {        
        let temp = {
          title: weeklyBoxOfficeList[i].movieNm,
          rank: weeklyBoxOfficeList[i].rank,    
          id: searchTmdb[0].id,
          release_date: searchTmdb[0].release_date,
          overview: searchTmdb[0].overview,
          poster_path: searchTmdb[0].poster_path
        };
        results.push(temp);
      }
    }
    return results;
  } catch (error) {
    console.log(error);
    }
  };

  export { weeklyBoxOffice };