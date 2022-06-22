import { For, createSignal, Show, createEffect } from "solid-js";
import { useNavigate } from "solid-app-router";

import Header from "../components/Layout/Header";
import Session from "../components/Home/Session";
import NewSessionButton from "../components/UI/NewSessionButton";
import LoadingSpinner from "../components/UI/LoadingSpinner";

import classes from "./Home.module.css";


function Home() {
    let optionsRef;
    let listRef;

    const navigate = useNavigate();
    const [sessionList, setSessionList] = createSignal([]);
    const [showDropdown, setShowDropdown] = createSignal(false);
    const [orderBy, setOrderBy] = createSignal('asc');
    const [isLoading, setIsLoading] = createSignal(false);

    createEffect(async () => {
        setIsLoading(true);
        const res = await fetch('https://solidjs-project-default-rtdb.europe-west1.firebasedatabase.app/chicken-weighing.json');
        const json = await res.json();

        const array = [];
        for(const key in json) {
            array.push({ id: key, ...json[key], date: new Date(json[key].date)});
        }

        setSessionList(array.sort((a, b) => b.date - a.date));
        setIsLoading(false);
    });

    const orderDescending = () => {
        handleHideDropdown();
        if(orderBy() === 'desc') return;

        setSessionList(arr => [...arr.sort((a, b) => a.date - b.date)]);
        setOrderBy('desc');
        listRef.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const orderAscending = () => {
        handleHideDropdown();
        if(orderBy() === 'asc') return;

        setSessionList(arr => [...arr.sort((a, b) => b.date - a.date)]);
        setOrderBy('asc');
        listRef.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const handleDropdownToggle = (e) => {
        e.stopPropagation();
        const target = e.currentTarget;

        if(!showDropdown()) {
            target.firstElementChild.style.left = `${e.changedTouches[0].clientX - target.getBoundingClientRect().x}px`;
            target.classList.add(classes['touch-start']);

            setTimeout(() => {
                target.classList.remove(classes['touch-start']);
            }, 500);
        }

        target.classList.toggle(classes.focus);
        setShowDropdown(prev => !prev);
    }

    const handleHideDropdown = () => {
        if(showDropdown()) {
            setShowDropdown(false);
            optionsRef.classList.remove(classes.focus);
        }
    }

    const handleNewSessionClick = async () => {
        navigate("/session/new", { replace: true });
    }

    return (
        <div className={classes.container} onTouchStart={handleHideDropdown}>
            <Header>
                <p>Menu</p>
            </Header>
            <main className={classes.main}>
                <div className={classes.options}>
                    <div ref={optionsRef} className={classes.sort} onTouchStart={handleDropdownToggle} onTouchEnd={(e) => e.preventDefault()}>
                        Sort by
                        <div className={classes['drop-fill-effect']}></div>
                    </div>
                    <Show when={showDropdown()}>
                        <div className={classes.dropdown} onTouchStart={(e) => e.stopPropagation()}>
                            <a className={orderBy() === 'desc' ? classes.selected : ''} onClick={orderDescending}>Date added (oldest)</a>
                            <a className={orderBy() === 'asc' ? classes.selected : ''} onClick={orderAscending}>Date added (newest)</a>
                        </div>
                    </Show>
                </div>
                <section className={classes.sessions}>
                    <Show when={!isLoading()} fallback={<div className="centered"><LoadingSpinner /></div>}>
                        <div ref={listRef} className={classes.list}>
                            <Show when={sessionList().length > 0} fallback={<div className="centered"><h2>No entries</h2></div>}>
                                <For each={sessionList()}>
                                    {(e) => <Session session={e} /> }
                                </For>
                            </Show>
                        </div>
                    </Show>
                    <NewSessionButton onClick={handleNewSessionClick} className={classes['new-session-btn']} />
                </section>
            </main>
        </div>
    );
}

export default Home;