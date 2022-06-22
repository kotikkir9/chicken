import Button from '../UI/Button';
import classes from './WeightInput.module.css';

function WeightInput(props) {
    let inputRef;
    let amountRef;
    let timeout;
    let dropdownOpen = false;

    const handleAdd = () => {
        const val = inputRef.value;

        if(!(val && !isNaN(val) && val > 0)) {
            inputRef.classList.add(classes.invalid);

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                inputRef.classList.remove(classes.invalid);
            }, 1000);
            return;
        }

        inputRef.value = '';
        props.onClick({ amount: parseInt(amountRef.value), value: parseInt(val) });
    }

    const handleAmountChange = (e) => {
        if(e.inputType === 'deleteContentBackward') return;

        const val = e.data;
        const currentValue = e.currentTarget.value;

        if(!(val && val.match(/\d/) && currentValue.length <= 3) || (currentValue.length === 1 && parseInt(val) === 0)) {
            amountRef.value = currentValue.slice(0, -1);
        }
    }

    const handleAmountBlur = () => {
        if(!amountRef.value) {
            amountRef.value = 1;
        }
    }

    const handleUnitsChange = (e) => {
        console.log(e.currentTarget.value);
        handleUnitsBlur();

        if(props.onUnitsChange)
            props.onUnitsChange(e.currentTarget.value);
    }

    const handleUnitsTouch = (e) => {
        if(!dropdownOpen) {
            dropdownOpen = true;
            const target = e.currentTarget;
            target.classList.add(classes.active);

            setTimeout(() => {
                target.classList.remove(classes.active);
            }, 300);
        } else {
            handleUnitsBlur();
        }
    }

    const handleUnitsBlur = () => {
        dropdownOpen = false;
    }

    return (
        <section className={classes.container}>
            <div className={classes.top}>
                <div className={classes.amount}>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" value={1} onInput={handleAmountChange} ref={amountRef} onBlur={handleAmountBlur} />
                </div>

                <select className={classes.units} onChange={handleUnitsChange} onTouchStart={handleUnitsTouch} onBlur={handleUnitsBlur} >
                    <option value="gram" selected>Gram</option>
                    <option value="kilogram">Kilogram</option>
                    <option value="pound">Pound</option>
                </select>
            </div>
            
            <input type="number" className={classes.input} placeholder="0" onInput={props.onInput} value={props.value} ref={inputRef} />
            <Button className={classes.btn} onActivate={handleAdd}>Add</Button>
        </section>
    )
}

export default WeightInput;