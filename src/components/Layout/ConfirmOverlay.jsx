import Button from '../UI/Button';
import Modal from '../UI/Modal';
import classes from './ConfirmOverlay.module.css';

function ConfirmOverlay(props) {
    return (
        <Modal className={classes.modal} onBackdropClick={props.onBackdropClick}>
            <div className={classes.textbox}>
                <h3>{props.heading}</h3>
                <p>{props.text}</p>
            </div>
            <Button onActivate={props.onConfirm} className={`${classes['btn']} ${classes['confirm-btn']}`}>Confirm</Button>
            <Button onActivate={props.onCancel} className={`${classes['btn']}`}>Stay</Button>
        </Modal>
    )
}

export default ConfirmOverlay;