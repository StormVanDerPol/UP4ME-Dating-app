import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { rootNavigation } from '../../rootNavigation';
import { gs } from '../../globals';

//enige parameter van component is props.

const FunctionalComponent = () => {

    const [stateProperty, setStateProperty] = useState('Rinaldo');
    const _reference = useRef('Storm');
    var aVariable = 'Boxy'
    const _amountOfUpdates = useRef(0);

    useEffect(() => {

        _amountOfUpdates.current++;

    }, [stateProperty])

    return (
        <View>
            <Text>{stateProperty}</Text>
            <TextInput onChangeText={(input) => { setStateProperty(input) }} />
            <Text>{_reference.current}</Text>
            <TextInput onChangeText={(input) => { _reference.current = input }} />
            <Text>{aVariable}</Text>
            <TextInput onChangeText={(input) => { aVariable = input; }} />
            <Text>{_amountOfUpdates.current}</Text>

            <Button title={'go to login'} onPress={() => { rootNavigation.navigate('Login') }} />

            <ChildComponent style={[styles.fakeCSSClass, gs.underline]} string={'I am gay'} >

                {/*FROM HERE*/}

                <Text>I am a child exdee</Text>
                <Text>I am a child exdee</Text>

                {/*TO HERE == props.children van ChildComponent*/}

            </ChildComponent>

            <ChildComponent style={{ backgroundColor: 'pink' }} string={'I am straight'}>
                <Text>some gay shit</Text>
            </ChildComponent>

            <ChildComponent />

            <ChildComponent string={'pickle rick'} />

        </View>
    );
}

//OBJECT DECONSTRUCTING
// props = { string : 'I am gay', children : <></>, style : { backgroundColor: 'red'} }

//var {string} = props; //<---- makes 'string' standalone

//we call string instead of props.string

//string

const ChildComponent = ({ string = 'default value', children, style }) => {

    return (
        <View style={style}>
            <Text>{string}</Text>

            <View>

                {children}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    fakeCSSClass: {
        backgroundColor: 'blue',
    }

});

export default FunctionalComponent;