import React from 'react';
import Body, { FlexSection } from '../../../components/Body';
import TextQuicksand from '../../../components/TextQuicksand';

const RegistUserData = () => {
    return (
        <Body>
            <FlexSection>
                <TextQuicksand >Meme</TextQuicksand>
            </FlexSection>
            <FlexSection>
                <TextQuicksand >Meme</TextQuicksand>
            </FlexSection>
            <TextQuicksand style={{ borderWidth: 2 }}>Meme 2</TextQuicksand>
        </Body>
    );
}

export default RegistUserData;