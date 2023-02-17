import "./app.scss";
import comics from '../comics'

class app {
  async render() {
    await comics.render();
    
  }
}

export default new app();
