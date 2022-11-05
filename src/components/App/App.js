/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
// ./src/components/App.js
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState, useReducer } from 'react';
import { Board } from '../Board';
import { Form } from '../Form';
import { ColumnsContext, TasksContext } from '../../context';

// const columns = [
//     { id: 1, name: 'Pending', limit: 4 },
//     { id: 2, name: 'Analysis - Doing', limit: 3 },
//     { id: 3, name: 'Analysis - Done', limit: 2 },
//     { id: 4, name: 'Programming - Doing', limit: 4 },
//     { id: 5, name: 'Programming - Done', limit: 3 },
//     { id: 6, name: 'Testing', limit: 2 },
//     { id: 7, name: 'Deploy', limit: 2 },
// ]

// const tasks = [
//     { id: 1, name: 'Task1', idColumn: 1, user: 'Anna' },
//     { id: 2, name: 'Task2', idColumn: 1, user: 'Tadzio' },
//     { id: 3, name: 'Task3', idColumn: 2, user: 'Krzyś' },
//     { id: 4, name: 'Task4', idColumn: 2, user: 'Anna' },
//     { id: 5, name: 'Task5', idColumn: 3, user: 'Tadzio' },
//     { id: 6, name: 'Task6', idColumn: 3, user: 'Krzyś' },
//     { id: 7, name: 'Task7', idColumn: 4, user: 'Anna' },
//     { id: 8, name: 'Task8', idColumn: 4, user: 'Tadzio' },
//     { id: 9, name: 'Task9', idColumn: 5, user: 'Krzyś' },
//     { id: 10, name: 'Task10', idColumn: 5, user: 'Anna' },
//     { id: 11, name: 'Task11', idColumn: 6, user: 'Tadzio' },
//     { id: 12, name: 'Task12', idColumn: 7, user: 'Krzyś' },
// ]

// localStorage.setItem("columns", JSON.stringify(columns));
// localStorage.setItem("tasks", JSON.stringify(tasks));

const App = () => {
    const storage = localStorage;
    const [columns, setColumns] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [sendForm, setSendForm] = useState(false);
    const [newTaskValid, setNewTaskValid] = useState(false)

    useEffect(() => {
        setColumns(JSON.parse(storage.getItem('columns')))
    }, [])

    useEffect(() => {
        setTasks(JSON.parse(storage.getItem('tasks')))
    }, [])

    const initTask = {
        name: "",
        idColumn: "",
        user: ""
    }

    const reducer = (state, { name, value }) => {
        return { ...state, [name]: value }
    }

    const [state, dispatch] = useReducer(reducer, initTask);

    const { name, idColumn, user } = state;

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
        nameError: "",
        idColumnError: "",
        userError: ""
    }

    const errorReducer = (errorState, { key, stateValue }) => {
        // console.log(action);
        switch (key) {
            case "name":
                {
                    const minValueLength = 4;
                    const isValid = validateInputContentByLength(stateValue, minValueLength)
                    if (!isValid) return setError(errorState, key, `Pole Imię musi zawierać minimum ${minValueLength} znaki.`)
                    return unsetError(errorState, key)
                }
            case "idColumn":
                {
                    if (!stateValue) return setError(errorState, key, "Wybierz jedną z kolumn.")
                    return unsetError(errorState, key)
                }
            case "user":
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

    const { nameError, idColumnError, userError } = errorState;

    const checkForm = () => {
        Object.keys(state).forEach(key => {
            errorDispatch({ key, stateValue: state[key] })
        })

    }

    // useEffect(() => {
    //     if (sendForm) checkForm()
    //     setSendForm(false)
    // }, [sendForm])

    const checkTaskValidity = () => {

    }

    const checkTaskProper = () => {
        return Object.keys(errorState).every(field => errorState[field] === null);
    }

    useEffect(() => {
        if (columns) {
            // const isNewTaskProper = Object.keys(errorState).every(field => errorState[field] === null);
            const isNewTaskProper = checkTaskProper();

            const selectedColumnID = Number(state.idColumn);

            if (selectedColumnID) {
                const selectedColumnLimit = columns.find(column => column.id === selectedColumnID).limit
                const selectedColumnTasksCount = tasks.filter(task => task.idColumn === selectedColumnID).length
                const hasColumnFreeSpace = selectedColumnLimit > selectedColumnTasksCount
                const isTaskCanBeAdded = isNewTaskProper && hasColumnFreeSpace;
                setNewTaskValid(isTaskCanBeAdded);
            }
        }

    }, [errorState, state])

    useEffect(() => {
        console.log('3use', newTaskValid);
        if (newTaskValid) {
            const newTask = { ...state, idColumn: Number(idColumn), id: uuidv4() }
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks)

            Object.keys(state).forEach(key => { state[key] = "" })
            Object.keys(errorState).forEach(key => { errorState[key] = "" })
        }
    }, [newTaskValid])



    const addNewTask = e => {
        e.preventDefault();
        checkForm()
    }



    const isWantedColumnExists = ({ idColumn }, direction) => {
        switch (direction) {
            case "next":
                if (idColumn < columns.length) return true
                break;
            case "prev":
                if (idColumn > 1) return true
                break;
            default:
                break;
        }
    }

    const isLimitExceeded = (item, direction) => {
        const wantedColumnID = direction === "next" ? item.idColumn + 1 : item.idColumn - 1;
        const wantedColumn = columns.filter(column => column.id === wantedColumnID)[0];
        const { limit: wantedColumnLimit } = wantedColumn;
        const wantedColumnTaskCount = tasks.filter(task => task.idColumn === wantedColumnID).length;

        if (wantedColumnLimit === wantedColumnTaskCount) return true
    }

    const getUpdatedTasks = (item, direction) => {
        const operator = direction === "next" ? 1 : -1;
        const updatedTasks = tasks.map(task => {
            if (task.id === item.id) return { ...task, "idColumn": task.idColumn + operator }
            return task
        })
        return updatedTasks;
    }

    const moveForward = (item) => {
        if (!isWantedColumnExists(item, "next")) return

        if (isLimitExceeded(item, "next")) return

        const updatedTasks = getUpdatedTasks(item, "next")
        setTasks(updatedTasks)
        storage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    const moveBackward = (item) => {
        if (!isWantedColumnExists(item, "prev")) return

        if (isLimitExceeded(item, "prev")) return

        const updatedTasks = getUpdatedTasks(item, "prev")
        setTasks(updatedTasks)
        storage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    const formProps = {
        addNewTask,
        name,
        idColumn,
        user,
        nameError,
        idColumnError,
        userError,
        dispatch,
    }

    return (
        <div>
            {columns && tasks ? (
                <ColumnsContext.Provider value={columns}>
                    <TasksContext.Provider value={{
                        tasks,
                        moveForward,
                        moveBackward
                    }}>
                        <Form {...formProps} />
                        <Board />
                    </TasksContext.Provider>
                </ColumnsContext.Provider>
            ) :
                <div>
                    <Form {...formProps} />
                    <Board />
                </div>}
        </div>


    )
}




export default App;
