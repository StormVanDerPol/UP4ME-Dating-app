import React, { useRef } from 'react';
import Question from '../Question';

const InputProperties = ({ initValues = {
    sport: 0,
    party: 0,
    smoking: 0,
    alcohol: 0,
    politics: 0,
    work: 0,
    kids: 0,
    kidWish: 0,
    food: 0,
},
    onChange = (userproperties) => { }
}) => {

    const userProperties = useRef();

    const _init = useRef(false);

    if (!_init.current) {
        userProperties.current = initValues;
        _init.current = true;
    }


    return (
        <>
            <Question
                title={'Sport je?'}
                initValue={initValues.sport - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userProperties.current.sport = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Feest je?'}
                initValue={initValues.party - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userProperties.current.party = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Rook je?'}
                initValue={initValues.smoking - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userProperties.current.smoking = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Drink je alcohol?'}
                initValue={initValues.alcohol - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userProperties.current.alcohol = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Stem je?'}
                initValue={initValues.politics - 1}
                defaultValue={-1}
                headers={[
                    'Links',
                    'Midden',
                    'Rechts',
                    'Niet',
                ]}
                onChange={(output) => {
                    userProperties.current.politics = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Hoe veel uur per week werk je?'}
                initValue={initValues.work - 1}
                defaultValue={-1}
                headers={[
                    '<40 uur',
                    '40 uur',
                    '>40 uur',

                ]}
                onChange={(output) => {
                    userProperties.current.work = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Eet je gezond?'}
                initValue={initValues.food - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Af en toe',
                    'Nee',

                ]}
                onChange={(output) => {
                    userProperties.current.food = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Heb je kinderen?'}
                initValue={initValues.kids - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Nee',
                ]}
                onChange={(output) => {
                    userProperties.current.kids = output + 1;
                    onChange(userProperties.current);
                }}
            />

            <Question
                title={'Wil je kinderen?'}
                initValue={initValues.kidWish - 1}
                defaultValue={-1}
                headers={[
                    'Ja',
                    'Mischien',
                    'Nee',
                ]}
                onChange={(output) => {
                    userProperties.current.kidWish = output + 1;
                    onChange(userProperties.current);
                }}
            />
        </>
    );
}

export default InputProperties;