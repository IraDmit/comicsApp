import { ROOT_DIV } from "../../constants/root";


class error{
    async render(){
        let div = document.createElement('div');
        div.innerText = 'Error';
        ROOT_DIV.append(div);
    }
}

export default error;