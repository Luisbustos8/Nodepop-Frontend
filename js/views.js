

export const addView = (add) => {
    let deleteButton = '';
    if (add.canBeDeleted) {
        deleteButtonHTML = '<button class="button is-danger>Borrar</button> '
    }
    let imageHTML = '';
    if (add.image) {
        imageHTML = `<div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="${add.image}" alt="Placeholder image">
            </figure>
        </div>`;
    }
    return `<div class="card-content">
                <div class="media-content">
                    <p class="title is-4">${add.author}</p>
                    <p class="subtitle is-6">${add.message}</p>
                </div>
            </div>
            <div class="content">
                ${add.description}
                <br>
                <time datetime="${add.date}">${add.date}</time>
                <br>
                ${deleteButton}
            </div>
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
}