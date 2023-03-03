import { getDataApi } from "../../../helpers/getApi";
import {
  API_URL,
  URL_COMICS,
  IMG_STANDARD_XLARGE,
} from "../../../constants/api";
import { ROOT_MODAL } from "../../../constants/root";

import "./events.scss";

class events {
  nextEventUri = "";
  prevEventUri = "";

  async render(uri) {
    const result = await getDataApi.getData(uri);
    // console.log(result);
    this.renderContent(result.comics[0]);
    return result.comics;
  }

  async renderContent(arrEvents) {
    let {
      id,
      title,
      thumbnail: { path, extension },
      series: { collectionURI },
      characters,
      description,
      next,
      previous,
    } = arrEvents;

    this.nextEventUri = next.resourceURI;
    this.prevEventUri = previous.resourceURI;

    let contentCharacter = "";
    let series = "";

    const uri = API_URL + URL_COMICS + "/" + id;
    const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;

    const character = await getDataApi.getAllChar(characters.collectionURI);
    const seriesComics = await getDataApi.getAllChar(collectionURI);

    character.forEach(({ thumbnail: { path, extension }, name }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      contentCharacter += `<div class="characterItem"> <img src="${imgSrc}"/><p class="name">${name}</div>`;
    });

    seriesComics.forEach(({ thumbnail: { path, extension }, title }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      series += `<div class="seriesItem"> <img src="${imgSrc}"/><p class="name">${title}</p> <button data-uri=${uri} class="moreInfo"> More info </button></div>`;
    });

    const events_wrapper = `<div class="modal-content-event ">
    
   
    <div class="closeX"><i class="fa-solid fa-x"></i> </div>
    
    ${
      previous
        ? "<div class='butEvent prev'> <i class='fa-solid fa-arrow-left'></i> </div>"
        : ""
    }
    ${
      next
        ? "<div class='butEvent next'> <i class='fa-solid fa-arrow-right'></i> </div>"
        : ""
    }
    <div class="content container">
     <div class="eventInfo">
       <img src="${imgSrc}" alt="${imgSrc}" class='comicsImg'/>
       <div class="text"> 
        <p class="title">${title}</p>
        <p class="description">${description}</p>
      </div>   
    </div>
    <div class="characterList">
     ${contentCharacter} 
    </div>
    <div class="seriesList">
    ${series}
    </div>
   </div> 
  </div>`;
    ROOT_MODAL.innerHTML = events_wrapper;
  }
  eventListener() {
    ROOT_MODAL.addEventListener("click", async (el) => {
      if (
        el.target.classList.contains("prev") ||
        el.target.classList.contains("fa-arrow-left")
      ) {
        this.render(this.prevEventUri);
      } else if (
        el.target.classList.contains("next") ||
        el.target.classList.contains("fa-arrow-right")
      ) {
        this.render(this.nextEventUri);
      } else if (
        el.target.classList.contains("closeX") ||
        el.target.classList.contains("fa-x")
      ) {
        ROOT_MODAL.classList.remove("open");
      } else if (el.target.classList.contains("moreInfo")) {
        const uri = el.target.dataset.uri;
        const result = await getDataApi.getAllChar(uri);
        comicsense.render(result[0]);
      }
    });
  }
}

export default new events();
