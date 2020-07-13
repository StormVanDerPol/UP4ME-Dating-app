import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import getDeviceDimensions from '../../functions/dimensions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { DATA_STORE } from '../../stored/dataStore';
import FastImage from 'react-native-fast-image';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import UpForMeIcon, { iconIndex } from '../UpForMeIcon';
import { calcAgeHet } from '../../res/data/time';
import { getDistBetweenCoords } from '../../functions/getDistBetweenCoords';
import { GPS_DATA } from '../../functions/gps';
import TextQuicksand from '../TextQuicksand';
import { dodoFlight } from '../../functions/dodoAirlines';

const _renderItem = ({ item: image, index: i }) => {
    return (
        <FastImage
            key={i}
            style={styles.carouselItem}
            source={{
                uri: image,
            }}
        />
    )
}

const ImageCarousel = ({ images }) => {

    const _carouselRef = useRef();
    const [carouselIndex, setCarouselIndex] = useState(0);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    })

    return (
        <>
            <TapGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state == State.END) {
                        _carouselRef.current.snapToNext();
                    }
                }}
            >
                <Carousel
                    data={images}
                    renderItem={_renderItem}
                    ref={(c) => {
                        _carouselRef.current = c;
                    }}
                    loop={true}
                    scrollEnabled={false}
                    onSnapToItem={(i) => {
                        setCarouselIndex(i);
                    }}
                    useScrollView={true}
                    sliderWidth={getDeviceDimensions('window', 'width')}
                    itemWidth={getDeviceDimensions('window', 'width')}
                />
            </TapGestureHandler>

            <View style={styles.paginationContainer}>

                {
                    (mounted) ?
                        <Pagination
                            tappableDots={true}
                            inactiveDotOpacity={1}
                            dotStyle={styles.paginationDot}
                            carouselRef={_carouselRef.current}
                            dotsLength={images.length}
                            activeDotIndex={carouselIndex}
                        /> : <View />
                }

            </View>
        </>
    )
}

export const MatchButtons = ({ userid, onMatch = (answer, userid) => { } }) => {

    return (
        <View style={styles.matchDecision}>
            {
                [{
                    icon: iconIndex.match_like,
                    answer: true,
                }, {
                    icon: iconIndex.match_dislike,
                    answer: false,
                }].map((item, i) => {
                    return (
                        <UpForMeIcon
                            style={styles.matchButtons}
                            key={i}
                            icon={item.icon}
                            touchable={true}
                            onPress={() => {
                                onMatch(item.answer, userid);
                            }}
                        />

                    )
                })
            }
        </View>
    );
}

const UserProfile = ({ children, userid, hideReport = false, reportCallback = () => { } }) => {

    const userData = useRef(
        deRetardify(userid)
    ).current;


    return (
        <View style={styles.bg}>
            <View style={styles.container}>
                <ImageCarousel images={userData.images} />

                {
                    (!hideReport) ?
                        <UpForMeIcon
                            icon={iconIndex.report}
                            touchable={true}
                            style={styles.reportBtn}
                            onPress={() => {
                                reportCallback();
                            }}
                        /> : <></>
                }

                <View style={styles.infoBox}>
                    <TextQuicksand style={styles.infoBoxHeader}>
                        {userData.name}, {userData.age}
                    </TextQuicksand>

                    {
                        [{
                            icon: iconIndex.location_profile,
                            data: userData.placeName,
                        }, {
                            icon: iconIndex.occupation,
                            data: userData.job,
                        }].map((item, i) => {
                            return (
                                <View key={i} style={styles.infoBoxItem}>
                                    <UpForMeIcon style={styles.infoBoxIcon} icon={item.icon} />
                                    <TextQuicksand style={styles.infoBoxText}>{item.data}</TextQuicksand>
                                </View>
                            );
                        })
                    }

                </View>
            </View>

            <View style={styles.subInfoBoxContainer}>
                {
                    [{
                        icon: iconIndex.ruler,
                        data: userData.height,
                        suffix: '',
                    }, {
                        icon: iconIndex.paperplane,
                        data: userData.dist,
                        suffix: ' km',
                    }].map((item, i) => {
                        return (
                            <View key={i} style={styles.subInfoBoxWrapper}>
                                <UpForMeIcon style={styles.subInfoIcon} icon={item.icon} />
                                <TextQuicksand style={styles.subInfoText}>{item.data}{item.suffix}</TextQuicksand>
                            </View>
                        )
                    })
                }
            </View>

            <TextQuicksand style={styles.description}>{userData.desc}</TextQuicksand>
            <View style={styles.matchProperties}>
                {
                    userData.userPropertiesDesc.map((prop, i) => {
                        return (
                            <View key={i}>
                                <TextQuicksand style={styles.matchProperty}>{prop}</TextQuicksand>
                            </View>
                        )
                    })
                }
            </View>
            <View>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    bg: {
        backgroundColor: '#fff',
    },

    container: {
        height: 600,
    },
    carouselItem: {
        width: getDeviceDimensions('window', 'width'),
        height: '100%',
    },

    paginationContainer: {
        position: "absolute",
        left: 0,
        right: 0,
    },

    paginationDot: {
        margin: -2.5,
        padding: 0,

        width: 25,
        height: 25,

        borderRadius: 100,

        backgroundColor: '#fff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,

        elevation: 5,
    },

    reportBtn: {
        position: "absolute",
        right: 20,
        bottom: 20,
        opacity: 0.7,
        width: 30,
        height: 30,
    },

    infoBox: {
        position: 'absolute',
        bottom: 20,
        left: 20
    },

    infoBoxItem: {
        alignContent: "center",
        flexDirection: "row",
        marginTop: 10
    },

    infoBoxHeader: {
        color: 'white',
        fontSize: 35,
    },
    infoBoxText: {
        fontSize: 18,
        color: 'white',
    },
    infoBoxIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    subInfoBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 32
    },

    subInfoBoxWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },

    subInfoIcon: {
        width: 17,
        height: 17,
        marginHorizontal: 8
    },

    subInfoText: {
        color: '#333',
        fontSize: 15,
    },

    description: {
        fontSize: 16,
        alignItems: 'center',
        padding: 25,
        paddingTop: 0,
        color: '#333',
    },
    matchProperties: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        flexWrap: "wrap",
        marginHorizontal: 10,
        height: 200,
    },
    matchProperty: {
        fontSize: 16,
        borderWidth: 1,
        color: '#333',
        borderColor: '#666',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    matchDecision: {
        paddingVertical: 16,
        borderTopWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 50,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    matchButtons: {
        width: 80,
        height: 80,
        marginHorizontal: 24,
    }
})

export default UserProfile;

function deRetardify(userid) {

    const data = DATA_STORE.profileCache[userid];

    let lat, lon;

    if (GPS_DATA.coords) {
        lat = GPS_DATA.coords.latitude;
        lon = GPS_DATA.coords.longitude;
    }
    else {
        lat, lon = 0;
    }

    const userData = {

        images: [],

        userProps: {
            sport: data.sporten,
            party: data.feesten,
            smoking: data.roken,
            alcohol: data.alcohol,
            politics: data.stemmen,
            work: data.uur40,
            kids: data.kids,
            kidWish: data.kidwens
        },

        name: data.naam,
        placeName: data.zoektin,
        job: data.beroep,
        height: data.lengte / 100,
        desc: data.profieltext,
        age: calcAgeHet(data.geboortedatum),
        dist: Math.round(
            getDistBetweenCoords(
                lat,
                lon,
                data.latitude,
                data.longitude,
                'K')
        ),

        userPropertiesDesc: null

    };

    let checkImages = [
        data.foto1,
        data.foto2,
        data.foto3,
        data.foto4,
        data.foto5,
        data.foto6,
    ];

    for (let image of checkImages) {
        if (image) {
            userData.images.push(image);
        }
    }

    userData.userPropertiesDesc = propDesc(userData.userProps);

    return userData;
}

function propDesc(userProps) {

    let profProps = []

    switch (userProps.sport) {
        case 1:
            profProps.push('Sport');
            break;
    }

    switch (userProps.party) {
        case 1:
            profProps.push('Feest');
            break;
    }

    switch (userProps.smoking) {
        case 1:
            profProps.push('Rookt');
            break;
        case 3:
            profProps.push('Rookt niet');
            break;
    }

    switch (userProps.alcohol) {
        case 1:
            profProps.push('Drinkt alcohol')
            break;
        case 3:
            profProps.push('Drinkt geen alcohol')
            break;
    }

    switch (userProps.politics) {
        case 1:
            profProps.push('Stemt links')
            break;
        case 2:
            profProps.push('Stemt rechts')
            break;
        case 3:
            profProps.push('Stemt rechts')
            break;
        case 4:
            profProps.push('Stemt niet')
            break;
    }

    switch (userProps.work) {
        case 1:
            profProps.push('Werkt minder dan 40 uur p/w')
            break;
        case 3:
            profProps.push('Werkt meer dan 40 uur p/w')
            break;
    }

    switch (userProps.kids) {
        case 1:
            profProps.push('Heeft kind(eren)');
            break;
        case 2:
            profProps.push('Heeft geen kinderen');
            break;
    }

    switch (userProps.kidWish) {
        case 1:
            profProps.push('Wil kinderen')
            break;
        case 3:
            profProps.push('Wil geen kinderen');
            break;
    }

    return profProps;

}