import classes from './Modal.module.css';

function Modal(props) {
    return (
        <>
            <div className={classes.backdrop} onClick={props.onBackdropClick} ></div>
            <div className={`${classes.modal} ${props.className}`}>
                {props.children}
            </div>
        </>
    );
}

export default Modal;