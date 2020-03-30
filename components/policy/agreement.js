import React from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    View,
    FlatList
} from 'react-native';

import Logo from '../logo';

import BigButton from '../bigbutton';

import { gs } from '../../globals';

import ListItem from '../listItem';

const Agreement = ({ navigation }) => {

    return (
        <>
            <ScrollView>
                <Logo />

                <Text style={[s.header, gs.mainHeader]}>Voorwaarden</Text>

                <View style={[gs.grayTextBox, s.textContainer]}>
                    <View style={s.section}>
                        <Text>Algemene voorwaarden Up4me</Text>
                        <Text>Versie: 3-3-2020</Text>
                    </View>


                    <View style={s.section}>
                        <Text style={s.section}>ARTIKEL 1 - Definities</Text>

                        <Text>In deze voorwaarden wordt verstaan onder:</Text>
                        <FlatList
                            data={[
                                { key: '1.  Up4me: de ondernemer die de in artikel 2.1 omschreven dienstverlening aanbiedt.' },
                                { key: '2.  Consument: de natuurlijke persoon die niet handelt in de uitoefening van een beroep of bedrijf en een overeenkomst voor een betaald of onbetaald Lidmaatschap aangaat met Up4me.' },
                                { key: '3.  Deelnemers: de andere Consumenten die een overeenkomst hebben gesloten met Up4me.' },
                                { key: '4.  App: het online smartphone platform waar de in artikel 2.1 omschreven dienstverlening plaatsvindt.' },
                                { key: '5.  Lidmaatschap: de overeenkomst tussen Up4me en een Consument die strekt tot het afnemen van de in artikel 2.1 omschreven dienstverlening, al dan niet tegen betaling van Lidmaatschapsgeld.' },
                                { key: '6.  Privacybeleid: het beleid van Up4me met betrekking tot de verwerking van persoonsgegevens.' },
                                { key: '7.  Content: het geplaatse meteriaal in de App door een Consument, zoals foto’s, interesses en profielbeschrijving.' },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                    </View>


                    <Text style={s.section}> ARTIKEL 2 - Dienstverlening</Text>
                    <View style={s.section}>
                        <FlatList
                            data={[
                                { key: '1.   De dienstverlening van Up4me bestaat uit het bieden van een online mogelijkheid om met andere Deelnemers, met (zelfgekozen) interesses en eigenschappen, op een date te gaan.' },
                                { key: '2.   Up4me geeft geen garantie op succes of op een relatie.' },
                                { key: '3.   Up4me is transparant over de dienstverlening die ze aanbiedt. Ze geeft vóór het aangaan van het Lidmaatschap duidelijke voorlichting over de tarieven, de automatische verlenging van het lidmaatschap, de voorwaarden en de mogelijkheden van de App zodat de Consument een goede inschatting kan maken van het aanbod.' },
                                { key: '4.   Om de doelgroep af te bakenen en de kans op succes, een date of een match te vergroten, stelt Up4me de volgende eisen aan Consumenten die van de dienstverlening gebruik willen maken:' },
                                { key: '5.   Minimale leeftijd 18 jaar.' },
                                { key: '6.   Nederlandssprekend en/of woonachtig in Nederland.' },
                                { key: '7.   De mogelijkheid tot het matchen en/of op date gaan met Deelnemers kan aan voorwaarden zijn gebonden, bijvoorbeeld de voorwaarde van het afnemen van een betaald Lidmaatschap.' },
                                { key: '8.   Indien de dienstverlening plaatsvindt tegen betaling van Lidmaatschapsgeld, is dit gebaseerd op een vast bedrag voor een bepaalde periode of op een bedrag per handeling of een combinatie hiervan. Up4me geeft hierover heldere informatie op haar App vóór het aangaan van het Lidmaatschap.' },
                                { key: '9.   Up4me kan niet instaan voor de juistheid en volledigheid van de informatie zoals beschikbaar gesteld door de Deelnemers. Deelnemers zijn zelf verantwoordelijk voor de informatie die ze via de App beschikbaar stellen.' },
                                { key: '10.   Up4me is niet verantwoordelijk voor de gedragingen van Deelnemers tijdens bijvoorbeeld een persoonlijke afspraak in aansluiting op het matchen via de App.' },
                                { key: '11.   Up4me spant zich in om de dienstverlening aan Consumenten zonder storingen te laten verlopen. Up4me kan niet instaan voor continue beschikbaarheid van de diensten.' },
                                { key: '12.   Als er onderhoud aan de App wordt verricht, dan zal Up4me dit zoveel mogelijk vooraf aankondigen en de overlast hiervan zoveel mogelijk beperken.' },
                            ]}
                            renderItem={({ item }) => <Text>{item.key}</Text>}
                        />
                    </View>


                    <View style={s.section}>
                        <Text style={s.section}>ARTIKEL 3 - Gedrag van Consumenten</Text>

                        <FlatList
                            data={[
                                { key: '1.  Het is de Consument niet toegestaan om onfatsoenlijk, onrechtmatig of in strijd met de wet te handelen of anderen hiertoe aan te zetten of aan te moedigen. Het is hem bijvoorbeeld verboden om:' },
                                { key: '    ◦ bedreigende taal te gebruiken naar Deelnemers of naar Up4me;' },
                                { key: '    ◦ onrechtmatige teksten, beeld- en/of geluidsmateriaal te plaatsen;' },
                                { key: '    ◦ teksten of beeld- en/of geluidsmateriaal te plaatsen dat inbreuk maakt op de (intellectuele eigendoms) rechten van derden.' },
                                { key: '2.  Het is de Consument bovendien niet toegestaan om:' },
                                { key: '    ◦ onwaarheden in het profiel te vermelden;' },
                                { key: '    ◦ gericht erotisch contact te zoeken of aan te bieden;' },
                                { key: '    ◦ meerdere profielen per persoon in te vullen;' },
                                { key: '    ◦ Informatie te verspreiden met commerciële doeleinden' },
                                { key: '    ◦ schade of hinder aan andere Deelnemers of Up4me toe te brengen;' },
                                { key: '    ◦ racistische of aanstootgevende uitingen te doen;' },
                                { key: '    ◦ informatie op een profiel van een andere gebruiker op enige wijze openbaar te maken, te verveelvoudigen of anderszins te (her)gebruiken zonder uitdrukkelijke toestemming van de betreffende Deelnemer;' },
                                { key: '    ◦ inloggegevens aan derden te geven, deze zijn strikt persoonlijk.' },
                                { key: '3.  Als een Consument handelt in strijd met het gestelde artikel 3.1 of 3.2 kan Up4me het Lidmaatschap van de Consument opzeggen en zijn profiel direct aanpassen, blokkeren of verwijderen. Up4me stelt de Consument op de hoogte van de blokkade of verwijdering onder vermelding van de reden.' },
                                { key: '4.  De Consument accepteert dat Up4me, als hiervoor een redelijke aanleiding bestaat, de door hem aangeleverde gegevens en het gedrag kan controleren in verband met mogelijke overtredingen van artikel 3.1 en 3.2.' },

                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                    </View>

                    <View style={s.section}>
                        <Text style={s.section}>ARTIKEL 4 - Klachten over Deelnemers en Content</Text>

                        <FlatList
                            data={[
                                { key: '1.  Een Deelnemer heeft de mogelijkheid om Content of een andere Deelnemer te rapporteren als zijnde ongepast. Indien de gerapporteerde gegevens in strijd zijn met de in in artikel 3 genoemde voorwaarden zal Up4me binnen 24 uur het materiaal verwijderen.' },
                                { key: '2.  Als Up4me een klacht ontvangt over een Deelnemer of Content, zoals het niet komen opdagen bij een date, onderzoekt zij deze klacht en neemt zij zonodig gepaste maatregelen. Up4me spant zich in om profielen van Consumenten die onwaarheden bevatten, misleidend zijn of waarvan anderszins duidelijk is dat ze schade of hinder kunnen toebrengen aan andere Deelnemers te 		verwijderen, aan te passen of te blokkeren.' },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                    </View>

                    <View style={s.section}>
                        <Text style={s.section}>ARTIKEL 5 - Bescherming persoonsgegevens</Text>

                        <FlatList
                            data={[
                                { key: '1.  Op het gebruik van Up4me is het Privacybeleid van Up4me van toepassing. Hierin staat beschreven op welke wijze de persoonsgegevens van de Consument worden verwerkt. Up4me houdt zich hierbij aan de wettelijke regels met betrekking tot bescherming van privacy en de cookie-wetgeving.' },
                                { key: '2.  Als er bij Up4me een redelijk vermoeden bestaat van overtreding van de regels in artikel 3.1 en 3.2, en andere Deelnemers ondervinden hiervan (mogelijk) schade of hinder, dan is Up4me gerechtigd om kennis te nemen van de via het aanmaken van een profiel aan Up4me verstrekte persoonsgegevens.' },

                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                    </View>

                    <View style={s.section}>
                        <Text style={s.section}>ARTIKEL 6 - Aansprakelijkheid</Text>
                        <ListItem symbol={"1."} text={"Je gebruikt onze dienst voor eigen risico. Wij zijn niet aansprakelijk voor schade die je als gevolg van het gebruik van onze dienst mocht lijden."} />
                    </View>

                    <View style={s.section}>
                        <Text style={s.section}>ARTIKEL 7 - Opzegging Consument</Text>

                        <FlatList
                            data={[
                                { key: '1.  Een betaald Lidmaatschap kan worden aangegaan voor een bepaalde periode. Na afloop van deze periode kan het Lidmaatschap stilzwijgend worden verlengd voor onbepaalde tijd. Bij stilzwijgende verlenging mag de Consument de overeenkomst te allen tijde met een opzegtermijn van ten hoogste één maand opzeggen. Up4me wijst de Consument bij het aangaan van het Lidmaatschap nadrukkelijk op deze mogelijkheid van stilzwijgende verlenging.' },
                                { key: '2.  Het betaalde Lidmaatschap is opzegbaar tegen het einde van de eerste periode en na afloop van die periode te allen tijde met een opzegtermijn van één dag.' },
                                { key: '3.  Het (betaalde) Lidmaatschap kan opgezegd worden via de App, e-mail of brief onder vermelding van het bij Up4me bekende e-mailadres. Up4me kan de Consument om verdere informatie vragen, indien dit noodzakelijk is om vast te stellen of de opzegging afkomstig is van de Consument. De Consument ontvangt op het bij Up4me bekende e-mailadres een bevestiging van zijn opzegging.' },
                                { key: '4.  Ongeacht of het (betaalde) Lidmaatschap is opgezegd, deactiveert Up4me op verzoek van de Consument te allen tijde het profiel van de Consument zo spoedig mogelijk en in ieder geval binnen twee weken na ontvangst van het verzoek hiertoe van de Consument.' },
                                { key: '5.  De Consument heeft 14 dagen na het aangaan van het Lidmaatschap de mogelijkheid om gebruik te maken van het herroepingsrecht. Als de Consument hiervan gebruik maakt, maar de Consument heeft in deze periode al daadwerkelijk gebruik gemaakt van de betaalde dienstverlening van Up4me, dan is Up4me gerechtigd om een redelijk bedrag voor de afgenomen dienstverlening in rekening te brengen. Dit bedrag is niet hoger dan het abonnementsgeld voor de periode van 1 maand. Up4me vraagt de Consument nadrukkelijk om toestemming om de dienstverlening reeds in te laten gaan voordat de herroepingstermijn is verstreken en wijst de Consument hierbij op de hoogte van het bedrag dat in rekening zal worden gebracht als de Consument toch herroept.' },
                            ]}
                            renderItem={({ item }) => <Text s={s.items}>{item.key}</Text>}
                        />
                    </View>

                    <Text style={s.section}>ARTIKEL 8 - Klachtenregeling</Text>
                    <Text>Up4me streeft ernaar binnen 3 werkdagen inhoudelijk op een ingediende klacht te antwoorden.</Text>

                </View>
                <BigButton n={navigation} component="back" text="akkoord" />
                <View style={{ marginBottom: 24 }} />
            </ScrollView>
        </>

    );
}

const s = StyleSheet.create({

    header: {
        marginHorizontal: 25,
        marginBottom: 100,
        marginTop: 50
    },

    textContainer: {
        marginBottom: 25
    },

    section: {
        marginBottom: 25
    },

    listContainer: {
        flex: 1,
        paddingTop: 10
    },

    item: {
        padding: 5,
    },
    items: {
        padding: 0.5,
    }
});

export default Agreement;