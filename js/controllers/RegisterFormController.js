import BaseController from './BaseController.js';

export default class RegisterFormController extends BaseController {

    constructor(element){
        super(element);
        this.attachEventListener();
    }

    attachEventListener(){
        this.element.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log('SE ENVIA FORMULARIO', this.element)
        })
    }
    

}