import { For } from "solid-js";
import ListItem from "./ListItem";
import classes from "./SessionList.module.css";

function SessionList(props) {


    return (
        <ul className={classes.container}>
            <Show when={props.list.length === 0}>
                <h3 className="centered">No entries</h3>
            </Show>
            <For each={props.list} >
                {(e, i)=> <ListItem item={e} index={i()} length={props.list.length} onSlide={props.onDelete.bind(this, e)} />}
            </For>
        </ul>
    );
}

export default SessionList;
