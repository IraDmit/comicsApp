import { getDataApi } from "../../../helpers/getApi";
import { IMG_STANDARD_XLARGE, IMG_NOT_AVAILABLE } from "../../../constants/api";
import { ROOT_COMICSENSE } from "../../../constants/root";
import "./comicsense.scss";

class comicsense {
  async render(obj) {
    let {
      title,
      thumbnail: { path, extension },
      dates: {
        0: { date },
      },
      pageCount,
      series: { name, resourceURI },
      characters,
      description,
    } = obj;

    const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
    let creators = "";
    let character = "";
    let characterWrapper = "";
    let creator = "";

    const res = await getDataApi.getAllChar(characters.collectionURI);

    if (res) {
      console.log(res)
      res.forEach(({ thumbnail: { path, extension }, name }) => {
        const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
        character += `<div class="character"> <img src="${imgSrc}"/><p class="name">${name}</p></div>`;
      });

      characterWrapper = res.length ? `<div class="characterWrapper"> ${character} </div>` : '';
    }
    if (obj.creators.items.length) {
      obj.creators.items.forEach(({ resourceURI, name, role }) => {
        creators += `<a href="${resourceURI}" class="name"> ${name} <span> (${role})</span> </a>`;
      });
      creator = `<div class="authorWrapper">Authors: ${creators}</div>`;
    }

    const info = `<div class="comicsWrapper">
    <div class="comicsInfo">
      <img src="${imgSrc}" />
      <div class="info">
        <a href="${resourceURI}" class="title">${title} <span> ${name}</span> </a>
        ${creator}
        <p class="date">Date: ${date.split("T")[0]}</p>
        <p class="pageCount">Number of page: ${pageCount}</p>
      </div>
    </div>
    <div class="description">${description ? description : ""}</div>
    ${characterWrapper}

    </div>`;

    ROOT_COMICSENSE.innerHTML = info;
    setTimeout(() => {
      ROOT_COMICSENSE.classList.add("open");
    }, 100);
  }
}

export default new comicsense();
