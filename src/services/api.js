// BASE da URL: https://api.themoviedb.org/3/
//URL da API: /movie/now_playing?api_key=64ba84f26297dbd76e3c9509461b81d9&language=pt-BR

import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;