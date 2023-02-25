import "./index.scss";
import { ROOT_DIV } from "../../constants/root";

class notification {
  notification = false;

  render() {
    let div = document.createElement("div");
    div.classList.add("notification");
    div.innerHTML = `<p class="closeX"> x </p> <p>No events!</p>`;
    ROOT_DIV.append(div);
    setTimeout(() => {
      div.classList.add("show");
    }, 100);
    this.notification = document.getElementsByClassName("notification")[0];
    console.log(this.notification);
  }

  destroy() {
    console.log(this.notification);
    try {
      this.notification.classList.remove("show");

      setTimeout(() => {
        this.notification.remove();
        this.notification = false;
        
      }, 300);
    } catch (error) {
    }
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
