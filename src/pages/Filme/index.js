import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './filmeinfo.css';

import api from '../../services/api';

function Filme(){
    const { id } =useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        async function loadFilme(){
             await api.get(`/movie/${id}`, {
                 params:{
                     api_key: "64ba84f26297dbd76e3c9509461b81d9",
                     language: "pt-BR",
                 }
             })
                 .then ((response)=>{
                     setFilme(response.data);
                     setLoading(false);
                 })
                 .catch(()=>{
                     console.log("filme não encontrado");
                 })
        }


        loadFilme();

        return() => {
            console.log ("Componente desmontado");
        }

    },[])

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes</h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={'https://image.tmdb.org/t/p/original'+filme.backdrop_path} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <br />

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-button">

            </div>
        </div>
    )
}

export default Filme;