import React from 'react';

const tasks = [
    { id: 1, name: 'Task1 Default', idColumn: 1, user: 'Anna' },
    { id: 2, name: 'Task2 Default', idColumn: 1, user: 'Tadzio' },
    { id: 3, name: 'Task3 Default', idColumn: 2, user: 'Krzyś' },
    { id: 4, name: 'Task4 Default', idColumn: 3, user: 'Anna' },
    { id: 5, name: 'Task5 Default', idColumn: 4, user: 'Tadzio' },
    { id: 6, name: 'Task6 Default', idColumn: 4, user: 'Krzyś' },
    { id: 7, name: 'Task7 Default', idColumn: 5, user: 'Anna' },
    { id: 8, name: 'Task8 Default', idColumn: 6, user: 'Tadzio' },
    { id: 9, name: 'Task9 Default', idColumn: 7, user: 'Krzyś' },
    // { id: 10, name: 'Task10', idColumn: 5, user: 'Anna' },
    // { id: 11, name: 'Task11', idColumn: 6, user: 'Tadzio' },
    // { id: 12, name: 'Task12', idColumn: 7, user: 'Krzyś' },
]

const TasksContext = React.createContext(tasks);

export default TasksContext;