import Button from './Button';
import classes from './WeightInput.module.css';

function WeightInput(props) {
    let inputRef;
    let selectRef;
    let timeout;

    const handleAdd = () => {
        const val = inputRef.value;
        const amount = selectRef.value;

        if(!(val && !isNaN(val) && val > 0)) {
            inputRef.classList.add(classes.invalid);

            clearTimeout(timeout);
            timeout = setTimeout(() => {
                inputRef.classList.remove(classes.invalid);
            }, 1000);
            return;
        }

        inputRef.value = '';
        props.onClick({ amount: parseInt(amount), value: parseInt(val) });
    }

    const generateOptions = (amount) => {
        let options = [];
        for(let i = 1; i <= amount; i++) {
            options.push(<option value={i}>{i}</option>);
        }

        return options;
    }

    return (
        <section className={classes.container}>
            <select className={classes.select} ref={selectRef}>
                {generateOptions(20)}
            </select>
            <input type="number" className={classes.input} placeholder="0" onInput={props.onInput} value={props.value} ref={inputRef} />
            <Button className={classes.btn} onActivate={handleAdd}>Add</Button>
        </section>
    )
}

export default WeightInput;