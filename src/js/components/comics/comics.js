import {
  API_URL,
  URL_COMICS,
  URL_CHARACTERS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
} from "../../constants/api";
import { getDataApi } from "../../helpers/getApi";
import { ROOT_DIV, ROOT_MODAL } from "../../constants/root";
import "./comics.scss";
import characters from "./characters/characters";
import error from "../error/error";

class comics {
  async render() {
    const res = await getDataApi.getData(API_URL + URL_COMICS);
    res ? this.renderContent(res) : error.render();
  }

  renderContent(res) {
    let content;
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
      el.addEventListener("click", (e) => {
        characters.render(uriComics);
        ROOT_MODAL.classList.add('open');
      });
    });
    ROOT_MODAL.addEventListener("click", e=>{
      ROOT_MODAL.classList.remove('open');
    })
  }
  
}

export default new comics();
