/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { TasksContext } from '../../context';

export const Task = (props) => {
    const { task } = props;
    // console.log(task);

    const { moveForward, moveBackward } = useContext(TasksContext);
    return (
        <li>
            <div>
                {task.name}
                <button onClick={() => moveForward(task)}>next</button>
                <button onClick={() => moveBackward(task)}>prev</button>
            </div>

        </li>
    )
}

export default Task