import "./index.scss";
import { ROOT_DIV } from "../../constants/root";

class notification {
  constructor() {
    this.notification = null;
  }

  render() {
      let div = document.createElement("div");
      div.classList.add("notification");
      div.innerHTML = `<p class="closeX"> x </p> <p>Error download comics</p>`;
      ROOT_DIV.append(div);
      setTimeout(() => {
          div.classList.add("show");
        }, 100);
        this.notification = document.getElementsByClassName("notification")[0]
        console.log(this.notification);
  }

  destroy() {
    console.log(this.notification);
    this.notification.classList.remove("show");
    setTimeout(() => {
      this.notification.remove();
    }, 300);
  }

  eventListener() {
    if (this.notification) {
      setTimeout(() => {
        this.destroy();
      }, 5000);
    }

    document.addEventListener("click", ({ target }) => {
      if (target.classList.contains("closeX")) {
        this.destroy();
      }
    });
  }
}

export default new notification();
