
const url = 'https://gist.github.com/Luisbustos8/8a451002765e4497e9c4e875fc72e104'

export default {
    getAdds: async () => {
        const response = await fetch(url);
        if (response.ok){
            const data = response.json();
            return data;
        } else {
            throw new Error(`HTTP Error: ${response.status}`)
        }
    },
    
}