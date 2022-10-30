/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { TasksContext } from '../../context';
import { Task } from '../Task'

export const Column = (props) => {
    const { column } = props;

    const { tasks } = useContext(TasksContext);
    const columnTasks = tasks ? tasks.filter(task => task.idColumn === column.id) : [];

    return (
        <div style={{
            border: "1px solid black",
            padding: "20px"
        }}>
            <li>{column.name} [Limit:{column.limit}]
                <h4>Ilość: {columnTasks.length}</h4>


                <ul>
                    {columnTasks.map(task => (
                        <Task key={task.id} task={task} />
                    ))}
                </ul>
            </li>


        </div>
    )
}

export default Column