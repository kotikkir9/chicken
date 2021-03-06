import classes from './Stats.module.css';

function Stats(props) {
    const averageAuto = 450;

    return (
        <section className={classes.container} >
            <div className={`${classes.stats} ${props.selected === 'stats' ? classes.active : null}`}>
                <div className={classes.line}>
                    <p>Average (manual)</p>
                    <p>{props.average !== 0 ? `${props.average}g` : '-'}</p>
                </div>
                <div className={classes.line}>
                    <p>Weighings</p>
                    <p>{props.count}</p>
                </div>
                <div className={classes.line}>
                    <p>Average (automatic)</p>
                    <p>{averageAuto}g</p>
                </div>
                <div className={classes.line}>
                    <p>Delta</p>
                    <p>
                        {props.average !== 0 ? `${props.average - averageAuto}g` : '-'}
                        <span className={`${props.average !== 0 && classes.arrow} ${props.average < averageAuto ? classes.down : null}`}></span>
                    </p>
                </div>
            </div>

            <div className={`${classes.info} ${props.selected === 'info' ? classes.active : null}`}>
                <div className={classes.line}>
                    <p>Time</p>
                    <p>{new Date(props.session?.date).toLocaleTimeString()}</p>
                </div>
                <div className={classes.line}>
                    <p>Date</p>
                    <p>{new Date(props.session?.date).toLocaleDateString()}</p>
                </div>
                <div className={classes.line}>
                    <p>Crop ID</p>
                    <p>{props.session?.cropId}</p>
                </div>
                <div className={classes.line}>
                    <p>Age</p>
                    <p>{props.session?.age} days</p>
                </div>
            </div>
        </section>
    )
}

export default Stats;