
const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token'

export default {

    getAdds: async function() {
        const url = `${BASE_URL}/api/adds?_expand=user&_sort=id&_order=desc`;
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            return data.map(add => {
                return {
                    message: add.message,
                    date: add.createdAt || add.updatedAt,
                    author: add.user.username,
                    image: add.image || null
                }
            });
           
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    post: async function(url, postData, json=true) {
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
        }
        if (json) {
            config.headers['Content-Type'] = 'application/json'
        }else{
            config.body = postData
        }
        const response = await fetch(url, config);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || JSON.stringify(error));
        }
    },

    registerUser: async function (user) {
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user)
    },
    
    login: async function (user) {
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url, user)
    },

    saveToken: async function(token){
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function(){
        return localStorage.getItem(TOKEN_KEY);
    }, 
    
    isUserLogged: async function() {
        const token = await this.getToken();
        return token !== null;
    },
    saveAdd: async function(add){
        const url = `${BASE_URL}/api/adds`;
        if (add.image){
            const imageURL = await this.uploadImage(add.image);
            add.image = imageURL;
        }
        return await this.post(url, add);
    },
    uploadImage: async function(image){
        const form = new FormData()
        form.append('file', image);

        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false)

    }
}