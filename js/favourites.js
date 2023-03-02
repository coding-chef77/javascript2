import { getExistingFavs } from "./utils/favFunctions.js";
import { clearStorage } from "./utils/clearStorage.js";

const favourites = getExistingFavs();
console.log(favourites);
const favouritContainer = document.querySelector(".favourit-container");

if (favourites.length === 0) {
  favouritContainer.innerHTML = "You have no favourites";
}

favourites.forEach((favourite) => {
  favouritContainer.innerHTML += `<div class="article">
                                    <h4>${favourite.id}<h4>                                 
                                  </div>`;
});

clearStorage();
