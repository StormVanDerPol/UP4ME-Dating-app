import React from 'react';

import {
    Text,
    ScrollView,
    View,
    StyleSheet
} from 'react-native';

import Logo from '../logo';

import BigButton from '../bigbutton';

import ListItem from '../listItem';

import { gs } from '../../globals';

const PrivacyPolicy = ({ navigation }) => {

    return (
        <View style={gs.body}>
            <ScrollView>
                <Logo />

                <Text style={[gs.mainHeader]}>Privacybeleid</Text>

                <View style={[gs.grayTextBox, s.textContainer]}>
                    <View style={s.section}>
                        <Text>Privacybeleid Up4me</Text>
                        <Text>Versie: 3-3-2020</Text>
                    </View>

                    <Text style={s.section}>Up4me, onderdeel van UpToDates, gevestigd aan Amstel 50-2, 1017AB, Amsterdam, Nederland, is verantwoordelijk voor de verzameling en verwerking van persoonsgegevens zoals weergegeven in dit privacybeleid. www.upforme.nl +31653118231</Text>

                    <Text style={s.section}>Persoonsgegevens die wij verwerken
                    Up4me verwerkt je persoonsgegevens doordat je
                    gebruik maakt van onze diensten en/of omdat je deze gegevens
                    zelf aan ons verstrekt.</Text>

                    <View style={s.section}>
                        <Text> Hieronder vind je een overzicht van de persoonsgegevens die wij verwerken: </Text>

                        <ListItem symbol="•" text="Voornaam (openbaar in app)" />
                        <ListItem symbol="•" text="Geslacht (openbaar in app)" />
                        <ListItem symbol="•" text="Foto’s (openbaar in app)" />
                        <ListItem symbol="•" text="Geboortedatum (openbaar in app)" />
                        <ListItem symbol="•" text="Leeftijd (openbaar in app)" />
                        <ListItem symbol="•" text="Woonplaats (openbaar in app)" />
                        <ListItem symbol="•" text="Telefoonnummer" />
                        <ListItem symbol="•" text="E-mailadres" />
                        <ListItem symbol="•" text="IP-adres" />
                        <ListItem symbol="•" text="Overige persoonsgegevens die je actief verstrekt door een profiel in onze app aan te maken, waaronder je profielbeschrijving, opleiding, werk, persoonlijke interesses, hobby’s en andere (zoek)voorkeuren (openbaar in app)' },
                                        { key: 'GPS Locatiegegevens" />
                        <ListItem symbol="•" text="GPS Locatiegegevens" />
                        <ListItem symbol="•" text="Gegevens over jouw activiteiten binnen onze app, zoals navigatie en apparaattype" />
                    </View>

                    <Text style={s.section}> Bijzondere en/of gevoelige persoonsgegevens die wij verwerken. Onze dienst heeft niet de intentie gegevens te verzamelen over gebruikers die jonger zijn dan 18 jaar. We kunnen echter niet controleren of een gebruiker jonger dan 18 jaar is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als u er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via info@up4me.nl, dan verwijderen wij deze informatie.</Text>

                    <View style={s.section}>
                        <Text> Up4me verwerkt de volgende bijzondere en/of gevoelige persoonsgegevens van jou:</Text>
                        <ListItem symbol="•" text="ras (mogelijk indirect via profielfoto)" />
                        <ListItem symbol="•" text="Stijl van leven" />
                        <ListItem symbol="•" text="Biometrische gegevens" />
                    </View>

                    <View style={s.section}>
                        <Text>Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken. Up4me verwerkt jouw persoonsgegevens voor de volgende doelen: </Text>
                        <ListItem symbol="•" text="Je de mogelijkheid te bieden een account aan te maken en te beheren." />
                        <ListItem symbol="•" text="Je op date te laten gaan met andere gebruikers." />
                        <ListItem symbol="•" text="Het beheren en bewaren van informatie over gebruikers." />
                        <ListItem symbol="•" text="Het versturen van app-notificaties." />
                    </View>

                    <Text style={s.section}>Hoe lang we persoonsgegevens bewaren. Up4me bewaart je persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor je gegevens worden verzameld.</Text>

                    <Text style={s.section}>Delen van persoonsgegevens met derden. Up4me deelt jouw persoonsgegevens met verschillende derden als dit noodzakelijk is voor het uitvoeren van de overeenkomst en om te voldoen aan een eventuele wettelijke verplichting. Met bedrijven die je gegevens verwerken in onze opdracht, sluiten wij een bewerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van jouw gegevens. Up4me blijft verantwoordelijk voor deze verwerkingen. Daarnaast verstrekt Up4me jouw persoons-gegevens aan andere derden. Dit doen wij alleen met jouw nadrukkelijke toestemming.</Text>

                    <Text style={s.section}>Categorie: Dienstverleners en partners .t.b.v. web- en database hosting. Doel: Data hosting en onderhoud, data analyse, klantenservice, marketing, adverteren, betalingsverkeer en beveiliging. Categorie: Andere gebruikers. Doel: Laten matchen met andere gebruikers. Gegevens: (Openbare) profielgegevens. Wettelijke verplichting. Gegevens: Alle gegevens. Categorie: Bedrijfsmatige verandering. Doel: Reorganisatie, verandering van eigenaar, faillissement, etc. Gegevens: Alle gegevens. Categorie: Met jouw toestemming of op jouw verzoek. Gegevens: Mogelijk vragen we je om gegevens te delen met derden. In dat geval maken we duidelijk waarom we deze informatie willen delen. Mogelijk delen we niet-persoonlijke informatie (geanonimiseerd) zoals device informatie die niet terug te leiden zijn tot jou persoonlijk.</Text>

                    <View style={s.section}>
                        <Text>Cookies, of vergelijkbare technieken, die wij gebruiken</Text>
                        <Text >Up4me gebruikt cookies of vergelijkbare technieken voor het verzamelen van ander soort gegevens dan persoonsgegevens. Dit zijn gegevens die er voor zorgen dat wij jouw gebruikersgemak en onze diensten kunnen verbeteren. De data waar jij ons toestemming voor geeft om te verzamelen bij het gebruik van de App zijn:</Text>
                        <ListItem symbol="•" text="Voorkeuren van de locaties om op date te gaan (als je ze een like geeft)" />
                        <ListItem symbol="•" text="De daadwerkelijke keuze van de locatie voor de date. Zie ook het meer uitgebreide cookiebeleid." />
                    </View>
                    <Text style={s.section}>Gegevens inzien, aanpassen of verwijderen. Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Dit kun je zelf doen via de persoonlijke instellingen van jouw account. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door ons bedrijf en heb je het recht op gegevens-overdraagbaarheid. Dat betekent dat je bij ons een verzoek kan indienen om de persoonsgegevens die wij van jou beschikken in een computerbestand naar jou of een ander, door jou genoemde organisatie, te sturen. Wil je gebruik maken van je recht op bezwaar en/of recht op gegevensoverdraagbaarheid of heb je andere vragen/opmerkingen over de gegevensverwerking, stuur dan een gespecificeerd verzoek naar info@up4me.nl. Om er zeker van te zijn dat het verzoek tot inzage door jou is gedaan, vragen wij jou een kopie van je identiteitsbewijs bij het verzoek mee te sturen. Maak in deze kopie je pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van je privacy. Intoo zal zo snel mogelijk, maar in ieder geval binnen vier weken, op jouw verzoek reageren. Up4me wijst je er tevens op dat je de mogelijkheid hebt om een klacht in te dienen bij de nationale toezichthouder, de Autoriteit Persoonsgegevens. Dat kan via de volgende link: https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons</Text>
                    <Text style={s.section}>Hoe wij persoonsgegevens beveiligen. Up4me neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als jij het idee hebt dat jouw gegevens toch niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met onze klantenservice of via info@upforme.nl></Text>
                </View>
                <BigButton component="back" text="terug" />
                <View style={{ marginBottom: 24 }} />
            </ScrollView>

        </View>

    );
}

const s = StyleSheet.create({


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

});

export default PrivacyPolicy;