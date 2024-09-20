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
        const hexCode = color.hex.value;

        const colorDiv = document.createElement("div");

        colorDiv.style.backgroundColor = hexCode;
        colorDiv.style.backgroundColor = color.hex.value;
        //Styling div
        colorDiv.style.width = "100%";
        colorDiv.style.height = "200px";
        colorDiv.style.position = "relative";
        colorDiv.style.cursor = "pointer";

        // Add hex code inside div
        const hexText = document.createElement("span");
        hexText.textContent = hexCode;
        hexText.style.position = "absolute";
        hexText.style.bottom = "10px";
        hexText.style.left = "10px";
        hexText.style.color = "#fff";
        colorDiv.appendChild(hexText);

        // Feature - copy text to clipboard

        colorDiv.addEventListener("click", function () {
          navigator.clipboard
            .writeText(hexCode)
            .then(() => {
              alert(`Hex code ${hexCode} copied to clipboard!`);
            })
            .catch((err) => {
              console.error(`Failed to copy: `, err);
            });
        });

        colorSchemeContainer.appendChild(colorDiv);
      });
    })
    .catch((error) => {
      //Handle errors
      console.error(`There was a problem with the fetch operation`, error);
    });
});
