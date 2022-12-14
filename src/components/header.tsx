import { Link } from "react-router-dom";
import code from "../assets/code.png"

const Header = (): JSX.Element => {
    return (
        <section>
            <img className="header-img" src={code} />
            <header className="navbar">
                <Link className="link" to={"/"}>Home</Link>
                <Link className="link" to={"/about"}>About</Link>
                <Link className="link" to={"/portfolio"}>Portfolio</Link>
                <Link className="link" to={"/contact"}>Contact</Link>
            </header>
            <title className="title">
                <div className="name">Nasser Kessas</div>
                <div className="description">Computer Man</div>
            </title>
        </section>
    )
}

export default Header;