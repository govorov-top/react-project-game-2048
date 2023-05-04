import React from "react";
import styles from '../assets/css/components/Cell.module.scss'

const Cell = (props) => {
    return <>
        <div data-x={props.x} data-y={props.y} className={styles.cell}></div>
    </>;
}

export default Cell;