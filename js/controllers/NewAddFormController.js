
import BaseController from "./BaseController.js";
import DataServices from '../services/DataServices.js';


export default class NewAddFormController extends BaseController {

    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInTextArea();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await DataServices.isUserLogged();
        if (!userIsLogged) {
            window.location.href = '/login.html=/next'
        } else {
            this.publish(this.events.FINISH_LOADING);
        }
    }

    focusInTextArea(){
        const textarea = this.element.querySelector('textarea');
        textarea.focus();
    }

    attachEventListeners(){
        const textarea = this.element.querySelector('textarea');
        textarea.addEventListener('keyup', () => {
            const button = this.element.querySelector('button');
            if (this.element.checkValidity()) {
                button.removeAttribute('disabled');
            } else {
                button.setAttribute('disabled', true);
            }
        });
        
        this.element.addEventListener('submit', async event => {
            event.preventDefault()
            const add = {
                name: this.element.elements.name.value,
                description: this.element.elements.description.value,
                price: this.element.elements.price.value,
                status: this.element.elements.select.value,
                image: null,
            }
           
            if (this.element.elements.file.files.length > 0) {
                add.image = this.element.elements.file.files[0];
            }
            this.publish(this.events.START_LOADING);
            try {
                await DataServices.saveAdd(add);
                window.location.href = '/?mensaje=AnuncioOK'
            } catch (error) {
                this.publish(this.events.ERROR, error)
            } finally {
                this.publish(this.events.FINISH_LOADING)
            }
        })
    }
}