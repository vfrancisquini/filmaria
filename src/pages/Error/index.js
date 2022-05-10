import "./error.css";
import {Link} from "react-router-dom";

function Error(){
    return(
        <div className="error">
            <h1>404</h1>
            <h2>Ops, página não encontrada!</h2>
            <Link to="/">Veja todos filmes!</Link>
        </div>
    )
}

export default Error;