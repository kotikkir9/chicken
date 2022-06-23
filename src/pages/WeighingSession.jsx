import { useNavigate } from "solid-app-router";
import { createSignal, onCleanup, onMount } from "solid-js";

import Button from "../components/UI/Button";
import Header from "../components/Layout/Header";
import SessionList from "../components/Session/SessionList";
import Stats from "../components/Session/Stats";
import WeightInput from "../components/Session/WeightInput";
import classes from './WeighingSession.module.css';

const sessionTemp = {
    cropId: 1,
    age: 27,
    date: Date.now(),
}

function WeighingSession() {
    const navigate = useNavigate();

    const [selectedWindow, setSelectedWindow] = createSignal('stats');
    const [sessionData, setSessionData] = createSignal(sessionTemp);
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

        const data = localStorage.getItem('session');
        if(data) {
            const session = JSON.parse(data);
            setSessionData(session.session);
            setList(session.list);

            let total = 0;
            let amount = 0;
            for(const e of session.list) {
                amount += e.amount;
                total += e.weight;
            }

            setCount(amount);
            setAverage(parseInt(total / amount));
        }
    });

    onCleanup(() => {
        document.body.style.height = '100%';
        window.removeEventListener('resize', handleResize);
    });

    const handleBackClick = () => {
        navigate('/home', { replace: true });
    }

    const handleSelectWindow = (val) => {
        setSelectedWindow(val);
    }

    const handleSubmit = () => { 
        localStorage.removeItem('session');
        navigate('/home', { replace: true });
    }

    const handleAdd = (obj) => {
        setList(e => [{ amount: obj.amount, weight: obj.value, date: Date.now() }, ...e]);
        calculateStats();
    }

    const handleUpdate = (item, index) => {
        list()[index] = { ...item, weight: 10000, amount: 10 };
        // list()[index] = { ...item };
        setList([...list()]);
        calculateStats();
    }

    const handleDelete = (item) => {
        setList(list().filter(e => e !== item));
        calculateStats();
    }

    const calculateStats = () => {
        let total = 0;
        let amount = 0;
        for(const e of list()) {
            amount += e.amount;
            total += e.weight;
        }

        setCount(amount);
        setAverage(total !== 0 ? parseInt(total / amount) : 0);

        localStorage.setItem('session', JSON.stringify({
            session: sessionData(),
            list: list()
        }));
    }


    return (
        <div className={classes.container}>
            <Header>
                <a href="#" className={classes['back-btn']} onTouchStart={handleBackClick}></a>
                <p>Weighing Session</p>
            </Header>

            <main className={classes.main}>
                <section className={classes.top}>
                    <div className={classes['select-screen']}>
                        <button href="#" onClick={handleSelectWindow.bind(this, 'stats')} className={selectedWindow() === 'stats' && classes.selected}>Stats</button>
                        <button href="#" onClick={handleSelectWindow.bind(this, 'info')} className={selectedWindow() === 'info' && classes.selected}>Info</button>
                    </div>
                    <Button className={classes['submit-btn']} onActivate={handleSubmit}>Submit</Button>
                </section>
                <Stats session={sessionData()} average={average()} count={count()} selected={selectedWindow()} />
                <WeightInput onClick={handleAdd} />
                <SessionList list={list()} onDelete={handleDelete} onUpdate={handleUpdate} />
            </main>
        </div>
    );
}

export default WeighingSession;