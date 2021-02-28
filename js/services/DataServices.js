
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
                    author: add.user.username
                }
            });
            const token = await this.getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;

            }
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },

    post: async function(url, postData) {
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
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
        return await this.post(url, add);
    }
}