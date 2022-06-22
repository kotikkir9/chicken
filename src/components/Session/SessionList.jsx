import { For } from "solid-js";
import ListItem from "./ListItem";
import classes from "./SessionList.module.css";

function SessionList(props) {
    return (
        <ul className={classes.container}>
            <For each={props.list.reverse()} >
                {(e, i)=> <ListItem item={e} index={i()} length={props.list.length} />}
            </For>
        </ul>
    );
}

export default SessionList;
