import { useNavigate } from "solid-app-router";
import Header from "../components/Header";
import Session from "../components/Session";
import classes from "./Home.module.css";

function Home() {
    const navigate = useNavigate();


    const handleTouchStart = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const posY = e.touches[0].pageY - rect.top;
        const posX = e.touches[0].pageX - rect.left;

        const fill = e.currentTarget.firstChild;
        fill.style.left = `${posX}px`
        fill.style.top = `${posY}px`;

        e.currentTarget.classList.add(classes.active);
    }

    const handleTouchEnd = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(classes.active);

        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.x + (rect.width / 2);
        const centerY = rect.y + (rect.height / 2);

        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;

        const diff = Math.sqrt(Math.pow(Math.abs(touchX - centerX), 2) + Math.pow(Math.abs(touchY - centerY), 2));

        if(diff <= (rect.width / 2)) {
            navigate('/session/new', { replace: true });
        }
    }

    return (
        <div className={classes.container}>
            <Header>
                <p>Menu</p>
            </Header>
            <main className={classes.main}>
                <div className={classes.options}>
                    <div className={classes.filters}>Filters</div>
                </div>
                <section className={classes.sessions}>
                    <div className={classes.list}>
                        <Session text={1} />
                        <Session text={2} />
                        <Session text={3} />
                        <Session text={4} />
                        <Session text={5} />
                        <Session text={6} />
                        <Session text={7} />
                        <Session text={8} />
                        <Session text={9} />
                        <Session text={10} />
                    </div>
                    <div className={classes["add-btn"]} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} >
                        <div className={classes['btn-fill']}></div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
