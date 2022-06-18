import classes from './Session.module.css';

function Session(props) {
    return (
        <div className={classes.container}>
           <p>{props.text}</p> 
        </div>
    )
}

export default Session;