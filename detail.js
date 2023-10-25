import { findByOneDetail } from "./src/js/movies.js";
import { drawItem_detail } from "./src/js/drawByOne.js";

const url = new URL(window.location.href);
const headerInfor = document.querySelector(".header_info");
headerInfor.style.visibility = "visible";
const urlParams = url.searchParams.get("id") ? url.searchParams.get("id") : 109445;
const back = document.querySelector(".back");
let z = await findByOneDetail(urlParams);
draw(z);

back.addEventListener("click", () => {
  history.go(-1);
});
function draw(x) {
  drawItem_detail(x);
}
