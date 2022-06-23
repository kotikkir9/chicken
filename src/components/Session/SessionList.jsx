import { For } from "solid-js";
import ListItem from "./ListItem";
import classes from "./SessionList.module.css";

function SessionList(props) {

    const preventScroll = (e) => {
        e.preventDefault();
        return false;
    }

    return (
        <ul className={classes.container} onWheel={preventScroll}>
            <Show when={props.list.length === 0}>
                <h3 className="centered">No entries</h3>
            </Show>
            <For each={props.list} >
                {(e, i)=> <ListItem item={e} index={i()} length={props.list.length} onDelete={props.onDelete.bind(this, e)} onUpdate={props.onUpdate.bind(this, e, i())} />}
            </For>
        </ul>
    );
}

export default SessionList;
