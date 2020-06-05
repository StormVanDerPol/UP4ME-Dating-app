import React from 'react';

import {
    StyleSheet, View, Text,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TopButton from '../topButton';

const Guidelines = () => {
    return (
        <>
            <ScrollView>


                <TopButton header={'Richtlijnen & veiligheid'} route={'UserSettings'} />

                <View style={s.contain}>
                    <Text style={s.alinea}>Je bevind je in de Up4me community. In deze community zijn we onszelf en gaan we respectvol en eerlijk met elkaar om.</Text>

                    <Text style={s.alinea}>Wat doen we niet?</Text>


                    <FlatList
                        style={s.section}
                        data={[
                            { key: "- Seksuele uitlatingen en/of naaktfoto’s op je profiel en/of tijdens een date." },
                            { key: "- Iemand beledigen, uitschelden, discrimineren of bedreigen. " },
                            { key: "- Geweld gebruiken tijdens een date, zowel fysiek niet als mentaal niet." },
                            { key: "- Privé informatie van een ander delen." },
                            { key: "- Fake accounts tolereren. Catfishes worden gebanned" },
                            { key: "- Meerdere profielen aanmaken. Één profiel per gebruiker." },
                            { key: "- Niet opdagen bij een date of te laat afzeggen. Na 2x wordt je gebanned." },

                        ]}
                        renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}

                    />


                    <Text style={s.section}>Constateer je dat iemand de regels overtreed? Rapporteer dan deze gebruiker.</Text>

                    <Text style={s.alinea}>Tips om je veiligheid te waarborgen.</Text>

                    <FlatList
                        data={[
                            { key: "- Zet geen te persoonlijke en/of gevoelige informatie op je profiel." },
                            { key: "- Vertel aan iemand waar je hebt afgesproken als je op date gaat." },
                            { key: "- Vertel geen persoonlijke en/of gevoelige informatie aan je date." },
                            { key: "- Zorg dat je weg kunt wanneer je wilt, niet thuisgebracht hoeft te worden." },
                            { key: "- Geniet, maar drink met mate. Neem niets aan van de ander (ook drugs)." },
                            { key: "- Laat geen waardevolle spullen of je glas achter als je naar het toilet gaat." },
                            { key: "- Voel je je dermate onveilig dat je bang bengt, ga weg of in nood bel 112." },

                        ]}
                        renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}

                    />

                </View>
            </ScrollView>
        </>
    );
}

const s = StyleSheet.create({

    alinea: {
        marginBottom: 15
    },
    items: {
        padding: 0.5,
    },
    section: {
        marginBottom: 25
    },
    contain: {
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
});

export default Guidelines;
