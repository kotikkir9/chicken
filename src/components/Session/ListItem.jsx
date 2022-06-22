import classes from './ListItem.module.css';

function ListItem(props) {
    const index = props.length - props.index;

    return (
        <li className={classes.container}>
            <p className={classes.index}>{index}</p>

            <div className={classes['time-stamp']}>
                <p>{new Date(props.item.date).toLocaleTimeString()}</p>
                <p>{new Date(props.item.date).toLocaleDateString()}</p>
            </div>

            <p className={classes.amount}>x{props.item.amount}</p>
            <p className={classes.weight}>{props.item.weight}g</p>
        </li>
    )
}

export default ListItem;