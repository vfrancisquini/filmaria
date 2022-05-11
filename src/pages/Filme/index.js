import {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import './filmeinfo.css';

import api from '../../services/api';

function Filme(){
    const { id } =useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
                     navigate("/", {replace: true});
                     return;
                 })
        }


        loadFilme();

        return() => {
            console.log ("Componente desmontado");
        }

    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@victorFlix");

        let filmesSalvos = JSON.parse(minhaLista) ||  [];
        const hasFilme = filmesSalvos.some((filmesSalvo)=>filmesSalvo.id === filme.id)

        if (hasFilme){
            alert("esse filme já está na lista");
            return;

        }
        filmesSalvos.push(filme);
        localStorage.setItem("@victorFlix", JSON.stringify(filmesSalvos));
        alert("filme salvo");

    }


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

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={"https://www.youtube.com/results?search_query="+filme.title} target="blank" rel="external">
                        Trailer
                    </a>
                </button>

            </div>
        </div>
    )
}

export default Filme;