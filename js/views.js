

export const addView = (add) => {
    return `<div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
                <div class="media-content">
                    <p class="title is-4">${add.author}</p>
                    <p class="subtitle is-6">${add.message}</p>
                </div>
            </div>
            <div class="content">
                ${add.description}
                <br>
                <time datetime="${add.date}">${add.date}</time>
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