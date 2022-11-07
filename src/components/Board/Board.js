/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { ColumnsContext } from '../../context';
import { Column } from '../Column';
import classes from './styles.module.css'

export const Board = (props) => {
    const columns = useContext(ColumnsContext);

    const { moveAnnouncement } = props

    return (
        <div>
            <p>{moveAnnouncement}</p>
            <ul className={classes.board__list}>
                {columns.map(column => (
                    <Column key={column.id} column={column} />
                ))}
            </ul>
        </div>

    )
}

export default Board