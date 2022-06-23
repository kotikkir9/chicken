import classes from "./Button.module.css";

function Button(props) {
    const handleTouchStart = ({ currentTarget: target }) => {
        target.classList.add(classes.active);

        setTimeout(() => {
            target.classList.remove(classes.active);
        }, 200);

        if(props.onActivate)
            props.onActivate();
    };

    return (
        <button
            className={`${classes.btn} ${props.className}`}
            onClick={handleTouchStart}
            disabled={props.disabled}
        >
            <span className={classes['btn-fill']}></span>
            {props.children}
        </button>
    );
}

export default Button;
