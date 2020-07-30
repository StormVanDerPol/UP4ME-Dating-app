import React, { useState } from 'react';
import endpoints, { getEndpoint } from '../res/data/endpoints';
import TextQuicksand from '../components/TextQuicksand';
import { Button, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DATA_STORE } from '../stored/dataStore';
import { dodoFlight } from '../functions/dodoAirlines';
import { parse } from 'react-native-svg';

const DevEndpointTests = () => {

    const [url, setUrl] = useState('https://www.upforme.nl/api/v1/')
    const [method, setMethod] = useState('get');
    const [data, setData] = useState(`{"key": "value"}`)

    return (
        <>

            <View>
                <TextInput defaultValue={url} value={url} placeholder={'url'} onChangeText={(t) => {
                    setUrl(t);
                }} />
                <Button title={'Run'} onPress={async () => {

                    let parsed = JSON.parse(data);


                    await dodoFlight({
                        method: method,
                        url: url,
                        data: parsed,
                    })
                }}
                />

                <TextQuicksand>Input JSON</TextQuicksand>
                <TextInput placeholder={'json'} defaultValue={data} value={data} onChangeText={(t) => {
                    setData(t);
                }} />

                <TextQuicksand>Method: {method}</TextQuicksand>
                <Button title={'switch method'} onPress={() => {
                    setMethod((method === 'get') ? 'post' : 'get')
                }}></Button>

                <TextQuicksand>UserID: {DATA_STORE.userID}</TextQuicksand>
                <Button title={'append userid'} onPress={() => {
                    setUrl(url + DATA_STORE.userID);
                }} />
            </View>


        </>

    );
}

export default DevEndpointTests;