import { Link } from "react-router-dom"
import './NotFound.css'

export default function NotFound() {
    return (
        <Link to="/" className="link-404" >
        <div className="background-404" >
        </div>
        </Link >

    );
}