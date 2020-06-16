import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, Dimensions, Text } from 'react-native';
import RNSVG_matches_colour from '../../res/ui/rnsvg/nav/rnsvg_matches_colour';
import BigButtonRedux from '../bigbuttonRedux';
import { gs } from '../../globals';
import { rootNavigation } from '../../rootNavigation';

function WhenMatch({ route }) {
    return (
        <View style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: '#fff',

            justifyContent: "flex-end",
            paddingBottom: 40,
        }}>
            <FastImage
                style={{
                    width: '100%',
                    height: '100%',
                    position: "absolute",
                    left: 0,
                    top: 0,
                }}
                source={{
                    uri: route.params.pic,
                }}
            />

            <View style={{
                alignItems: "center",
            }}>
                <View style={{
                    padding: 10,
                }}>
                    <Text style={{
                        textShadowColor: '#000',
                        textShadowRadius: 20,
                        color: '#fff',
                        textShadowOffset: { width: 3, height: 3 },
                        fontSize: 40,
                        textAlign: "center",
                    }}>Jij en {route.params.username} MATCHEN!</Text>
                </View>
                <View style={{
                    marginVertical: 24,
                }}>
                    {
                        [...new Array(3)].map((i) => {
                            return (
                                <View key={i} style={{ marginVertical: 4 }}>
                                    <RNSVG_matches_colour />
                                </View>
                            )
                        })
                    }
                </View>
                <BigButtonRedux style={{
                    marginBottom: 10,
                }} title={'plan een date'}
                    onPress={() => {

                    }}
                />
                <Text onPress={() => {
                    rootNavigation.navigate('MatchScreenInitial')
                }} style={[gs.underline, { marginBottom: 10, }]}>Verder swipen</Text>
            </View>

        </View>
    );
}

export default WhenMatch;