import React from 'react';
import { DATA_STORE } from '../../../stored/dataStore';
import TextQuicksand from '../../../components/TextQuicksand';
import Axios from 'axios';
import { dodoFlight } from '../../../functions/dodoAirlines';
import UserProfile from '../../../components/bigComponents/UserProfile';
import Carousel from 'react-native-snap-carousel';
import getDeviceDimensions from '../../../functions/dimensions';
import Body, { FlexSection } from '../../../components/Body';

const Home = () => {

    return (
        <>

            {/* <UserProfile userid={DATA_STORE.pMatches.list[0]} /> */}
            {/* <Dev_pMatchList /> */}
            <Body>
                <FlexSection>
                    <Carousel
                        data={DATA_STORE.pMatches.list}
                        renderItem={(userid) => {
                            return (
                                <UserProfile key={userid.index} userid={DATA_STORE.pMatches.list[userid.index]}>

                                </UserProfile>
                            )
                        }}
                        // loop={true}
                        shouldOptimizeUpdates={true}
                        // useScrollView={true}
                        sliderWidth={getDeviceDimensions('window', 'width')}
                        itemWidth={getDeviceDimensions('window', 'width')}
                    />
                </FlexSection>
            </Body>
        </>
    );
}

const Dev_pMatchList = () => {

    console.log(DATA_STORE.pMatches.list)

    return (
        <>
            {
                (DATA_STORE.pMatches.list != false) ?

                    DATA_STORE.pMatches.list.map((potMatch, i) => {

                        // dodoFlight({
                        //     method: 'get',
                        //     url: 'https://www.upforme.nl/api/v1/get/profile/' + potMatch,
                        // })

                        return <TextQuicksand key={i}>{potMatch}</TextQuicksand>
                    })

                    :

                    <TextQuicksand>No potential matches</TextQuicksand>
            }
        </>
    );
}

export default Home;