import React from 'react';
import { DATA_STORE } from '../../../stored/dataStore';
import TextQuicksand from '../../../components/TextQuicksand';

const Home = () => {
    console.log(DATA_STORE.pMatches.list)

    return (
        <>
            {


                (DATA_STORE.pMatches.list != false) ?

                    DATA_STORE.pMatches.list.map((potMatch, i) => {
                        return <TextQuicksand key={i}>{potMatch}</TextQuicksand>
                    })

                    :

                    <TextQuicksand>No potential matches</TextQuicksand>
            }
        </>
    );
}

export default Home;