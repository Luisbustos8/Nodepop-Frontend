import AddsListController from './controllers/AddsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js'

window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-dual-ring');
    const loaderController = new LoaderController(loader)
    
    const addElement = document.querySelector('.add-list');
    const controller = new AddsListController(addElement);
    controller.loader = loaderController;
    controller.loadAdds();

    const errorsElement = document.querySelector('.global-errors');
    const errorController = new ErrorController(errorsElement);
});