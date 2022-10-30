/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useReducer, useContext } from 'react';
import { ColumnsContext } from '../../context';

export const Form = () => {
    const { columns } = useContext(ColumnsContext);

    const initTask = {
        taskName: "",
        column: "",
        worker: ""
    }

    const reducer = (state, { name, value }) => {
        return { ...state, [name]: value }
    }

    const [state, dispatch] = useReducer(reducer, initTask);

    const { taskName, column, worker } = state;

    const validateInputContentByLength = (content, minContentLength) => {
        if (content.length >= minContentLength) return true
        return false
    }

    const setError = (stateToUpdate, fieldToUpdate, errorInfo) => {
        return { ...stateToUpdate, [`${fieldToUpdate}Error`]: errorInfo }
    }

    const unsetError = (stateToUpdate, fieldToUpdate) => {
        return { ...stateToUpdate, [`${fieldToUpdate}Error`]: null }
    }

    const initTaskError = {
        taskNameError: null,
        columnError: null,
        workerError: null
    }

    const errorReducer = (errorState, { key, stateValue }) => {
        // console.log(action);
        switch (key) {
            case "taskName":
                {
                    const minValueLength = 4;
                    const isValid = validateInputContentByLength(stateValue, minValueLength)
                    if (!isValid) return setError(errorState, key, `Pole Imię musi zawierać minimum ${minValueLength} znaki.`)
                    return unsetError(errorState, key)
                }
            case "column":
                {
                    if (!stateValue) return setError(errorState, key, "Wybierz jedną z kolumn.")
                    return unsetError(errorState, key)
                }
            case "worker":
                {
                    const minValueLength = 4;
                    const isValid = validateInputContentByLength(stateValue, minValueLength)
                    if (!isValid) return setError(errorState, key, `Pole Pracownik musi zawierać minimum ${minValueLength} znaki.`)
                    return unsetError(errorState, key)
                }
            default:
                break;
        }
    }

    const [errorState, errorDispatch] = useReducer(errorReducer, initTaskError);

    const { taskNameError, columnError, workerError } = errorState;



    const addNewTask = e => {
        e.preventDefault();
        console.log(state);
        Object.keys(state).forEach(key => {
            errorDispatch({ key, stateValue: state[key] })
        })
    }

    return (
        <div>
            <form onSubmit={addNewTask}>
                <div>
                    <label>Nazwa zadania:</label>
                    <input type="text" name="taskName"
                        value={taskName}
                        onChange={e => dispatch(e.target)}
                    />
                </div>
                <div>
                    <label htmlFor="column">Kolumna:</label>
                    <select name="column"
                        value={column}
                        onChange={e => dispatch(e.target)}
                    >
                        {/* <option value="">Wybierz kolumnę</option>
                        <option value="Pending">Pending</option>
                        <option value="AnalysisDoing">Analysis - Doing</option>
                        <option value="AnalysisDone">Analysis - Done</option>
                        <option value="ProgrammingDoing">Programming - Doing</option>
                        <option value="ProgrammingDone">Programming - Done</option>
                        <option value="Testing">Testing</option>
                        <option value="Deploy">Deploy</option> */}
                        <option value="">Wybierz kolumnę</option>
                        {columns && columns.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="worker">Pracownik:</label>
                    {/* <select name="worker"
                        value={worker}
                        onChange={e => dispatch(e.target)}
                    >
                        <option value="Anna">Anna</option>
                        <option value="Tadzio">Tadzio</option>
                        <option value="Krzys">Krzyś</option>
                    </select> */}
                    <input type="text" name="worker"
                        value={worker}
                        onChange={e => dispatch(e.target)}
                    />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>

            <ul style={{ listStyle: "none", color: "red" }}>
                <li>{taskNameError}</li>
                <li>{columnError}</li>
                <li>{workerError}</li>
            </ul>
        </div>
    )
}

export default Form