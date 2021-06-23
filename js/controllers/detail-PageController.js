import BaseController from "./BaseController.js";
import DataServices from '../services/DataServices.js';
import {addDetail} from "../views.js" ;

export default class  AdDetailedInfoController extends BaseController{

    render(add){ 
        const article = document.createElement("article"); 
        article.innerHTML = addDetail(add);
            
        this.element.appendChild(article);     
    }
    
    async loadDetail(query = null){
        this.publish(this.events.START_LOADING, {})
        try {
            const id = location.search.split('?id=')[1]; 
            const detailAdd = await DataServices.getAddDetail(id);
            this.render(detailAdd);
  
        } catch (error) {
            console.error(error)
            this.publish(this.events.ERROR, '!ANUNCIO NO ENCONTRADO¡  Por favor regrese al listado');
        } finally {
            this.publish(this.events.FINISH_LOADING, {})
        }
    }
}