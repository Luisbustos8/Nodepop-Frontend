
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import RegisterFormController from './controllers/RegisterFormController.js';

window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-ring');
    new LoaderController(loader);

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);
    
    const formElement = document.querySelector('form');
    const formController = new RegisterFormController(formElement);

})