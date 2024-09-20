"user strict";

// GLOBAL SCOPE

const seedClrPicker = document.getElementById("clr-seed");
const gnrtBtn = document.getElementById("btn-generate-scheme");
const modeSelect = document.getElementById("clr-scheme-profile");
const count = 5;
let mode = "";
let selectedClr = "";

//Event lstn for mode
modeSelect.addEventListener("change", function (e) {
  mode = e.target.value;
});
//Event lstn for selectedClr
seedClrPicker.addEventListener("input", function (e) {
  selectedClr = e.target.value;
});

//Main logic with API request
gnrtBtn.addEventListener("click", function () {
  const apiUrl = `https://www.thecolorapi.com/scheme?hex=${selectedClr.replace(
    "#",
    ""
  )}&mode=${mode}&count=${count}`;

  //fetch API color scheme
  fetch(apiUrl)
    .then((res) => {
      //check if no errors
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      //extract scheme data from api
      const colors = data.colors;
      colors.forEach((color) => {
        console.log(color.hex.value);
      });
    })
    .catch((error) => {
      //Handle errors
      console.error(`There was a problem with the fetch operation`, error);
    });
});
