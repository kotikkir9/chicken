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
            <Button onActivate={props.onLeftClick} className={`${classes['btn']} ${props.secondary === 'left' ? classes['secondary-btn'] : null}`}>{props.left}</Button>
            <Button onActivate={props.onRightClick} className={`${classes['btn']} ${props.secondary === 'right' ? classes['secondary-btn'] : null}`}>{props.right}</Button>
        </Modal>
    )
}

export default ConfirmOverlay;