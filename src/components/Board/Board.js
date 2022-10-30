/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { ColumnsContext } from '../../context';
import { Column } from '../Column';

export const Board = () => {
    const columns = useContext(ColumnsContext)

    return (
        <ul style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            listStyle: "none"
        }}>
            {columns.map(column => (
                <Column key={column.id} column={column} />
            ))}
        </ul>

    )
}

export default Board