import BaseController from './BaseController.js';
import DataServices from '../services/DataServices.js';
import { addView } from '../views.js';



export default class AddsListController extends BaseController{


    render(adds){
        for (const add of adds) {
            const addElement = document.createElement('div');
            addElement.innerHTML = addView(add);
            this.element.appendChild(addElement);
        }
    }
    async loadAdds(){
        this.publish(this.events.START_LOADING, {})
        try {
            const adds = await DataServices.getAdds();
            this.render(adds);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error)
        } finally {
            this.publish(this.events.FINISH_LOADING, {})
        }   
    } 

}