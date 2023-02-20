import { getDataApi } from "../../../helpers/getApi";
import {
  API_URL,
  URL_COMICS,
  URL_CHARACTERS,
  IMG_STANDARD_XLARGE,
  IMG_NOT_AVAILABLE,
} from "../../../constants/api";
import { ROOT_MODAL } from "../../../constants/root";

class characters {
    async render(uri){
       const result = await getDataApi.getData(uri);
		this.renderContent(result.comics)
        return result.comics;
    }

    renderContent(arrCharacters){
		// console.log(arrCharacters)
        let content ='';
        arrCharacters.forEach(({thumbnail:{path, extension}, name}) => {
            const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
            content += `<div class="character"> <img src="${imgSrc}"/><p class="name">${name}</div>`;
        });
        const characters_wrapper = `<div class="modal-content">${content}</div>`
        ROOT_MODAL.innerHTML = characters_wrapper;
    }
}

export default new characters();
