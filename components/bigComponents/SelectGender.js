import React, { useState } from 'react';
import BigButtonColor from '../BigButtonColor';
import UpForMeSwitch from '../UpForMeSwitch';

const SelectGender = () => {

    const [selected, setSelected] = useState(-1)

    const genders = [
        'Man',
        'Vrouw',
        'AH-64 Apache Attack Helicopter',
    ];

    return (
        <>
            {genders.map((gender, i) => {
                return (
                    <BigButtonColor
                        key={i}
                        onPress={() => {
                            setSelected((selected == i) ? -1 : i)
                        }}
                        active={(selected == i)}
                        header={gender}
                    />
                )
            })}

            <UpForMeSwitch active={(selected == 4)} onPress={() => {
                setSelected(4);
            }} />
        </>
    );
}

export default SelectGender;