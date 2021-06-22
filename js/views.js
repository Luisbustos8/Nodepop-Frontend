

export const addView = (add) => {
    let deleteButtonHTML = '';
    if (add.canBeDeleted) {
        deleteButtonHTML = '<button class="button is-danger"> Borrar </button> '
    }
    let imageHTML = '';
    if (add.image) {
        imageHTML = `<div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="${add.image}" alt="Placeholder image">
            </figure>
        </div>`;
    } else {
         imageHTML = `<div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="/assets/placeholder.png" alt="Placeholder image">
            </figure>
        </div>`;
    }
   
    return `
        <br>
        <div name="enlace" class="card">
            <div id="enlace" class="card-image">
                    ${imageHTML}
            </div>
                <div class="media-content">
                    <p class="title is-4">${add.name}</p>
                    <p class="subtitle is-6">${add.author}</p>
                </div>
                </div>
                 <br>
                <div class="content">
                    ${add.description}
                <br>
                    ${add.status}
                <br>
                <time datetime="${add.date}">${add.date}</time>
                <br>
                ${deleteButtonHTML} 
            </div>
            <br>
        </div>
</div>`
};


export const errorView = (errorMessage) =>{
    return `<article class="message is-danger">
            <div class="message-header">
                <p>Error</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                ${errorMessage}
            </div>
        </article>`
};

export const noAdds = (add) => {
    return ` <h3 class="mt-4"> No hay productos...</h3>
             <p> Registrate y se el primero en subir tu anuncio </p>   
    `
}

export const addDetail = (add) => {
    let imageHTML = '';
    if (add.image) {
        imageHTML = `<div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="${add.image}" alt="Placeholder image">
            </figure> 
        </div>`;
    } else {
        imageHTML = `<div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="/assets/placeholder.png" alt="Placeholder image">
            </figure> 
        </div>`;
    };
    let status;
    if (add.status === 'Venta'){
        status = 'En venta:'
    } else {
        status = 'Compro por:'
    }

    return `<div class="anuncio">
    <br>
    ${imageHTML}
    <br>
    <div class="date"> Fecha de publicación: ${add.updatedAt} </div>
    <strong class="add-name"> ${add.name} </strong>
    <div class="on-sale"> ${status} ${add.price} € </div>
    <div class="description">${add.description}</div>
    </div>`
}