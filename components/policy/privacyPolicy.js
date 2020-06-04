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
import { FlatList } from 'react-native-gesture-handler';

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

                    <Text>Toepassing</Text>
                    <Text style={s.section}>Dit privacybeleid is van toepassing op de website, app, evenementen en overige diensten die door Up4me worden aangeboden. Dit wordt tezamen omschreven als ‘diensten’ in dit privacybeleid. In het geval dat een dienst een eigen uniek privacybeleid vereist zal dart beleid van toepassing zijn in plaats van dit privacybeleid.</Text>

                    <View style={s.alinea}>
                        <Text>Persoongsegevens die wij verzamelen en verwerken</Text>
                        <Text style={s.alinea}>Up4me verzamelt en verwerkt je persoonsgegevens doordat je gebruik maakt van onze diensten en/of omdat je deze gegevens zelf aan ons verstrekt. Hieronder vind je een overzicht van de persoonsgegevens die wij verzamelen en verwerken:</Text>

                        <ListItem symbol="•" text="Voornaam (openbaar in app)" />
                        <ListItem symbol="•" text="Geslacht (openbaar in app)" />
                        <ListItem symbol="•" text="Lengte (openbaar in app)" />
                        <ListItem symbol="•" text="Foto’s (openbaar in app)" />
                        <ListItem symbol="•" text="Geboortedatum" />
                        <ListItem symbol="•" text="Leeftijd (openbaar in app)" />
                        <ListItem symbol="•" text="Woonplaats (openbaar in app)" />
                        <ListItem symbol="•" text="Telefoonnummer" />
                        <ListItem symbol="•" text="E-mailadres" />
                        <ListItem symbol="•" text="IP-adres" />
                        <ListItem symbol="•" text="Overige persoonsgegevens die je actief aan ons verstrekt (door een profiel in onze app aan te maken), waaronder je profielbeschrijving, opleiding, werk, persoonlijke interesses, levensstijl, hobby’s, (zoek)voorkeuren (openbaar in app)" />
                        <ListItem symbol="•" text="Als je wilt filteren op afstand, geef je ons toegang tot uw GPS Locatiegegevens" />
                        <ListItem symbol="•" text="Inhoud van profielfoto’s. Als je foto’s wilt toevoegen, geef je ons toegang tot je camera of fotoalbum." />
                        <ListItem symbol="•" text="Gegevens over jouw activiteiten binnen onze diensten, zoals navigatie en apparaat type op de app en website." />
                        <ListItem symbol="•" text="Wanneer je je abonneert op een betaalde dienst of rechtstreeks bij ons iets koopt (in plaats van via een platform zoals iOS of Android), verstrek je ons of onze betalingsdienst aanbieder informatie, zoals uw debet- of creditcardnummer of andere financiële informatie." />
                        <ListItem symbol="•" text="Wanneer je deelneemt aan enquêtes of feedback geeft, geef je ons jouw inzichten in onze producten en diensten, antwoorden op onze vragen en getuigenissen." />
                        <ListItem symbol="•" text="Wanneer je ervoor kiest deel te nemen aan onze promoties, evenementen of prijsvragen, verzamelen wij de informatie die u gebruikt voor de registratie of deelname." />
                        <ListItem symbol="•" text="Als je contact opneemt met ons, verzamelen we de informatie die je ons tijdens de communicatie geeft. We monitoren of registreren deze interacties voor trainingsdoeleinden en om een hoge kwaliteit van de dienstverlening te garanderen." />
                        <ListItem symbol="•" text="Als je ons vraagt om te communiceren met of op een andere manier informatie van andere mensen te verwerken (bijvoorbeeld als je ons vraagt om namens jou een vriend een bericht/e-mail te sturen), verzamelen we de informatie over anderen die u ons geeft om uw verzoek te voltooien" />
                    </View>

                    <View style={s.section}>
                        <Text style={s.alinea}>Up4me ontvangt ook informatie over jou van anderen, zoals:</Text>

                        <ListItem symbol="•" text="Andere gebruikers die informatie over jou verstrekken tijdens het gebruik van onze diensten, als ze contact met ons opnemen over jou of je rapporteren" />
                        <ListItem symbol="•" text="Sociale media. Als je er voor kiest om een account aan te maken bij Up4me en je aan te melden met een social media account (bijvoorbeeld facebook) geef je de mogelijkheid om informatie van je sociale media met ons te delen" />
                        <ListItem symbol="•" text="We kunnen informatie over jou ontvangen van onze partners, bijvoorbeeld waar advertenties worden gepubliceerd op een pagina van de website en platforms van een partner (in dit geval kunnen ze gegevens over het succes van een campagne doorgeven)." />
                    </View>

                    <Text style={s.alinea}>Daarnaast verzamelen en verwerken we informatie over jou gebruik van onze diensten. Bijvoorbeeld welke functies je gebruikt, hoe je deze gebruikt en via welke apparaten je dit gebruikt. Hiervan verzamelen en verwerken we het volgende:</Text>

                    <View style={s.section}>
                        <FlatList
                            data={[
                                { key: "•  We verzamelen informatie over activiteiten in onze diensten, bijvoorbeeld hoe je ze gebruikt (bijvoorbeeld de datum en tijd waarop je bent ingelogd, functies die je gebruikt, zoekopdrachten, klikken en pagina's die aan je zijn getoond, verwijzende websitepagina-adres, advertenties waarop je klikt) en de manier waarop je communiceert met andere gebruikers (bijvoorbeeld matches waarmee je communiceert, tijd en datum van uw uitwisselingen, aantal voorstellen dat je verzendt en ontvangt)" },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                        <FlatList
                            data={[
                                { key: "- hardware- en software-informatie zoals IP-adres, apparaat-ID en -type, apparaat specifieke instellingen en kenmerken, instellingen en kenmerken van apps, app-crashes, advertentie-ID's (zoals AAID van Google en IDFA van Apple; beide zijn willekeurig gegenereerde nummers die je opnieuw kunt instellen door naar de instellingen van je apparaat te gaan), browsertype, versie en taal, besturingssysteem, tijdzones, identificaties die horen bij cookies of andere technologieën die specifiek jouw apparaat of browser kunnen identificeren (bijvoorbeeld IMEI/UDID en MAC-adres)" },
                                { key: " - informatie over je draadloze en mobiele netwerkverbinding, zoals uw serviceprovider en signaalsterkte" },
                                { key: " - informatie over sensoren van het apparaat zoals versnellingsmeters, gyroscopen en kompassen." },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                        <FlatList
                            data={[
                                { key: "•  Als je ons toestemming geeft, kunnen we je precieze geografische locatie (breedte- en lengtegraad) op verschillende manieren verzamelen, afhankelijk van de dienst en het apparaat dat je gebruikt, inclusief GPS-, Bluetooth- of wifi-verbindingen. De verzameling van je geografische locatie kan op de achtergrond worden uitgevoerd, zelfs als je de diensten niet gebruikt, als de toestemming die je ons hebt gegeven deze verzameling uitdrukkelijk toestaat. Als je de toestemming weigert om jouw geografische locatie te verzamelen, zullen we deze niet verzamelen." },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                    </View>

                    <Text >Bijzondere en/of gevoelige persoonsgegevens die wij verzamelen en verwerken</Text>
                    <Text style={s.alinea}>Onze dienst heeft niet de intentie gegevens te verzamelen over gebruikers die jonger zijn dan 18 jaar. We kunnen echter niet controleren of een gebruiker jonger dan 18 jaar is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als u er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via info@upforme.nl, dan verwijderen wij deze informatie. Up4me verwerkt de volgende bijzondere en/of gevoelige persoonsgegevens van jou:</Text>

                    <View style={s.section}>
                        <FlatList
                            data={[
                                { key: "•    ras (mogelijk indirect via profielfoto)" },
                                { key: "•    Seksuele geaardheid" },
                                { key: "•    Geloofsovertuiging " },
                                { key: "•    Biometrische gegevens" },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />
                    </View>

                    <Text>Met welk doel en op basis van welke grondslag wij persoonsgegevens verzamelen en verwerken</Text>
                    <Text style={s.alinea}>Up4me verzamelt en verwerkt jouw persoonsgegevens voor de volgende doelen:</Text>

                    <View style={s.section}>

                        <FlatList
                            data={[
                                { key: "•    Je de mogelijkheid te bieden een account aan te maken en te beheren" },
                                { key: "•    Je de mogelijkheid te bieden profielen te zien die aan je voorkeuren (filters) voldoen." },
                                { key: "•    Om jouw profiel te laten zien aan andere gebruikers indien je aan hun voorkeuren voldoet." },
                                { key: "•    Om je de mogelijkheid te beiden een date af te spreken en op date te laten gaan met andere gebruikers" },
                                { key: "•    Het beheren en bewaren van informatie over gebruikers" },
                                { key: "•    Het versturen van app-notificaties" },
                                { key: "•    Om onze diensten te verbeteren en nieuwe te ontwikkelen." },
                                { key: "•    Om fraude of andere illegale of ongeoorloofde activiteiten te voorkomen, detecteren en bestrijden" },
                                { key: "•    Om wettelijke naleving te garanderen." },
                                { key: "•    Om advertenties te laten zien die mogelijk interessant voor je kunnen zijn" },
                                { key: "•    Om je te voorzien van klachtondersteuning en beantwoorden van vragen" },
                                { key: "•    Om transacties te voltooien." },
                                { key: "•    Om met je te communiceren over onze diensten" },
                                { key: "•    Om een consistente ervaring op al je apparaten te garanderen" },
                                { key: "•    Om je nieuwe Up4me-diensten aan te bieden" },

                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />

                    </View>

                    {/* <Text style={[gs.underline, s.bold, s.bold2]} onPress={() => navigation.navigate('CookiePolicy')}>Cookiebeleid</Text> */}
                    <Text>Delen van persoonsgegevens met derden</Text>
                    <Text style={s.section}>Up4me deelt jouw persoonsgegevens hoofdzakelijk met met andere gebruikers van onze diensten om het zien van elkaars profiel mogelijk te maken. Daarnaast delen wij je persoonsgegevens met verschillende derden als dit noodzakelijk is voor het uitvoeren en verbeteren van de diensten, om te voldoen aan een eventuele wettelijke verplichting of om wettelijke rechten af te dwingen. Deze derde partijen helpen ons met verschillende taken, waaronder hosting en onderhoud van gegevens, analyses, klantenservice, marketing, advertenties, betalingsverwerking en beveiligingsactiviteiten. We kunnen ook informatie delen met partners die advertenties verspreiden en ons helpen bij het adverteren voor onze diensten. Wij kunnen bijvoorbeeld beperkte informatie over jou delen in afgebroken, niet-menselijke leesbare vorm aan reclamepartners. Met bedrijven die je gegevens verwerken in onze opdracht, sluiten wij een bewerkersovereenkomst om te zorgen voor eenzelfde niveau van beveiliging en vertrouwelijkheid van jouw gegevens. Up4me blijft verantwoordelijk voor deze verwerkingen. We kunnen om toestemming vragen om jouw informatie met derden te delen. In een dergelijk geval zullen we duidelijk maken waarom we de informatie willen delen. We kunnen persoonlijke informatie die niet persoonlijk is gebruiken en delen (dit betekent informatie die op zichzelf niet identificeert wie u bent, zoals informatie over het apparaat, algemene demografie, algemene gedragsgegevens, geografische locatie in een niet identificeerbare vorm), evenals persoonlijke informatie in een gebroken niet door mensen leesbare vorm, onder een van de bovenstaande omstandigheden. Wij kunnen deze informatie ook delen met derde partijen (met name adverteerders) om gerichte reclame te ontwikkelen en leveren op onze diensten en op websites of applicaties van derde partijen, en om de reclame die je ziet te analyseren en rapporteren. We kunnen deze informatie samenvoegen met aanvullende informatie die niet persoonlijk is of persoonlijke informatie in afgebroken, niet door mensen leesbare vorm verzameld uit andere bronnen. Meer informatie over ons gebruik van cookies en soortgelijke technologieën is te vinden in ons <Text style={[gs.underline, s.bold, s.bold2]} onPress={() => navigation.navigate('CookiePolicy')}>Cookiebeleid</Text></Text>


                    <Text>Cookies, of vergelijkbare technieken, die wij gebruiken</Text>
                    <Text style={s.section}>Up4me gebruikt cookies of vergelijkbare technieken voor het verzamelen van ander soort gegevens dan persoonsgegevens. Dit zijn gegevens die er voor zorgen dat wij jou (of jouw apparaat) herkennen. Hiermee kunnen wij jou gebruikersgemak en onze diensten verbeteren. In het <Text style={[gs.underline, s.bold, s.bold2]} onPress={() => navigation.navigate('CookiePolicy')}>Cookiebeleid</Text> lees je meer informatie over hoe en waarom we cookies verzamelen</Text>


                    <Text>Gegevens inzien, aanpassen of verwijderen</Text>
                    <Text style={s.section}>Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Dit kun je zelf doen via de persoonlijke instellingen van jouw account. Daarnaast heb je het recht om je eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens door Up4me en heb je het recht op gegevensoverdraagbaarheid. Dat betekent dat je bij ons een verzoek kan indienen om de persoonsgegevens die wij van jou beschikken in een computerbestand naar jou of een ander, door jou genoemde organisatie, te sturen. Wil je gebruik maken van je recht op bezwaar en/of recht op gegevensoverdraagbaarheid of heb je andere vragen/opmerkingen over de gegevensverwerking, stuur dan een gespecificeerd verzoek naar info@upforme.nl. Om er zeker van te zijn dat het verzoek tot inzage door jou is gedaan, vragen wij jou een kopie van je identiteitsbewijs bij het verzoek mee te sturen. Maak in deze kopie je pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van je privacy. Up4me zal zo snel mogelijk, maar in ieder geval binnen vier weken, op jouw verzoek reageren. Houd er rekening mee dat we verzoeken om bepaalde redenen kunnen weigeren, bijvoorbeeld als het verzoek onwettig is of als het inbreuk kan maken op handelsgeheimen of intellectuele eigendom of de privacy van een andere gebruiker. Als u informatie wilt ontvangen over een andere gebruiker, zoals een kopie van alle berichten die u van hem of haar hebt ontvangen via onze dienst, moet de andere gebruiker contact opnemen met onze Privacy Officer om schriftelijke toestemming te geven voordat de informatie wordt vrijgegeven. Mogelijk kunnen we bepaalde verzoeken niet inwilligen om bezwaar te maken tegen de verwerking van persoonlijke informatie, met name wanneer dergelijke verzoeken ons niet langer toestaan onze dienst aan je te leveren. We kunnen onze dienst bijvoorbeeld niet verlenen als we je geboortedatum niet hebben. Up4me wijst je er tevens op dat je de mogelijkheid hebt om een klacht in te dienen bij de nationale toezichthouder, de Autoriteit Persoonsgegevens. Dat kan via de volgende link: https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons</Text>


                    <Text>Hoe wij persoonsgegevens beveiligen</Text>
                    <Text style={s.section}>Up4me neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. We controleren onze systemen regelmatig op mogelijke kwetsbaarheden en aanvallen en evalueren regelmatig onze procedures voor het verzamelen, opslaan en verwerken van informatie om onze fysieke, technische en organisatorische beveiligingsmaatregelen bij te werken. Als jij het idee hebt dat jouw gegevens toch niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met ons via info@upforme.nl</Text>

                    <Text>Hoe lang we persoonsgegevens bewaren</Text>
                    <Text style={s.alinea}>Up4me bewaart je persoonsgegevens niet langer dan nodig is om de doelen te realiseren waarvoor je gegevens worden verzameld en zoals is toegestaan door de toepasselijke wettelijke vereisten. Om de veiligheid van onze gebruikers binnen en buiten onze diensten te beschermen, hanteren we een veilig venster van drie maanden na het verwijderen van het account. Tijdens deze periode wordt accountinformatie bewaard, hoewel het account natuurlijk niet meer zichtbaar is in de diensten. In de praktijk verwijderen of anonimiseren we uw gegevens bij het verwijderen van uw account (na het venster met de bewaarplicht) of na twee jaar onafgebroken inactiviteit, tenzij:</Text>

                    <View style={s.section}>
                        <FlatList
                            data={[
                                { key: "•    we ze moeten behouden om aan de toepasselijke wetgeving te voldoen (sommige 'verkeersgegevens' worden bijvoorbeeld een jaar bewaard om te voldoen aan de wettelijke bewaarplicht voor gegevens" },
                                { key: "•    we ze moeten bewaren om aan te tonen dat we voldoen aan de toepasselijke wetgeving (zo worden bijvoorbeeld registraties van toestemmingen tot onze voorwaarden, privacybeleid en andere soortgelijke toestemmingen gedurende vijf jaar bewaard)" },
                                { key: "•    er een openstaande kwestie, claim of geschil is dat vereist dat wij de relevante informatie bewaren totdat deze is opgelost; of" },
                                { key: "•    de informatie moet worden bewaard voor onze rechtmatige zakelijke belangen, zoals fraudepreventie en het verbeteren van de veiligheid en beveiliging van gebruikers. Mogelijk moet er bijvoorbeeld informatie worden bewaard om te voorkomen dat een gebruiker die werd verbannen wegens onveilig gedrag of beveiligingsincidenten een nieuw account opent. Houd er rekening mee dat hoewel onze systemen zijn ontworpen om verwijderingsprocessen van gegevens uit te voeren volgens de bovenstaande richtlijnen, we niet kunnen beloven dat alle gegevens binnen een bepaald tijdsbestek worden verwijderd vanwege technische beperkingen" },
                            ]}
                            renderItem={({ item }) => <Text style={s.items}>{item.key}</Text>}
                        />

                    </View>


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

    alinea: {
        marginBottom: 15
    },

    items: {
        padding: 0.5,
    },

    bold: {
        fontWeight: "bold"
    },
    bold2: {
        color: 'red',
    },
});

export default PrivacyPolicy;