import React from 'react';

const columns = [
    { id: 1, name: 'Pending', limit: 4 },
    { id: 2, name: 'Analysis - Doing', limit: 3 },
    { id: 3, name: 'Analysis - Done', limit: 3 },
    { id: 4, name: 'Programming - Doing', limit: 4 },
    { id: 5, name: 'Programming - Done', limit: 3 },
    { id: 6, name: 'Testing', limit: 2 },
    { id: 7, name: 'Deploy', limit: 2 },
]

const ColumnsContext = React.createContext(columns);

export default ColumnsContext;
