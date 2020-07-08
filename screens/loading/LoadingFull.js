import React, { useState, useRef } from 'react';
import TextQuicksand from '../../components/TextQuicksand';
import { loadingTasks } from './loadingTasks';

const LoadingFull = ({ route }) => {

    const tasks = loadingTasks[route.params.taskSet];

    const [ec, updateEC] = useState(0);

    const [taskList, setTaskList] = useState([]);

    const init = async () => {
        let tasksDone = 0;
        for (let task of tasks) {

            taskList.push(task.name);
            setTaskList([...taskList]);

            await task.exec();
            tasksDone++;
            updateEC(tasksDone);
        }
    }

    const _init = useRef(false);
    if (!_init.current) {
        init();
        _init.current = true;
    }

    return (
        <>
            <TextQuicksand>{(ec / tasks.length) * 100}%</TextQuicksand>
            {taskList.map((task, i) => {
                return <TextQuicksand key={i}>...{task}</TextQuicksand>
            })}
        </>
    );
}

export default LoadingFull;