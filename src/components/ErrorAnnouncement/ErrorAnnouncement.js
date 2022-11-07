/* eslint-disable react/jsx-indent */
import React from 'react';

const ErrorAnnouncement = (props) => {
    const { errors } = props;
    <ul style={{ listStyle: "none", color: "red" }}>
        {errors.map(error => (
            <li key={error}>{error}</li>
        ))}
    </ul>
}

export default ErrorAnnouncement