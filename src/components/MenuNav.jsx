import { useNavigate } from "solid-app-router";
import classes from "./MenuNav.module.css";

function MenuNav() {
    const navigate = useNavigate();

    return (
        <footer className={classes.menu}>
            <ul className={classes.list}>
                <li className={classes["menu-item"]} onClick={() => navigate('/home', { replace: true }) }></li>
                <li className={classes["menu-item"]} onClick={() => navigate('/session/new', { replace: true }) }></li>
                <li className={classes["menu-item"]}></li>
            </ul>
        </footer>
    );
}

export default MenuNav;
