import { getExistingFavs } from "./utils/favFunctions.js";
import { baseUrl } from "./settings/api.js";

const articleUrl = baseUrl + "articles";

(async function () {
  const container = document.querySelector(".article-container");

  const favourites = getExistingFavs();

  try {
    const response = await fetch(articleUrl);
    const json = await response.json();

    container.innerHTML = "";

    json.forEach((article) => {
      container.innerHTML += `<div class="article">
                                <ul>
                                  <li>
                                    <h4>Title: ${article.title}</h4>
                                    <h5>Author: ${article.author}</h5>
                                    <p>${article.summary}</p>
                                  </li>
                                  <button type="button" class="btn btn-primary" data-bs-toggle="button" data-id="${article.id} data-title${article.title}">Store me</button>
                                  
                                </ul>                             
                              </div>`;
    });
  } catch (error) {
    console.log(error);
  }
  const favButtons = document.querySelectorAll(".article button");

  favButtons.forEach((button) => {
    button.addEventListener("click", handleClick);
  });

  function handleClick() {
    this.classList.toggle("btn-primary");
    this.classList.toggle("btn-secondary");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const currentFavs = getExistingFavs();

    const articleExists = currentFavs.find(function (fav) {
      return fav.id === id;
    });

    if (!articleExists) {
      const article = { id: id, title: title };
      currentFavs.push(article);
      saveFavs(currentFavs);
    } else {
      const newFavs = currentFavs.filter((fav) => fav.id !== id);
      saveFavs(newFavs);
    }
  }

  function saveFavs(favs) {
    localStorage.setItem("favourites", JSON.stringify(favs));
  }
})();
