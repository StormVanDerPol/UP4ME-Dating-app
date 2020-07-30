import React, { useState, useRef } from 'react';
import TextQuicksand from '../../components/TextQuicksand';
import Body from '../../components/Body';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import up4meColours from '../../res/data/colours';
import getDeviceDimensions from '../../functions/dimensions';

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

        /*old layout*/

        // <>
        //     <TextQuicksand>{(doneTaskCount / tasks.length) * 100}%</TextQuicksand>
        //     {taskList.map((task, i) => {
        //         return <TextQuicksand key={i}>...{task}</TextQuicksand>
        //     })}
        // </>

        <Body>
            <View style={{
                flex: 1,
            }} />

            <TextQuicksand
                style={{
                    textAlign: 'center',
                }}
            >Loading... {Math.round((doneTaskCount / tasks.length) * 100)}%</TextQuicksand>
            <LinearGradient
                colors={[
                    up4meColours.gradOrange,
                    up4meColours.gradPink,
                ]}
                start={{
                    x: 0,
                    y: 0,
                }}
                end={{
                    x: 1,
                    y: 0,
                }}
                style={{

                    width: (doneTaskCount / tasks.length) * (getDeviceDimensions('window', 'width')),

                    height: 16,
                    opacity: 0.5,
                }} />

        </Body>
    );
}

export default LoadingScreen;