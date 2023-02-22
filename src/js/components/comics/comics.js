import {
  API_URL,
  URL_COMICS,
  URL_CHARACTERS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
} from "../../constants/api";
import { getDataApi } from "../../helpers/getApi";
import {
  ROOT_COMICSENSE,
  ROOT_DIV,
  ROOT_MODAL,
  ROOT_PRELOADER,
} from "../../constants/root";
import "./comics.scss";
import characters from "./characters/characters";
import error from "../error/error";
import notification from "../notification/notification";
import comicsense from "./comicsense/comicsense";

class comics {
  constructor() {
    this.limit = null;
    this.result = null;
  }

  async render() {
    const res = await getDataApi.getData(API_URL + URL_COMICS);
    console.log(res);
    res ? this.renderContent(res.comics) : error.render();
    ROOT_PRELOADER.classList.add("hide");
    this.limit = res.limit;
    this.result = res.comics;
  }

  renderContent(res) {
    let content = "";
    res.forEach(
      ({
        id,
        title,
        thumbnail: { path, extension },
        dates: {
          0: { date },
        },
      }) => {
        const uri = API_URL + URL_COMICS + "/" + id;
        const uriCharacter =
          API_URL + URL_COMICS + "/" + id + "/" + URL_CHARACTERS;
        const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
        if (!path.includes(IMG_NOT_AVAILABLE)) {
          // console.log(uri);

          // let div = document.createElement("div");
          // div.classList.add("comicsItem");
          // ROOT_DIV.append(div);

          // const comic = `<div class='comicsItem'><p>${title} </p> <img src="${imgSrc}" /> </div>`;
          // ROOT_DIV.insertAdjacentHTML('beforebegin', comic)

          content += `<div class='comicsItem' data-uri-character="${uriCharacter}"> <button data-uri=${uri} class="moreInfo"> More info </button>  <p>${title} </p> <img src="${imgSrc}" /> <p class="date"> ${
            date.split("T")[0]
          } </p> </div>`;
        }
      }
    );
    const comicsWrapper = `<div class="comics_wrapper">${content}</div>`;
    ROOT_DIV.innerHTML = comicsWrapper;
  }

  comicsClickEvent(arr) {
    arr.forEach((el) => {
      const uriComics = el.dataset.uriCharacter;
      const uri = el.querySelector(".moreInfo").dataset.uri;
      el.addEventListener("click", async ({ target: t }) => {
        if (t.classList.contains("moreInfo")) {
          const comicsenseInfo = await getDataApi.getDataSlug(uri);
          comicsense.render(comicsenseInfo);
        } else {
          const arr = await characters.render(uriComics);
          if (arr.length != 0) {
            ROOT_MODAL.classList.add("open");
          } else {
            await notification.render();
            await notification.eventListener();
          }
        }
      });
    });
  }

  eventListener() {
    this.comicsClickEvent(document.querySelectorAll(".comicsItem"));
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
          this.result = res.comics;
        } else {
          e.target.remove();
        }
        ROOT_PRELOADER.classList.add("hide");
        this.comicsClickEvent(document.querySelectorAll(".comicsItem"));
      });
    document
      .querySelector(".titleSort")
      .addEventListener("click", ({ target }) => {
        this.result.sort((a, b) => (a.title > b.title ? 1 : -1));
        this.renderContent(this.result);
      });

    ROOT_COMICSENSE.addEventListener("click", ({ target }) => {
      if (target.classList.contains("open")) {
        setTimeout(() => {
          ROOT_COMICSENSE.classList.remove("open");
        }, 300);
      }
    });
  }
}

export default new comics();
