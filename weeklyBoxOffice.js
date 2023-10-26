
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
    return data;
  } catch (error) {
    console.log(error);
  }
};

  export { weeklyBoxOffice };