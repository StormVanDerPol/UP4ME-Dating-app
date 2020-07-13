import React, { useState } from 'react';
import { DATA_STORE } from '../../../stored/dataStore';
import TextQuicksand from '../../../components/TextQuicksand';
import Axios from 'axios';
import { dodoFlight } from '../../../functions/dodoAirlines';
import UserProfile, { MatchButtons } from '../../../components/bigComponents/UserProfile';
import Carousel from 'react-native-snap-carousel';
import getDeviceDimensions from '../../../functions/dimensions';
import Body, { FlexSection } from '../../../components/Body';

const Home = () => {

    // const [matchList, setMatchList] = useState(DATA_STORE.pMatches.list);
    const [matchList, setMatchList] = useState(DATA_STORE.pMatches.list);

    return (
        <Body>
            <FlexSection>
                <Carousel
                    data={matchList}
                    renderItem={(userid) => {

                        return (
                            <>
                                <UserProfile key={userid.index} userid={userid.item}>

                                </UserProfile>

                                <MatchButtons userid={userid.item} onMatch={(answer, mUserid) => {
                                    // await dodoFlight({
                                    //     method: 'post',
                                    //     url: 
                                    // });

                                    console.log('match button', mUserid, userid.item)

                                    // console.log(matchList.splice(userid.index, 1));
                                    // setMatchList([...matchList]);

                                }} />

                            </>
                        )
                    }}
                    // layout={"tinder"}
                    // loop={true}
                    shouldOptimizeUpdates={true}
                    // useScrollView={true}
                    sliderWidth={getDeviceDimensions('window', 'width')}
                    itemWidth={getDeviceDimensions('window', 'width')}
                />
            </FlexSection>

        </Body>
    );
}

export default Home;