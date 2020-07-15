import React from 'react';
import Body, { FlexSection } from '../../components/Body';
import { ArrowButtonRight, ArrowButtonTop } from '../../components/UpForMeArrowButtons';
import NavBar, { nbroutes } from '../../components/navBar/NavBar';

const ProfileHub = () => {
    return (
        <Body>

            <NavBar route={nbroutes.profile} />

            <FlexSection>

                <ArrowButtonTop header={'Dick'} route={''} />
                <ArrowButtonRight header={'penis'} route={''} />
                <ArrowButtonRight header={'penis'} route={''} />
                <ArrowButtonRight header={'penis'} route={''} />
                <ArrowButtonRight header={'penis'} route={''} />

            </FlexSection>
        </Body>
    );
}

export default ProfileHub;