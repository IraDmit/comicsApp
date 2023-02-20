import {
  API_URL,
  URL_COMICS,
  URL_CHARACTERS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
} from "../../constants/api";
import { getDataApi } from "../../helpers/getApi";
import { ROOT_DIV, ROOT_MODAL, ROOT_PRELOADER } from "../../constants/root";
import "./comics.scss";
import characters from "./characters/characters";
import error from "../error/error";
import notification from "../notification/notification";

class comics {
  constructor() {
    this.limit = null;
  }

  async render() {
    const res = await getDataApi.getData(API_URL + URL_COMICS);
    res ? this.renderContent(res.comics) : error.render();
    ROOT_PRELOADER.classList.add("hide");
    this.limit = res.limit;
  }

  renderContent(res) {
    let content = "";
    res.forEach(({ id, title, thumbnail: { path, extension } }) => {
      const uri = API_URL + URL_COMICS + "/" + id + "/" + URL_CHARACTERS;
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      if (!path.includes(IMG_NOT_AVAILABLE)) {
        // console.log(uri);

        // let div = document.createElement("div");
        // div.classList.add("comicsItem");
        // ROOT_DIV.append(div);

        // const comic = `<div class='comicsItem'><p>${title} </p> <img src="${imgSrc}" /> </div>`;
        // ROOT_DIV.insertAdjacentHTML('beforebegin', comic)

        content += `<div class='comicsItem' data-uri="${uri}"><p>${title} </p> <img src="${imgSrc}" /> </div>`;
      }
    });
    // TODO fix undefined
    const comicsWrapper = `<div class="comics_wrapper">${content}</div>`;
    ROOT_DIV.innerHTML = comicsWrapper;
  }

  eventListener() {
    document.querySelectorAll(".comicsItem").forEach((el) => {
      const uriComics = el.dataset.uri;
      el.addEventListener("click", async (e) => {
        const arr = await characters.render(uriComics);
        console.log(arr);
        if (arr.length != 0) {
          ROOT_MODAL.classList.add("open");
        } else {
          await notification.render();
          await notification.eventListener();
        }
      });
    });
    ROOT_MODAL.addEventListener("click", ({ target }) => {
      if (target.classList.contains("open")) {
        ROOT_MODAL.classList.remove("open");
      }
    });
    document
      .querySelector(".renderComics")
      .addEventListener("click", async (e) => {
        ROOT_PRELOADER.classList.remove("hide");
        const res = await getDataApi.getData(
          API_URL + URL_COMICS,
          this.limit + 10
        );
        if (res) {
          this.limit += 10;
          this.renderContent(res.comics);
          
        } else {
          e.target.remove();
        }
        ROOT_PRELOADER.classList.add("hide");
      });
  }
}

export default new comics();
