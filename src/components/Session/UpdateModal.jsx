import Modal from '../UI/Modal';
import classes from './UpdateModal.module.css';
import Button from '../UI/Button';

function UpdateModal(props) {
    return (
        <Modal onBackdropClick={props.onBackdropClick} className={classes.modal}>
            <div className={classes['close-icon']} onClick={props.onCloseClick}></div>

            <input type="number" className={classes['weight-input']} />

            <Button className={classes['apply-btn']}>Apply changes</Button>
        </Modal>
    )
}

export default UpdateModal;