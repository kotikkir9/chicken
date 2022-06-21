import { useNavigate } from "solid-app-router";
import { createSignal, onCleanup, onMount } from "solid-js";

import Button from "../components/Button";
import Header from "../components/Header";
import Stats from "../components/Stats";
import WeightInput from "../components/WeightInput";
import classes from './WeighingSession.module.css';

const sessionTemp = {
    cropId: 1,
    age: 27,
    date: Date.now(),
}

function WeighingSession() {
    const navigate = useNavigate();
    const [sessionData] = createSignal(sessionTemp);
    const [list, setList] = createSignal([]);
    const [average, setAverage] = createSignal(0);
    const [count, setCount] = createSignal(0);

    const [initialScreenSize] = createSignal(window.innerHeight);

    const handleResize = () => {
        if(window.innerHeight < initialScreenSize()) {
            document.body.style.height = 'auto';
        } else {
            document.body.style.height = '100%';
        }
    }

    onMount(() => {
        window.addEventListener('resize', handleResize);
    });

    onCleanup(() => {
        document.body.style.height = '100%';
        window.removeEventListener('resize', handleResize);
    });

    const handleBackClick = () => {
        navigate('/home', { replace: true });
    }

    const handleSubmit = () => { 
        // TODO
    }

    const handleAdd = (obj) => {
        setList(e => [...e, { amount: obj.amount, weight: obj.value, date: Date.now() }]);

        let total = 0;
        let amount = 0;
        for(const e of list()) {
            amount += e.amount;
            total += e.weight;
        }

        setCount(amount);
        setAverage(parseInt(total / amount));
    }

    return (
        <div className={classes.container}>
            <Header>
                <a href="#" className={classes['back-btn']} onClick={handleBackClick}></a>
                <p>Weighing Session</p>
            </Header>

            <main className={classes.main}>
                <Button className={classes['submit-btn']} onActivate={handleSubmit}>Submit</Button>
                <Stats session={sessionData()} average={average()} count={count()} />
                <WeightInput onClick={handleAdd} />
                <section>
                    {new Date(sessionData().date).toDateString()}
                </section>
            </main>
        </div>
    );
}

export default WeighingSession;