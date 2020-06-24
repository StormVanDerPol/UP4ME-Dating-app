import React from 'react';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import { RegistStyles } from '../../styles/RegistStyles';

const RegistUp4MeLogo = () => {
    return (
        <UpForMeIcon style={RegistStyles.logo} icon={iconIndex.up4me_logo_colour} />
    );
}

export default RegistUp4MeLogo;