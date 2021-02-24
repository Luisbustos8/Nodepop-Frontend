
const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token'

export default {

    getAdds: async function() {
        const url = `${BASE_URL}/api/adds`;
        const response = await fetch(url);
        if (response.ok){
            const data = response.json();
            return data;
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
    }
}