import Modal from '../UI/Modal';
import classes from './SessionDataInput.module.css';
import Button from '../UI/Button';
import { createSignal } from 'solid-js';

function SessionDataInput(props) {
    let idRef;
    let ageRef;

    const [cropId, setCropId] = createSignal(0);
    const [age, setAge] = createSignal(0);

    const handleIdInput = (e) => {
        setCropId(e.currentTarget.value);
    }

    const handleAgeInput = (e) => {
        setAge(e.currentTarget.value);
    }

    const handleSubmit = () => {
        const validId = cropId().toString().match(/[\d]/) && cropId() > 0;
        const validAge = age().toString().match(/[\d]/) && age() > 0;

        if(validId && validAge) {
            const session = {
                cropId: cropId(),
                age: age(),
                date: Date.now(),
            }

            props.onSubmit(session);

        } else {
            if(!validId) {
                addInvalidClass(idRef);
            }

            if(!validAge) {
                addInvalidClass(ageRef);
            }
        }
    }

    const addInvalidClass = (ref) => {
        ref.classList.add(classes.invalid);
        setTimeout(() => {
            ref.classList.remove(classes.invalid);
        }, 1000);
    }

    return (
        <Modal className={classes.modal}>
            <h3>New weighing session</h3>
            <div className={classes['form-group']}>
                <input id='crop' type="number" placeholder='-' onInput={handleIdInput} ref={idRef} />
                <label htmlFor="crop">Crop ID</label>
            </div>
            <div className={classes['form-group']}>
                <input id='age' type="number" placeholder='-' onInput={handleAgeInput} ref={ageRef} />
                <label htmlFor="age">Age (days)</label>
            </div>
            <Button onActivate={props.onCancel} className={`${classes['btn']} ${classes['cancel-btn']}`}>Cancel</Button>
            <Button onActivate={handleSubmit} className={`${classes['btn']}`}>Start</Button>
        </Modal>
    )
}

export default SessionDataInput;