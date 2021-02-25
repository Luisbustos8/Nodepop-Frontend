import AddsListController from './controllers/AddsListController.js';
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js'
import NewAddOrLoggedController from './controllers/newAddOrLoggedController.js';

window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-dual-ring');
    new LoaderController(loader);
    
    const addElement = document.querySelector('.add-list');
    const controllerAdd = new AddsListController(addElement);
    controllerAdd.loadAdds()

    const errorsElement = document.querySelector('.global-errors');
    new ErrorController(errorsElement);

    const newAddElement = document.querySelector('.new-add');
    new NewAddOrLoggedController(newAddElement);
});