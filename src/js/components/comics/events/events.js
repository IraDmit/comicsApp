import { getDataApi } from "../../../helpers/getApi";
import {
  API_URL,
  URL_COMICS,
  URL_CHARACTERS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
} from "../../../constants/api";
import { ROOT_MODAL } from "../../../constants/root";

import "./events.scss";

class events {
  nextEventUri = '';
  prevEventUri = '';

  async render(uri) {
    const result = await getDataApi.getData(uri);
    this.renderContent(result.comics[0]);
    return result.comics;
  }

  async renderContent(arrEvents) {
    let {
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

    const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;

    const character = await getDataApi.getAllChar(characters.collectionURI);
    const seriesComics = await getDataApi.getAllChar(collectionURI);

    character.forEach(({ thumbnail: { path, extension }, name }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      contentCharacter += `<div class="characterItem"> <img src="${imgSrc}"/><p class="name">${name}</div>`;
    });

    seriesComics.forEach(({ thumbnail: { path, extension }, title }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      series += `<div class="seriesItem"> <img src="${imgSrc}"/><p class="name">${title}</div>`;
    });

    const events_wrapper = `<div class="modal-content-event">
    
    <div class="eventInfo">
    <div class="close"> X </div>

    ${previous ? "<div class='butEvent prev'> previous event </div>" : ""}
    ${next ? "<div class='butEvent next'> next event </div>" : ""}
       <img src="${imgSrc}" alt="${imgSrc}" />
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
}

export default new events();
