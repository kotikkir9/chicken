import { useNavigate } from "solid-app-router";
import Header from "../components/Header";
import Session from "../components/Session";
import classes from "./Home.module.css";

function Home() {
    const navigate = useNavigate();


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
                    <div className={classes["add-btn"]} onClick={() => navigate('/session/new', { replace: true })}></div>
                </section>
            </main>
        </div>
    );
}

export default Home;
