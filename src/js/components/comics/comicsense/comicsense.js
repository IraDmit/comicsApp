import { IMG_STANDARD_XLARGE, IMG_NOT_AVAILABLE } from "../../../constants/api";
import { ROOT_COMICSENSE } from "../../../constants/root";
import "./comicsense.scss";

class comicsense {
  // {
  //     id,
  //     title,
  //     thumbnail: { path, extension },
  //     dates: {
  //       0: { date },
  //     },
  //   }
  render(obj) {
    let {
      id,
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
    characters.items.forEach((el) => {
      const imgSrc = path + "/" + IMG_STANDARD_XLARGE + "." + extension;
      character += `<div class="character"> <img src="${imgSrc}"/><p class="name">${el.name}</div>`;
    });

    const characterWrapper = `<div class="characterWrapper"> ${character} </div>`;

    obj.creators.items.forEach(({ resourceURI, name, role }) => {
      creators += `<a href="${resourceURI}" class="name">${name} <span>${role}</span></a>`;
    });

    const creator = `<div class="authorWrapper">${creators}</div>`;

    const info = `<div class="comicsWrapper">
    <div class="comicsInfo">
      <img src="${imgSrc}" />
      <div class="info">
        <a href="${resourceURI}">${title} <span> ${name}</span> </a>
        ${creator}
        <p class="date">${date.split("T")[0]}</p>
        <p class="pageCount">${pageCount}</p>
      </div>
    </div>
    ${characterWrapper}
    ${description ? description : ""}
    </div>`;

    ROOT_COMICSENSE.innerHTML = info;
    setTimeout(() => {
      ROOT_COMICSENSE.classList.add("open");
    }, 100);
  }
}

export default new comicsense();
