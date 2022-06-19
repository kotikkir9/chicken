import classes from "./NewSessionButton.module.css";

function NewSessionButton(props) {
    const handleTouchStart = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const posY = e.touches[0].pageY - rect.top;
        const posX = e.touches[0].pageX - rect.left;

        const fill = e.currentTarget.firstChild;
        fill.style.left = `${posX}px`;
        fill.style.top = `${posY}px`;

        e.currentTarget.classList.add(classes.active);
    };

    const handleTouchEnd = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(classes.active);

        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const touchX = e.changedTouches[0].clientX;
        const touchY = e.changedTouches[0].clientY;

        const diff = Math.sqrt(
            Math.pow(Math.abs(touchX - centerX), 2) +
                Math.pow(Math.abs(touchY - centerY), 2)
        );

        if (diff <= rect.width / 2) {
            props.onClick();
        }
    }

    return (
        <button
            className={`${classes["add-btn"]} ${props.className ? props.className : null}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={classes["btn-fill"]}></div>
        </button>
    );
}

export default NewSessionButton;