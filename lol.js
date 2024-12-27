// Initiate download of blob
import { Canvg } from "https://cdn.skypack.dev/canvg@^4.0.0";

function download(
  filename, // string
  blob // Blob
) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function downloadOnClick() {
  console.log("oi");
  const svg = document.querySelector("svg");
  // const data = new XMLSerializer().serializeToString(svg);
  const data = svg.outerHTML.toString();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  console.log(svg);
  let x = Canvg.fromString(ctx, data);
  x.render();
  canvas.toBlob((blob) => {
    download("MyImageName.png", blob);
  });
}

let btn = document.querySelector("button");
btn.addEventListener("click", downloadOnClick);
