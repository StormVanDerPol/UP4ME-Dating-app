import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { gs, up4meColours, deviceWidth, mx } from '../../globals';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import SliderMarkerWhite from '../sliderMarkerWhite';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';
import Nav from '../nav';
import Logo from '../logo';
import BigButtonRedux, { ButtonTypes } from '../bigbuttonRedux';

const RadioButtonLayouts = {
    DEFAULT: 0,
    GRAYBACK: 1,
}

const FilterRedux = ({ route }) => {

    function displayNav() {
        if (!route.params)
            return <></>;
        if (route.params.fromNav) {
            return <Nav currentSection={'Filter'} />;
        }
    }

    function displayLogo() {
        if (!route.params)
            return <Logo />;
        if (route.params.fromNav)
            return <></>;
    }

    return (

        <View style={gs.body}>

            {displayNav()}

            <ScrollView style={[gs.screenWrapperScroll]}>

                {displayLogo()}

                <SelectCriteria />



            </ScrollView>
        </View>
    )
}

const SelectCriteria = () => {

    const _userCriteria = useRef({});

    return (
        <>
            <Text style={[s.questionHeader]}>Geïnteresseerd in</Text>
            <RadioButton options={[
                'Mannen',
                'Vrouwen',
                'Iedereen',
            ]}
                layout={RadioButtonLayouts.GRAYBACK}
                canDefault={false}
                initialValue={4}
                onChange={(input) => { _userCriteria.current.prefGender = input }}
            />


            <DoubleSlider
                title={'Leeftijd'}
                initialValues={[18, 65]}
                valueRange={[18, 65]}
                onChange={(input) => { _userCriteria.current.ages = input }}
                suffix={' Years'}
            />

            <DoubleSlider
                title={'Lengte'}
                initialValues={[160, 210]}
                valueRange={[160, 210]}
                onChange={(input) => { _userCriteria.current.heights = input }}
                unit={'cm'}
            />

            <SingleSlider
                title={'Maximale afstand'}
                initialValue={25}
                unit={'km'}
                valueRange={[0, 420]}
                onChange={(input) => { _userCriteria.current.dist = input }}
            />

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand sport?</Text>
                <RadioButton options={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.sport = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand feest?</Text>
                <RadioButton options={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.party = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand rookt?</Text>
                <RadioButton options={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.smoking = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand alcohol drinkt?</Text>
                <RadioButton options={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.alcohol = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand stemt?</Text>
                <RadioButton options={[
                    'Links',
                    'Midden',
                    'Rechts',
                    'Nee',
                ]}
                    initialValue={5}
                    onChange={(input) => { _userCriteria.current.politics = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Hoeveel wil je dat iemand werkt?</Text>
                <RadioButton options={[
                    'Minder dan 40 uur',
                    '40 uur',
                    'Meer dan 40 uur',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.work = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand gezond eet?</Text>
                <RadioButton options={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.food = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand kinderen heeft?</Text>
                <RadioButton options={[
                    'Ja',
                    'Nee',
                ]}
                    initialValue={3}
                    onChange={(input) => { _userCriteria.current.kids = input }}
                />
            </View>

            <View style={s.questionContainer}>
                <Text style={s.questionHeader}>Wil je dat iemand kinderen wilt?</Text>
                <RadioButton options={[
                    'Ja',
                    'Mischien',
                    'Nee',
                ]}
                    initialValue={4}
                    onChange={(input) => { _userCriteria.current.kidWish = input }}
                />
            </View>

            <BigButtonRedux buttonType={(_userCriteria.current.prefGender != 4) ? ButtonTypes.default : ButtonTypes.disabled} />

            <Button title={'test'} onPress={() => {
                console.log(_userCriteria.current);
                Alert.alert(JSON.stringify(_userCriteria.current))
            }}></Button>
        </>
    )
}

const DoubleSlider = ({ initialValues = [0, 100], unit = '', valueRange = [0, 100], title = '', suffix = '', onChange = () => { } }) => {

    const [val, setVal] = useState(initialValues);

    useEffect(() => {
        onChange(val);
    }, [val])

    return (
        <>
            <View style={sliderStyles.header}>
                <Text>{title}</Text>
                <Text>{val[0]}{unit} - {val[1]}{unit}{suffix}</Text>
            </View>
            <View style={sliderStyles.wrapper}>
                <MultiSlider
                    customMarker={SliderMarkerWhite}
                    selectedStyle={sliderStyles.track}
                    sliderLength={deviceWidth - mx * 2 - 30}
                    values={[val[0], val[1]]} min={valueRange[0]} max={valueRange[1]}
                    onValuesChange={(output) => { setVal(output) }}
                    step={1}
                />
            </View>
        </>
    )
}

const SingleSlider = ({ initialValue = 0, unit = '', valueRange = [0, 100], title = '', suffix = '', onChange = () => { } }) => {

    const [val, setVal] = useState(initialValue);

    useEffect(() => {
        onChange(val);
    }, [val])

    return (
        <>
            <View style={sliderStyles.header}>
                <Text>{title}</Text>
                <Text>{val}{unit}{suffix}</Text>
            </View>
            <View style={sliderStyles.wrapper}>
                <MultiSlider
                    customMarker={SliderMarkerWhite}
                    selectedStyle={sliderStyles.track}
                    sliderLength={deviceWidth - mx * 2 - 30}
                    values={[val]} min={valueRange[0]} max={valueRange[1]}
                    onValuesChange={(output) => { setVal(output[0]) }}
                    step={1}
                />
            </View>
        </>
    )
}

const sliderStyles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    wrapper: {
        alignItems: "center"
    },

    track: {
        backgroundColor: up4meColours.gradPink,
    }
})

const RadioButton = ({ initialValue = -1, options = [''], layout = RadioButtonLayouts.DEFAULT, canDefault = true, onChange = () => { } }) => {

    const [selected, setSelected] = useState(initialValue);
    const [containerWidth, setContainerWidth] = useState(0);

    var layoutStyles = {};

    switch (layout) {
        case RadioButtonLayouts.GRAYBACK:
            layoutStyles = {
                btnOuter: {
                    borderRadius: 100,
                    paddingVertical: 16,
                },
                container: {
                    flexDirection: "row",
                    backgroundColor: up4meColours.picGray,
                    borderRadius: 50,
                },
            };
            break;

        default:
            layoutStyles = {
                btnOuter: {
                    borderRadius: 100,
                    paddingVertical: 16,
                    marginHorizontal: 10,
                    borderWidth: 1,
                    borderColor: up4meColours.darkGray,
                },
                container: {
                    flexDirection: 'row',
                },
            };
    }

    const Item = ({ title, itemIndex, selectedIndex }) => {
        if (itemIndex == selectedIndex) {
            return (
                <LinearGradient style={layoutStyles.btnOuter} colors={[up4meColours.gradOrange, up4meColours.gradPink]}>
                    <Text style={{ textAlign: "center", color: '#fff' }}>{title}</Text>
                </LinearGradient>
            )
        }
        else {
            return (
                <View style={[layoutStyles.btnOuter]}>
                    <Text style={{ textAlign: "center" }}>{title}</Text>
                </View>
            )
        }
    }

    useEffect(() => {
        onChange(selected);
    }, [selected])

    return (
        <View style={layoutStyles.container}
            onLayout={(e) => {
                setContainerWidth(e.nativeEvent.layout.width);
            }}
        >
            {options.map((title, i = i + 1) => {
                return (
                    <TouchableOpacity style={[{ width: containerWidth / options.length }]} onPress={() => {
                        if (selected == i && canDefault) {
                            setSelected(initialValue);
                        }
                        else {
                            setSelected(i)
                        }
                    }}>
                        <Item title={title} itemIndex={i} selectedIndex={selected} key={i} />
                    </TouchableOpacity>
                )
            })}
        </View>
    );
}

const s = StyleSheet.create({

    questionContainer: {
        marginTop: 15,
        paddingVertical: 15,
        borderColor: up4meColours.lineGray,
        borderTopWidth: 1,
    },


    questionHeader: {
        fontSize: 20,
        marginBottom: 10
    },
});

export default FilterRedux;