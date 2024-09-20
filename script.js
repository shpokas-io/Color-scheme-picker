"user strict";

// GLOBAL SCOPE

const seedClrPicker = document.getElementById("clr-seed");
const gnrtBtn = document.getElementById("btn-generate-scheme");
const modeSelect = document.getElementById("clr-scheme-profile");
const colorSchemeContainer = document.querySelector(".clr-container");
const count = 5;
let mode = "";
let selectedClr = "";

//Function for a color DIV

function createColorDiv(hexCode) {
  const colorDiv = document.createElement("div");

  colorDiv.style.backgroundColor = hexCode;
  colorDiv.classList.add("clr");
  colorDiv.style.position = "relative";
  colorDiv.style.cursor = "pointer";
  colorDiv.style.width = "100%";

  const hexText = document.createElement("span");

  hexText.textContent = hexCode;
  hexText.style.position = "absolute";
  hexText.style.bottom = "10px";
  hexText.style.left = "10px";
  hexText.style.color = "#fff";
  colorDiv.appendChild(hexText);

  // Feature -> Copy HEx code to clipboard
  colorDiv.addEventListener("click", () => {
    navigator.clipboard
      .writeText(hexCode)
      .then(() => alert(`Hex code ${hexCode} copied to clipboard!`))
      .catch((err) => console.error(`Failed to copy: `, err));
  });

  return colorDiv;
}

//Event listener for mode variable
modeSelect.addEventListener("change", function (e) {
  mode = e.target.value;
});

//Event listener for selectedClr variable
seedClrPicker.addEventListener("input", function (e) {
  selectedClr = e.target.value;
});

//Main logic with API request
gnrtBtn.addEventListener("click", function () {
  const apiUrl = `https://www.thecolorapi.com/scheme?hex=${selectedClr.replace(
    "#",
    ""
  )}&mode=${mode}&count=${count}`;

  //Fetch API color scheme
  fetch(apiUrl)
    .then((res) => {
      //check if no errors
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      // Clear

      colorSchemeContainer.innerHTML = "";
      data.colors.forEach((color) => {
        const hexCode = color.hex.value;
        const colorDiv = createColorDiv(hexCode);
        colorSchemeContainer.appendChild(colorDiv);
      });
    })
    .catch((error) => {
      //Handle errors
      console.error(`There was a problem with the fetch operation`, error);
    });
});
