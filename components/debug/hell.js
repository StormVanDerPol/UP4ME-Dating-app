import React, { useRef, useState, useEffect } from 'react';

import {
    StyleSheet, View, Text, Dimensions,
} from 'react-native';
import { TapGestureHandler, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Animated, { Easing, Clock, timing, Value } from 'react-native-reanimated';

import Carousel, { Pagination } from "react-native-snap-carousel";



const Hell = () => {

    const _items = useRef([
        'peenis',
        'fuck you',
        'no but why'
    ])

    const renderItem = ({ item, index }) => {

        return (

            <View key={index} style={[s.box, { backgroundColor: 'orange' }]}>
                <Text>
                    {item}
                </Text>
            </View>
        )
    }

    const [carouselIndex, setCarouselIndex] = useState(0)

    const _carousel = useRef();

    const [fu, forceUpdate] = useState(0);

    useEffect(() => {
        forceUpdate(fu + 1);
    }, [carouselIndex]);

    return (
        <>
            <Carousel
                style={{
                    borderWidth: 2,
                }}
                ref={(c) => { _carousel.current = c; }}
                layout={'default'}
                data={_items.current}
                renderItem={renderItem}
                sliderWidth={Dimensions.get('window').width}
                sliderHeight={500}
                itemHeight={200}
                itemWidth={Dimensions.get('window').width}
                scrollEnabled={false}
                onSnapToItem={(index) => setCarouselIndex(index)}
                loop={true}
            >

            </Carousel>

            <Pagination
                carouselRef={_carousel.current}
                dotsLength={_items.current.length}
                activeDotIndex={carouselIndex}

            >

            </Pagination>
            <TouchableWithoutFeedback

                onPress={() => {
                    _carousel.current.snapToNext(true);
                }}
            >
                <Text>
                    boi
                </Text>
            </TouchableWithoutFeedback>

        </>
    );
}

const s = StyleSheet.create({
    box: {
        width: Dimensions.get('window').width,
        height: 100,
    },

    itemContainer: {
        flexDirection: "row",
    }
});

export default Hell;