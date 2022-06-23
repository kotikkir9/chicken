import Modal from '../UI/Modal';
import classes from './UpdateModal.module.css';
import Button from '../UI/Button';
import { createSignal } from 'solid-js';

function UpdateModal(props) {
    let inputWeightRef;
    let inputAmountRef;
    let timeout;

    const [weight, setWeight] = createSignal(props.data.item.weight);

    const updateItem = () => {
        if(!(weight() && !isNaN(weight()) && weight() > 0)) {
            inputWeightRef.classList.add(classes.invalid);

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                inputWeightRef.classList.remove(classes.invalid);
            }, 1000);

        } else {

            if(weight() === props.data.item.weight && parseInt(inputAmountRef.value) === props.data.item.amount) {
                props.data.updated = false;
            } else {
                props.data.updated = true;
                props.data.item.weight = parseInt(weight());
                props.data.item.amount = parseInt(inputAmountRef.value);
            }

            props.updateItem(props.data);
        }
    }
    
    const updateWeight = (e) => {
        setWeight(e.currentTarget.value); 
    }

    const updateAmount = (e) => {
        if(e.inputType === 'deleteContentBackward') return;

        const val = e.data;
        const currentValue = e.currentTarget.value;

        if(!(val && val.match(/\d/) && currentValue.length <= 3) || (currentValue.length === 1 && parseInt(val) === 0)) {
            inputAmountRef.value = currentValue.slice(0, -1);
        }
    }
    
    const handleAmountBlur = () => {
        if(!inputAmountRef.value) {
            inputAmountRef.value = 1;
        }
    }

    return (
        <Modal onBackdropClick={props.onBackdropClick} className={classes.modal}>
            <div className={classes['close-icon']} onClick={props.onCloseClick}></div>

            <div className={classes['date-time']}>
                <p>{new Date(props.data.item.date).toLocaleTimeString()}</p>
                <p>{new Date(props.data.item.date).toLocaleDateString()}</p>
            </div>

            <div className={classes['form-group']}>
                <input 
                    type="number" 
                    id="amount" 
                    value={props.data.item.amount} 
                    onInput={updateAmount}
                    onBlur={handleAmountBlur}
                    ref={inputAmountRef}
                />
                <label htmlFor="amount">Amount</label>
            </div>

            <div className={classes['form-group']}>
                <input 
                    id="weight"
                    type="number" 
                    ref={inputWeightRef} 
                    className={classes['weight-input']} 
                    value={weight()} onInput={updateWeight} 
                />
                <label htmlFor="weight">Weight</label>
            </div>

            <Button className={classes['apply-btn']} onActivate={updateItem} >Apply changes</Button>
        </Modal>
    )
}

export default UpdateModal;