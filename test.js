const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjM5OTQ5MDNkZWZlNjNlMDEzYTRmNzE0YWVlNzg2YiIsInN1YiI6IjY1MmY3YWI1MzU4ZGE3NWI1ZjdiMDAyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7EuTjSL9EYom7fy58GEjhQqMBdM_U11AqVOQrR1AfY",
    },
};
//   fetch(
//     `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=12`,
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));

try {
    let temp = fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_genres=12`,
        options
    );
    console.log(temp);
    let temp2 = temp.json();
    console.log(temp2);

} catch (error) {
    console.error(error);
}
