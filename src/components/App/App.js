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
import classes from './styles.module.css'
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

export const App = () => {
    const storage = localStorage;
    const [columns, setColumns] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [newTaskValid, setNewTaskValid] = useState(false);
    const [moveAnnouncement, setMoveAnnouncement] = useState("")

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

    const initTaskError = {
        nameError: "",
        idColumnError: "",
        userError: ""
    }

    const validateInputContentByLength = (content, minContentLength) => {
        if (content.length >= minContentLength) return true
        return false
    }

    const checkColumnFreeSpace = (selectedColumnID) => {
        const selectedColumnLimit = columns.find(column => column.id === selectedColumnID).limit
        const selectedColumnTasksCount = tasks.filter(task => task.idColumn === selectedColumnID).length
        const hasColumnFreeSpace = selectedColumnLimit > selectedColumnTasksCount
        return hasColumnFreeSpace
    }



    const setError = (stateToUpdate, fieldToUpdate, errorInfo) => {
        return { ...stateToUpdate, [`${fieldToUpdate}Error`]: errorInfo }
    }

    const unsetError = (stateToUpdate, fieldToUpdate) => {
        return { ...stateToUpdate, [`${fieldToUpdate}Error`]: null }
    }

    const formErrorReducer = (formErrorState, { key, stateValue }) => {
        // console.log(action);
        switch (key) {
            case "name":
                {
                    const minValueLength = 4;
                    const isValid = validateInputContentByLength(stateValue, minValueLength)
                    if (!isValid) return setError(formErrorState, key, `Pole Imię musi zawierać minimum ${minValueLength} znaki.`)
                    return unsetError(formErrorState, key)
                }
            case "idColumn":
                {
                    if (!stateValue) return setError(formErrorState, key, "Wybierz jedną z kolumn.")
                    const hasColumnFreeSpace = checkColumnFreeSpace(Number(stateValue));
                    if (!hasColumnFreeSpace) return setError(formErrorState, key, "Wybrana kolumna osiągnęła limit.")
                    return unsetError(formErrorState, key)
                }
            case "user":
                {
                    const minValueLength = 4;
                    const isValid = validateInputContentByLength(stateValue, minValueLength)
                    if (!isValid) return setError(formErrorState, key, `Pole Pracownik musi zawierać minimum ${minValueLength} znaki.`)
                    return unsetError(formErrorState, key)
                }
            default:
                break;
        }
    }


    const [formErrorState, errorDispatch] = useReducer(formErrorReducer, initTaskError);

    const { nameError, idColumnError, userError } = formErrorState;

    const checkTaskProper = () => {
        return Object.keys(formErrorState).every(field => formErrorState[field] === null);
    }



    const checkTaskValidity = () => {
        // checkForm();
        const selectedColumnID = Number(state.idColumn);
        if (selectedColumnID) {
            const isNewTaskProper = checkTaskProper();
            const hasColumnFreeSpace = checkColumnFreeSpace(selectedColumnID);
            // if (!hasColumnFreeSpace) {
            //     setMoveAnnouncement("Nie można dodać zdania, kolumna osiągnęła limit.");
            //     clearInputs();
            // }
            const isTaskCanBeAdded = isNewTaskProper && hasColumnFreeSpace;
            setNewTaskValid(isTaskCanBeAdded);
        } else {
            setNewTaskValid(false);
        }
    }





    const checkForm = () => {
        Object.keys(state).forEach(key => {
            errorDispatch({ key, stateValue: state[key] })
        })

    }







    const clearInputs = () => {
        Object.keys(state).forEach(key => { state[key] = "" })
    }

    const clearErrors = () => {
        Object.keys(formErrorState).forEach(key => { formErrorState[key] = "" })
        setMoveAnnouncement("")
    }



    useEffect(() => {
        checkTaskValidity();
    }, [formErrorState, state])

    const addNewTask = () => {
        const newTask = { ...state, idColumn: Number(idColumn), id: uuidv4() };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
    }





    useEffect(() => {
        console.log('3use', newTaskValid);
        if (newTaskValid) {
            addNewTask();
            clearInputs();
            clearErrors();
        }
    }, [newTaskValid])



    const handleNewTask = e => {
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
        if (!isWantedColumnExists(item, "next")) {
            setMoveAnnouncement("Nie można przesunąć zadania, następna kolumna nie istnieje.");
            return
        }

        if (isLimitExceeded(item, "next")) {
            setMoveAnnouncement("Nie można przesunąć zadania, następna kolumna osiągnęła limit.");
            return
        }

        const updatedTasks = getUpdatedTasks(item, "next")
        setMoveAnnouncement("")
        setTasks(updatedTasks)
        storage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    const moveBackward = (item) => {
        if (!isWantedColumnExists(item, "prev")) {
            setMoveAnnouncement("Nie można przesunąć zadania, poprzednia kolumna nie istnieje.");
            return
        }

        if (isLimitExceeded(item, "prev")) {
            setMoveAnnouncement("Nie można przesunąć zadania, poprzednia kolumna osiągnęła limit.");
            return
        }

        const updatedTasks = getUpdatedTasks(item, "prev")
        setMoveAnnouncement("")
        setTasks(updatedTasks)
        storage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    const formProps = {
        handleNewTask,
        name,
        idColumn,
        user,
        nameError,
        idColumnError,
        userError,
        dispatch,
    }


    return (
        <main className={classes.kanban}>
            <h1 className={classes.kanban__title}>kanban</h1>
            {columns && tasks ? (
                <ColumnsContext.Provider value={columns}>
                    <TasksContext.Provider value={{
                        tasks,
                        moveForward,
                        moveBackward
                    }}>
                        <Form {...formProps} />
                        <Board moveAnnouncement={moveAnnouncement} />
                    </TasksContext.Provider>
                </ColumnsContext.Provider>
            ) :
                <div>
                    <Form {...formProps} />
                    <Board />
                </div>}
        </main>


    )
}




export default App;
