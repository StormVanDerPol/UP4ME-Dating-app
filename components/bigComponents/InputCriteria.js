import React, { useRef } from 'react';
import Question from '../Question';
import { DoubleSliderInfo, SingleSliderInfo } from '../sliderInfo';
import { SliderMarker } from '../sliders';
import up4meColours from '../../res/data/colours';
import { View } from 'react-native';
import { RegistStyles } from '../../styles/RegistStyles';
import UpForMeBigRadioButton from '../UpForMeBigRadioButton';
import TextQuicksand from '../TextQuicksand';

const InputCriteria = ({ initValues = {
    sport: 4,
    party: 4,
    smoking: 4,
    alcohol: 4,
    politics: 5,
    work: 4,
    kids: 3,
    kidWish: 4,
    food: 4,

    ages: [25, 50],
    heights: [155, 175],
    distance: 125,

    gender: -1,
},
    onChange = (usercriteria) => { }
}) => {

    const userCriteria = useRef();

    const _init = useRef(false);

    if (!_init.current) {
        userCriteria.current = initValues;
        _init.current = true;
    }

    return (
        <>


            <View style={RegistStyles.questionContainer}>
                <TextQuicksand style={RegistStyles.questionHeader}>Geïnteresseerd in</TextQuicksand>
                <UpForMeBigRadioButton
                    active={initValues.gender - 1}
                    headers={[
                        'Mannen',
                        'Vrouwen',
                        'Iedereen'
                    ]}

                    onChange={(output) => {
                        userCriteria.current.gender = output + 1;
                        onChange(userCriteria.current);
                    }}
                />
            </View>

            <View style={RegistStyles.questionContainer}>
                <DoubleSliderInfo
                    range={[18, 88]}
                    initVals={initValues.ages}
                    step={1}
                    title={'Leeftijd'}
                    suffix={' jaar'}

                    onChange={(output) => {
                        userCriteria.current.ages = output;
                        onChange(userCriteria.current);
                    }}
                />

                <SingleSliderInfo
                    title={'Afstand'}
                    unit={' km'}
                    range={[5, 250]}
                    initVal={initValues.distance}

                    trackStyle={{ backgroundColor: up4meColours.darkGray }}
                    selectedStyle={{ backgroundColor: up4meColours.gradPink }}
                    marker={SliderMarker}

                    onChange={(output) => {
                        userCriteria.current.distance = output;
                        onChange(userCriteria.current);
                    }}

                />

                <DoubleSliderInfo
                    range={[130, 245]}
                    toDecimals={true}
                    initVals={initValues.heights}
                    step={1}
                    title={'Lengte'}
                    unit={' m'}

                    onChange={(output) => {
                        userCriteria.current.heights = output;
                        onChange(userCriteria.current);
                    }}
                />
            </View>


            <Question
                title={'Wil je dat iemand sport?'}
                initValue={initValues.sport - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                onChange={(output) => {
                    userCriteria.current.sport = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand feest?'}
                initValue={initValues.party - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',
                ]}
                onChange={(output) => {
                    userCriteria.current.party = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand rookt?'}
                initValue={initValues.smoking - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userCriteria.current.smoking = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand alcohol drinkt?'}
                initValue={initValues.alcohol - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userCriteria.current.alcohol = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand stemt?'}
                initValue={initValues.politics - 1}
                defaultValue={5}
                headers={[
                    'Links',
                    'Midden',
                    'Rechts',
                    'Niet',
                ]}
                onChange={(output) => {
                    userCriteria.current.politics = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Hoeveel wil je dat iemand werkt?'}
                initValue={initValues.work - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userCriteria.current.work = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand gezond eet?'}
                initValue={initValues.food - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userCriteria.current.food = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand kinderen heeft?'}
                initValue={initValues.kids - 1}
                defaultValue={3}
                headers={[
                    'Ja',
                    'Nee',
                ]}
                onChange={(output) => {
                    userCriteria.current.kids = output + 1;
                    onChange(userCriteria.current);
                }}
            />

            <Question
                title={'Wil je dat iemand kinderen wilt?'}
                initValue={initValues.kidWish - 1}
                defaultValue={4}
                headers={[
                    'Ja',
                    'Mischien',
                    'Nee',
                ]}
                onChange={(output) => {
                    userCriteria.current.kidWish = output + 1;
                    onChange(userCriteria.current);
                }}
            />
        </>
    );
}

export default InputCriteria;