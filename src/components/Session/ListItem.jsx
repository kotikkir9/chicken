import { createEffect, createSignal } from 'solid-js';
import classes from './ListItem.module.css';
import deleteIcon from '../../assets/trash.png';
import updateIcon from '../../assets/edit.png';

let timeout;

function ListItem(props) {
    const [index, setIndex] = createSignal(props.length - props.index)
    let updateRef;
    let deleteRef;

    createEffect(() => {
        setIndex(props.length - props.index);
    });

    
    const [pressed, setPressed] = createSignal(false);
    const [action, setAction] = createSignal('');
    const [touchStart, setTouchStart] = createSignal(0);

    const handleDelete = (target) => {
        target.classList.add(classes.deleted);
        setTimeout(() => {
            props.onDelete();
        }, 300);
    }

    const handleUpdate = () => {
        props.onUpdate();
    }

    const handleTouchStart = ({ currentTarget : target, targetTouches }) => {
        setTouchStart(targetTouches[0].clientX);

        timeout = setTimeout(() => {
            setPressed(true);
            target.parentNode.style.overflowY = 'hidden';
            target.classList.add(classes.active);
        }, 100);   
    }

    const handleTouchMove = ({ currentTarget : target, targetTouches }) => {
        if(!pressed()) {
            clearTimeout(timeout);
            return;
        }

        let margin = targetTouches[0].clientX - touchStart();
        const width = target.getBoundingClientRect().width;
        let diff = parseInt(width * 0.35);


        if(margin < -diff || margin > diff) {
            target.classList.add(classes['action-active']);

            if(margin < -diff) {
                setAction('delete');
                if(margin < parseInt(-width / 2)) 
                    return;
                
            } else {
                setAction('update');
                if(margin > parseInt(width / 2)) 
                    return
            }
        } else {
            target.classList.remove(classes['action-active']);
            setAction('');
        }

        updateRef.style.width = `${margin}px`
        deleteRef.style.width = `${-margin}px`

        target.style.transition = 'margin 0s';
        target.style.marginLeft = `${margin}px`
    }

    const handleTouchEnd = (e) => {
        const target = e.currentTarget;

        if(pressed()) {
            e.preventDefault();
            setPressed(false);

            if(action() !== 'delete') {
                target.classList.remove(classes.active);
                target.classList.remove(classes['action-active']);
                target.style.transition = 'margin 0.3s ease-out';
                target.style.marginLeft = '0px';
            } else {
                deleteRef.style.width = '100%';
                deleteRef.style.right = '-100%';
            }
            
            target.parentNode.style.overflowY = 'scroll';

            setAction((prev) => {
                if(prev === 'delete') {
                    handleDelete(target);
                } else if(prev === 'update') {
                    handleUpdate();
                }
    
                return '';
            });
        }
    }


    return (
        <li className={classes.container} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div ref={updateRef} className={classes.update}>
                <img src={updateIcon} alt="Update Icon" className={classes.icon} />
            </div>
            <div ref={deleteRef} className={classes.delete}>
                <img src={deleteIcon} alt="Delete Icon" className={classes.icon} />
            </div>
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