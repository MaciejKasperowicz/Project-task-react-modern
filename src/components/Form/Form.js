/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { ColumnsContext } from '../../context';

export const Form = (props) => {
    const columns = useContext(ColumnsContext);
    // console.log(columns);
    const { addNewTask, name, idColumn, user, nameError, idColumnError, userError, dispatch } = props;


    return (
        <div>
            <form onSubmit={addNewTask}>
                <div>
                    <label>Nazwa zadania:</label>
                    <input type="text" name="name"
                        value={name}
                        onChange={e => dispatch(e.target)}
                    />
                </div>
                <div>
                    <label htmlFor="idColumn">Kolumna:</label>
                    <select name="idColumn"
                        value={idColumn}
                        onChange={e => dispatch(e.target)}
                    >
                        <option value="">Wybierz kolumnę</option>
                        {columns ? columns.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        )) : []}
                    </select>
                </div>
                <div>
                    <label htmlFor="user">Pracownik:</label>
                    <input type="text" name="user"
                        value={user}
                        onChange={e => dispatch(e.target)}
                    />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>

            <ul style={{ listStyle: "none", color: "red" }}>
                <li>{nameError}</li>
                <li>{idColumnError}</li>
                <li>{userError}</li>
            </ul>
        </div>
    )
}

export default Form