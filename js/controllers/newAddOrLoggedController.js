import BaseController from "./BaseController.js";
import DataServices from "../services/DataServices.js";



export default class NewAddOrLoggedController extends BaseController {

    constructor(element) {
        super(element);
        this.checkIfUserIsLogged();
    }

   async checkIfUserIsLogged(){
        const userIsLogged = await DataServices.isUserLogged();
        if (userIsLogged) {
            const newAddButton = this.element.querySelector('.new-add-button');
            newAddButton.classList.remove('is-hidden');
        } else {
            const loginRegisterButtons = this.element.querySelector('.login-register-buttons');
            loginRegisterButtons.classList.remove('is-hidden')
        }
    }
}