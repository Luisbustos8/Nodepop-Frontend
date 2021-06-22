
import LoaderController from './controllers/LoaderController.js';
import ErrorController from './controllers/ErrorController.js';
import detailAddController from './controllers/detail-PageController.js';


window.addEventListener('DOMContentLoaded', async (event) => {

    const loader = document.querySelector('.lds-ring');
    new LoaderController(loader);
    

    const errorsElement = document.querySelector('.global-errors');
    new ErrorController(errorsElement);

    const detailAdd = document.querySelector('.detailAdd');
    const detailController = new detailAddController(detailAdd);
    detailController.loadDetail()

});