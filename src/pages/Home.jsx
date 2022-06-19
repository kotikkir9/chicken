import { useNavigate } from "solid-app-router";
import Header from "../components/Header";
import Session from "../components/Session";
import classes from "./Home.module.css";
import { sessions } from "../data/sessions";
import { For, createSignal, Show } from "solid-js";
import NewSessionButton from "../components/NewSessionButton";

function Home() {
    const navigate = useNavigate();
    const [sessionList, setSessionList] = createSignal(sessions.sort((a, b) => b.date - a.date));
    const [showDropdown, setShowDropdown] = createSignal(false);
    const [orderBy, setOrderBy] = createSignal('asc');

    let optionsRef;
    let listRef;

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

    const handleDropdownTouchStart = (e) => {
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

    const handleNewSessionClick = () => {
        navigate("/session/new", { replace: true });
    }

    return (
        <div className={classes.container} onTouchStart={handleHideDropdown}>
            <Header>
                <p>Menu</p>
            </Header>
            <main className={classes.main}>
                <div className={classes.options}>
                    <div ref={optionsRef} className={classes.sort} onTouchStart={handleDropdownTouchStart} onTouchEnd={(e) => e.preventDefault()}>
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
                    <div ref={listRef} className={classes.list}>
                        <For each={sessionList()}>
                            {(e) => <Session session={e} /> }
                        </For>
                    </div>
                    <NewSessionButton onClick={handleNewSessionClick} className={classes['new-session-btn']} />
                </section>
            </main>
        </div>
    );
}

export default Home;