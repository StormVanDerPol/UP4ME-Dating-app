import React, { useState, useRef } from 'react';
import TextQuicksand from '../../components/TextQuicksand';

const LoadingScreen = ({ tasks }) => {

    const [doneTaskCount, updateDTC] = useState(0);

    const [taskList, setTaskList] = useState([]);

    const init = async () => {
        let tasksDone = 0;
        for (let task of tasks) {

            taskList.push(task.name);
            setTaskList([...taskList]);

            await task.exec();
            tasksDone++;
            updateDTC(tasksDone);
        }
    }

    const _init = useRef(false);
    if (!_init.current) {
        init();
        _init.current = true;
    }

    return (
        <>
            <TextQuicksand>{(doneTaskCount / tasks.length) * 100}%</TextQuicksand>
            {taskList.map((task, i) => {
                return <TextQuicksand key={i}>...{task}</TextQuicksand>
            })}
        </>
    );
}

export default LoadingScreen;