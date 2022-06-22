import classes from './Header.module.css';

function Header(props) {
    return (
        <header className={classes.header}>
            {props.children}
        </header>
    )
}

export default Header;