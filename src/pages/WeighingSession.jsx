import { useNavigate } from "solid-app-router";
import { createSignal, onMount, Show  } from "solid-js";

import Button from "../components/UI/Button";
import Header from "../components/Layout/Header";
import SessionList from "../components/Session/SessionList";
import Stats from "../components/Session/Stats";
import WeightInput from "../components/Session/WeightInput";
import classes from './WeighingSession.module.css';
import UpdateModal from "../components/Session/UpdateModal";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ConfirmOverlay from "../components/Layout/ConfirmOverlay";
import SessionDataInput from "../components/Session/SessionDataInput";

function WeighingSession() {
    const navigate = useNavigate();

    const [sending, setSending] = createSignal(false);

    const [confirmOverlayOpen, setConfirmOverlayOpen] = createSignal(false);
    const [updateModalOpen, setUpdateModalOpen] = createSignal(false);
    const [sessionDataModalOpen, setSessionDataModalOpen] = createSignal(false);
    const [submitModalOpen, setSubmitModalOpen] = createSignal(false);

    const [itemToUpdate, setItemToUpdate] = createSignal(null);
    const [selectedWindow, setSelectedWindow] = createSignal('stats');
    const [sessionData, setSessionData] = createSignal({});

    const [list, setList] = createSignal([]);
    const [average, setAverage] = createSignal(0);
    const [count, setCount] = createSignal(0);
    const [disableSubmit, setDisableSubmit] = createSignal(true);

    onMount(() => {
        const data = localStorage.getItem('session');

        if(data) {
            setDisableSubmit(false);
            const session = JSON.parse(data);
            setSessionData(session.session);
            setList(session.list);

            let total = 0;
            let amount = 0;
            for(const e of session.list) {
                amount += e.amount;
                total += e.weight;
            }

            if(total === 0 && amount == 0) {
                setAverage(0);
                setCount(0);
            } else {
                setCount(amount);
                setAverage(parseInt(total / amount));
            }
        } else {
            setSessionDataModalOpen(true);
        }
    });

    const handleSessionData = (data) => {
        setSessionData(data);
        setSessionDataModalOpen(false);
    }

    const handleBackClick = () => {
        if(list().length) {
            setConfirmOverlayOpen(true);
        } else {
            returnHome();
        }
    }

    const returnHome = () =>{
        navigate('/home', { replace: true });
        localStorage.removeItem('session');
    }

    const openSubmitModal = () => {
        setSubmitModalOpen(true);
    }

    const handleSubmit = async () => {
        setSubmitModalOpen(false);
        if(!list().length) return;

        setSending(true);
        const res = await fetch('https://solidjs-project-default-rtdb.europe-west1.firebasedatabase.app/chicken-weighing.json', {
            method: 'POST',
            body: JSON.stringify({
                ...sessionData(),
                list: list(),
                average: average(),
                count: count(),
            })
        });

        await res.json();
        setSending(false);
        
        navigate('/home', { replace: true });
        localStorage.removeItem('session');
    }

    const handleSelectWindow = (val) => {
        setSelectedWindow(val);
    }

    const handleAdd = (obj) => {
        setList(e => [{ amount: obj.amount, weight: obj.value, date: Date.now() }, ...e]);
        calculateStats();
    }

    const openUpdateModal = (item, index) => {
        setItemToUpdate({ item, index});
        setUpdateModalOpen(true);
    }

    const handleUpdate = (data) => {
        if(data) {
            setList(prev => {
                prev[data.index] = { ...data.item };
                return [...prev];
            })
            calculateStats();
        }

        handleCloseOverlay();
    }

    const handleDelete = (item) => {
        setList(list().filter(e => e !== item));
        calculateStats();
    }

    const calculateStats = () => {
        if(list().length) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }

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

    const handleCloseOverlay = () => {
        setUpdateModalOpen(false);
        setConfirmOverlayOpen(false);
        setSubmitModalOpen(false);
        setItemToUpdate(null);
    }


    return (
        <div className={classes.container}>
            <Show when={sessionDataModalOpen()}>
                <SessionDataInput onSubmit={handleSessionData} onCancel={returnHome} />
            </Show>
            <Show when={submitModalOpen()}>
                <ConfirmOverlay 
                    onLeftClick={handleCloseOverlay} 
                    onRightClick={handleSubmit} 
                    secondary="left"
                    left="Cancel"
                    right="Submit"
                    heading={'Confirm Submission'} 
                    text={'Submit your data, if you are done with the weighing session.'} 
                    onBackdropClick={handleCloseOverlay}
                />
            </Show>
            <Show when={confirmOverlayOpen()} >    
                <ConfirmOverlay 
                    onRightClick={handleCloseOverlay} 
                    onLeftClick={returnHome}
                    left="Discard"
                    right="Stay"
                    secondary="left"
                    heading={'You have some unsaved data'} 
                    text={'Do you want to leave? All your session data will be lost.'} 
                    onBackdropClick={handleCloseOverlay}
                />
            </Show>
            <Show when={updateModalOpen()}>
                <UpdateModal data={itemToUpdate()} updateItem={handleUpdate} onBackdropClick={handleCloseOverlay} onCloseClick={handleCloseOverlay} />
            </Show>

            <Header>
                <button className={classes['back-btn']} onClick={handleBackClick}></button>
                <p>Weighing Session</p>
            </Header>

            <Show when={!sending()} fallback={<div className="centered"><LoadingSpinner /></div>}>
                <main className={classes.main}>
                    <section className={classes.top}>
                        <div className={classes['select-screen']}>
                            <button onClick={handleSelectWindow.bind(this, 'stats')} className={selectedWindow() === 'stats' && classes.selected}>Stats</button>
                            <button onClick={handleSelectWindow.bind(this, 'info')} className={selectedWindow() === 'info' && classes.selected}>Info</button>
                        </div>
                        <Button className={classes['submit-btn']} onActivate={openSubmitModal} disabled={disableSubmit()}>Submit</Button>
                    </section>
                    <Stats session={sessionData()} average={average()} count={count()} selected={selectedWindow()} />
                    <WeightInput onClick={handleAdd} />
                    <SessionList list={list()} onDelete={handleDelete} onUpdate={openUpdateModal} />
                </main>
            </Show>
        </div>
    );
}

export default WeighingSession;