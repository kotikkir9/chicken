import classes from './ListItem.module.css';

function ListItem(props) {
    const index = props.length - props.index;

    console.log(props.item);

    return (
        <li className={classes.container}>
            <p>{index}</p>
            <p>Amount: {props.item.amount}</p>
            <p>Weight; {props.item.weight}</p>
            <p>Time: {new Date(props.item.date).toLocaleTimeString()}</p>
            <p>Date: {new Date(props.item.date).toLocaleDateString()}</p>

        </li>
    )
}

export default ListItem;