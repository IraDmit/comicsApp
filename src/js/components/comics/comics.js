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
import error from "../error/error";
import notification from "../notification/notification";
import comicsense from "./comicsense/comicsense";
import events from "./events/events";

// styles
import "./comics.scss";

class comics {
  constructor() {
    this.limit = null;
    this.result = null;
  }

  async render() {
    const res = await getDataApi.getData(API_URL + URL_COMICS);
    // console.log(res);
    res ? this.renderContent(res.comics) : error.render();
    ROOT_PRELOADER.classList.add("hide");
    this.limit = res.limit;
    this.result = res.comics;
  }

  renderContent(res) {
    let content = "";
    res.forEach(
      async ({
        id,
        title,
        thumbnail: { path, extension },
        dates: {
          0: { date },
        },
        events: { available, collectionURI },
      }) => {
        const uri = API_URL + URL_COMICS + "/" + id;
        const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
        if (!path.includes(IMG_NOT_AVAILABLE)) {
          content += `<div class='comicsItem' data-uri-events="${
            available > 0 ? collectionURI : ""
          }"> <button data-uri=${uri} class="moreInfo"> More info </button>  <p>${title} </p> <img src="${imgSrc}" /> <p class="date"> ${
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
      const uri = el.querySelector(".moreInfo").dataset.uri;
      el.addEventListener("click", async ({ target: t }) => {
        if (t.classList.contains("moreInfo")) {
          const comicsenseInfo = await getDataApi.getDataSlug(uri);
          comicsense.render(comicsenseInfo);
        } else {
          const uriEvents = el.dataset.uriEvents;

          if (uriEvents) {
            console.log("true");
            const arr = await events.render(uriEvents);
            console.log(arr.length);
            ROOT_MODAL.classList.add("open");
          } else {
            console.log("false");
            if (!notification.notification) {
              await notification.render();
              await notification.eventListener();
            }
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
        this.eventListener();
      });

    ROOT_COMICSENSE.addEventListener("click", ({ target }) => {
      if (target.classList.contains("open")) {
        setTimeout(() => {
          ROOT_COMICSENSE.classList.remove("open");
        }, 300);
      }
    });
    document
      .querySelector(".eventFilter")
      .addEventListener("click", ({ target }) => {
        const eventFilter = this.result.filter((el) => {
          if (el.events.available > 0) return el;
        });
        this.renderContent(eventFilter);
        this.eventListener();
      });
      ROOT_MODAL.addEventListener("click", ({target})=>{
      if(target.classList.contains('prev')){
        events.render(events.prevEventUri)
      } else if(target.classList.contains('next')){
        events.render(events.nextEventUri)
      }
    });
  }
}

export default new comics();
