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
    async render(uri){
       const result = await getDataApi.getData(uri);
       const result2 = await getDataApi.getData('http://gateway.marvel.com/v1/public/events/231');
		// this.renderContent(result.comics)
        console.log(result)
        console.log(result2)
        return result.comics;
    }

    renderContent(arrEvents){
        let content ='';
        arrEvents.forEach(({thumbnail:{path, extension}, name}) => {
            const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
            content += `<div class="character"> <img src="${imgSrc}"/><p class="name">${name}</div>`;
        });
        const characters_wrapper = `<div class="modal-content">${content}</div>`
        ROOT_MODAL.innerHTML = characters_wrapper;
    }
}

export default new events();
