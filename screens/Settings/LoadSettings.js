import React from 'react';
import LoadingScreen from '../loading/LoadingScreen';

const LoadSettings = () => {

    const tasks = [
        {
            name: 'what am I doing',
            exec: async () => {

            }
        }
    ]

    return (
        <LoadingScreen tasks={tasks} />
    );
}

export default LoadSettings;