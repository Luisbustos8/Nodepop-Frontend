
const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token'

export default {

    getAdds: async function(query) {
        const currentUser = await this.getUser();
        let url = `${BASE_URL}/api/adds?_expand=user&_sort=id&_order=desc`;
        if (query){
            url += `&q=${query}`
        }
        const response = await fetch(url);
        if (response.ok){
            const data = await response.json();
            return data.map(add => {
                return {
                    id: add.id,
                    description: add.description,
                    message: add.message,
                    date: add.createdAt || add.updatedAt,
                    author: add.user.username,
                    image: add.image || null,
                    canBeDeleted: currentUser ? currentUser.userId === add.userId : false
                }
            });
           
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },
    post: async function (url, postData, json=true) {
        return await this.request('POST', url, postData, json)
    }, 
    delete: async function(url){
        return await this.request('DELETE', url, {}) 
    },
    put: async function(url, putData, json=true){
        return await this.request('PUT', putData, json)        
    },

    request: async function(method, url, postData, json=true) {
        const config = {
            method: method,
            headers: {},
            body: JSON.stringify(postData)
        }
        if (json) {
            config.headers['Content-Type'] = 'application/json'
        }else{
            config.body = postData
        }
        const token = await this.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('postdata',postData
        ,'url', url, 'metodo', method, 'cab', config.headers)

        const response = await fetch(url, config);
        console.log('response bitch', response)
        const data = await response.json();
        console.log('eeh', data)
        console.log('ppp', postData)
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

    },
     getUser: async function() {
        try {
            const token = await this.getToken();
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) {
                return null;
            }
            const payload = tokenParts[1]; 
            const jsonStr = atob(payload); 
            const { userId, username } = JSON.parse(jsonStr); 
            return { userId, username };
        } catch (error) {
            return null;
        }
    },
        deleteAdd: async function (add) {
            const url = `${BASE_URL}/api/adds/${add.id}`;
            return await this.delete(url);
        }
    }

    
