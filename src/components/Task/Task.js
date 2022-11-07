/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { TasksContext } from '../../context';
import classes from './styles.module.css';


export const Task = (props) => {
    const { task } = props;
    // console.log(task);

    const { moveForward, moveBackward } = useContext(TasksContext);
    return (
        <li className={classes.task}>
            <button className={classes.task__button} onClick={() => moveBackward(task)}>{String.fromCharCode(8592)}</button>
            <h5 className={classes.task__name}>{task.name}</h5>
            <button className={classes.task__button} onClick={() => moveForward(task)}>{String.fromCharCode(8594)}</button>


        </li>
    )
}

export default Task