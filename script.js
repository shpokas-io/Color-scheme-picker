"user strict";

// GLOBAL SCOPE

const seedClrPicker = document.getElementById("clr-seed");
const gnrtBtn = document.getElementById("btn-generate-scheme");
const modeSelect = document.getElementById("clr-scheme-profile");
const colorSchemeContainer = document.querySelector(".clr-container");
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
      // CLEAR
      colorSchemeContainer.innerHTML = "";

      // colorSchemeContainer.innerHTML = "";

      colors.forEach((color) => {
        const colorDiv = document.createElement("div");
        colorDiv.style.backgroundColor = color.hex.value;

        colorDiv.style.width = "100px";
        colorDiv.style.height = "200px";

        colorSchemeContainer.appendChild(colorDiv);
      });
    })
    .catch((error) => {
      //Handle errors
      console.error(`There was a problem with the fetch operation`, error);
    });
});
