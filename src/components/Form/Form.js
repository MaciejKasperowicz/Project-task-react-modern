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
import classes from './styles.module.css'


export const Form = (props) => {
    const columns = useContext(ColumnsContext);
    // console.log(columns);
    const { handleNewTask, name, idColumn, user, nameError, idColumnError, userError, dispatch } = props;


    return (
        <section className={classes.form}>
            <h3 className={classes.form__title}>Wprowadź nowe zadanie:</h3>
            <form onSubmit={handleNewTask}>
                <div className={classes.form__fields}>
                    <div className={classes.form__field}>
                        <label className={classes.form__label} >Nazwa zadania:</label>
                        <input
                            className={classes.form__input}
                            type="text" name="name"
                            value={name}
                            onChange={e => dispatch(e.target)}
                    />
                    </div>
                    <div className={classes.form__field}>
                        <label className={classes.form__label}>Kolumna:</label>
                        <select
                            className={classes.form__input}
                            name="idColumn"
                            value={idColumn}
                            onChange={e => dispatch(e.target)}
                    >
                            <option value="">Wybierz kolumnę</option>
                            {columns ? columns.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )) : []}
                        </select>
                    </div>
                    <div className={classes.form__field}>
                        <label className={classes.form__label}>Pracownik:</label>
                        <input
                            className={classes.form__input}
                            type="text" name="user"
                            value={user}
                            onChange={e => dispatch(e.target)}
                        />
                    </div>
                </div>
                <div className={classes.form__field}>
                    <input
                        className={classes.form__submit}
                        type="submit" />
                </div>
            </form>

            {/* <ul style={{ listStyle: "none", color: "red" }}>
                <li>{nameError}</li>
                <li>{idColumnError}</li>
                <li>{userError}</li>
            </ul> */}
        </section>
    )
}

export default Form