import classes from "./Session.module.css";

function Session(props) {
    return (
        <div className={classes.container}>
            <div className={classes.date}>
                <p>{props.session.date.toLocaleDateString()}</p>
            </div>
            <main className={classes.body}>
                <div>
                    <p>Weighings</p>
                    <p>{props.session.count}</p>
                </div>
                <div>
                    <p>Crop</p>
                    <p>#{props.session.cropId}</p>
                </div>
                <div>
                    <p>Average</p>
                    <p>{props.session.average}g</p>
                </div>
                <div>
                    <p>Age</p>
                    <p>{props.session.age} days</p>
                </div>
            </main>
        </div>
    );
}

export default Session;
