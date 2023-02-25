import { getDataApi } from "../../../helpers/getApi";
import {
  API_URL,
  URL_COMICS,
  URL_CHARACTERS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
} from "../../../constants/api";
import { ROOT_MODAL } from "../../../constants/root";

class events {
  async render(uri) {
    const result = await getDataApi.getData(uri);
    this.renderContent(result.comics[0]);
    return result.comics;
  }

  async renderContent(arrEvents) {

    let {
      title,
      thumbnail: { path, extension },
      series: { name, resourceURI },
      characters,
      description,
      next,
      previous,
    } = arrEvents;

    let contentCharacter = "";
    let series = "";
    const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;

    const character = await getDataApi.getAllChar(characters.collectionURI);

    character.forEach(({ thumbnail: { path, extension }, name }) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      contentCharacter += `<div class="characterItem"> <img src="${imgSrc}"/><p class="name">${name}</div>`;
    });
    const events_wrapper = `<div class="modal-content">
    
    <div class="eventInfo">
       <img src="${imgSrc}" alt="" />
      <p class="title">${title}</p>
      <p class="description">${description}</p>
    </div>
    <div class="characterList">
    <!-- ${contentCharacter} --> 
    </div>
  </div>
    
  </div>`;
    ROOT_MODAL.innerHTML = events_wrapper;
  }
}

export default new events();
