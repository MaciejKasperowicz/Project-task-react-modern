/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-indent */
import React from 'react';
import classes from './styles.module.css'


export const ErrorAnnouncement = (props) => {
    const { errors } = props;

    const errorsList = (
        <ul className={classes.errorsList}>
            {errors.map((error, index) => (
                <li key={index}>{error}</li>
            ))}
        </ul>
    )

    return errors ? errorsList : []
}


export default ErrorAnnouncement