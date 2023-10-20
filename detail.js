import { findByOneDetail } from "./src/movies.js";
import { drawItem_detail } from "./src/drawByOne.js";
const url = new URL(window.location.href);
const urlParams = url.searchParams.get("id") ? url.searchParams.get("id") : 109445;
const back = document.querySelector(".back");
let z = await findByOneDetail(urlParams);
draw(z);
back.addEventListener("click", () => {
  history.go(-1);
});
function draw(x) {
  let text = "";
  text += drawItem_detail(x);
  return text;
}
