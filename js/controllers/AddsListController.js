import BaseController from './BaseController.js';
import DataServices from '../services/DataServices.js';
import { addView, noAdds } from '../views.js';



export default class AddsListController extends BaseController{
    
    constructor(element){
        super(element);
        this.subscribe(this.events.SEARCH, query => {
            this.loadAdds(query)
        })
    }

    render(adds){

        if (adds.length > 0 ){

            this.element.innerHTML = '';
            for (const add of adds) {
                const addElement = document.createElement('div');
                addElement.innerHTML = addView(add);

            const detailButton = addElement.querySelector('.card')

            detailButton.addEventListener('click', ev => {
                window.location.href = '/detail-page.html?id='+add.id;
                ev.stopPropagation();
            })
        
            const deleteButton = addElement.querySelector('button');
            if(deleteButton){
                deleteButton.addEventListener('click', async ev => {
                    ev.stopPropagation();
                    const deleteConfirmed = confirm('¿Seguro que quieres borrarlo?');
                    if (deleteConfirmed) {
                        await DataServices.deleteAdd(add);
                        addElement.remove();
                        await this.loadAdds();
                    }
                })  
            } 
            this.element.appendChild(addElement)

          
           
        }

    } else {
        this.element.innerHTML=''
        const zeroAdds = document.createElement('h1');
        zeroAdds.innerHTML = noAdds();
        this.element.appendChild(zeroAdds)
    }
    }
    async loadAdds(query=null){
        this.publish(this.events.START_LOADING, {})
        
        try {
            const adds = await DataServices.getAdds(query);
            this.render(adds);
        } catch (error) {
            console.error(error);
            this.publish(this.events.ERROR, error)
        } finally {
            this.publish(this.events.FINISH_LOADING, {})
            
           
        }   
    } 

}