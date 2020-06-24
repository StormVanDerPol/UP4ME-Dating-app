import React from 'react';
import TextQuicksand from '../TextQuicksand';
import { RegistStyles } from '../../styles/RegistStyles';

const RegistHeader = ({ children, type = 'Medium', style = {} }) => {
    return (
        <TextQuicksand type={type} style={{
            ...RegistStyles.header,
            ...style
        }}
        >
            {children}
        </TextQuicksand>
    );
}

export default RegistHeader;