/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { TasksContext } from '../../context';
import { Task } from '../Task';
import classes from './styles.module.css'


export const Column = (props) => {
    const { column } = props;

    const { tasks } = useContext(TasksContext);
    const columnTasks = tasks ? tasks.filter(task => task.idColumn === column.id) : [];

    return (
        <div className={classes.column}>
            <li>
                <div className={classes.column__title}>
                    <h4 className={classes.column__name}>{column.name}</h4>
                    <h4>Limit:{column.limit}</h4>
                </div>





                <ul className={classes.column__list}>
                    {columnTasks.map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                </ul>

                <h4 className={classes.column__count}>Liczba zadań: {columnTasks.length}</h4>
            </li>


        </div>
    )
}

export default Column