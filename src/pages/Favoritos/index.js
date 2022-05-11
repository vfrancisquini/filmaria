import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './favoritos.css';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);



    useEffect(()=>{
        const minhaLista = localStorage.getItem("@victorFlix");
        setFilmes(JSON.parse(minhaLista) || [])
    },[]);


    function excluirFilme(id){

        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@victorFlix", JSON.stringify(filtroFilmes))
    }
    return(
        <div className="lista-favoritos">

            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :/</span>}

            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={"/filme/"+item.id}>Ver Detalhes</Link>
                                <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;