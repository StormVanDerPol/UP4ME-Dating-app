import React from 'react';

import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';

import Logo from '../logo';

import BigButton from '../bigbutton';

import { gs } from '../../globals';

const CookiePolicy = ({ navigation }) => {

    return (
        <View style={gs.body}>
            <ScrollView>
                <Logo />
                <Text style={[gs.mainHeader]}>Cookiebeleid</Text>

                <View style={[gs.grayTextBox, s.textContainer]}>
                    <View style={s.section}>
                        <Text>Cookiebeleid Up4me</Text>
                        <Text>Versie: 26-05–2020</Text>
                    </View>


                    <Text>Inleiding</Text>
                    <Text style={s.section}>Up4me is toegewijd aan het beschermen van jouw privacy. We streven ernaar betrouwbare, toonaangevende producten en diensten te leveren, zodat jij je kunt richten op het afspreken van leuke dates. Dit cookiebeleid behandelt niet hoe wij omgaan met uw persoonlijke informatie in het algemeen. Raadpleeg <Text style={[gs.underline, s.bold, s.bold2]} onPress={() => navigation.navigate('PrivacyPolicy')}>hier</Text> ons privacybeleid voor meer informatie over hoe we uw persoonlijke informatie verwerken.</Text>


                    <Text>Wat zijn cookies?</Text>
                    <Text style={s.section}>Cookies zijn kleine tekstbestanden die worden verzonden naar of geopend via je webbrowser of het geheugen van je apparaat. Een cookie bevat gewoonlijk de naam van het domein (internetlocatie) van waar de cookie vandaan komt, de "levensduur" van de cookie (d.w.z. wanneer deze vervalt) en een willekeurig gegenereerd uniek nummer of een soortgelijk identificatie kenmerk. Een cookie kan ook informatie over je apparaat bevatten, zoals gebruikersinstellingen, surfgeschiedenis en activiteiten die worden uitgevoerd tijdens het gebruik van onze diensten.</Text>


                    <Text>Verschillende soorten cookies</Text>
                    <Text style={s.alinea}>Er bestaan first-party cookies en third-party cookies. First-party cookies worden door ons rechtstreeks op je apparaat geplaatst. We gebruiken bijvoorbeeld first-party cookies om onze website/app aan te passen aan de taalvoorkeuren van je browser en om je gebruik van onze website/app beter te begrijpen. Third-party cookies worden op je apparaat geplaatst door onze partners en dienstverleners. We maken bijvoorbeeld gebruik van third-party cookies om gebruikersaantallen op onze website/app te meten of om je in staat te stellen inhoud met anderen te delen via sociale mediaplatforms.</Text>
                    <Text style={s.section}>Er bestaan sessie cookies en permanente cookies. Sessie cookies blijven alleen totdat jij je browser sluit. We gebruiken sessie cookies om verschillende redenen, waaronder om meer te leren over je gebruik van onze website/app tijdens één enkele browsersessie en om je te helpen onze website/app efficiënter te gebruiken. Permanente cookies hebben een langere levensduur en worden niet automatisch verwijderd wanneer jij je browser sluit. Deze soorten cookies worden voornamelijk gebruikt om je snel weer aan te melden bij onze website/app en voor analyse doeleinden</Text>


                    <Text>Andere volgtechnologieën, zoals webbakens</Text>
                    <Text style={s.section}>Andere technologieën zoals webbakens (ook wel pixeltags of clear gifs genoemd), tracking-URL's of software development kits (SDK's) worden voor soortgelijke doeleinden gebruikt. Webbakens zijn kleine grafische bestanden die een uniek identificatiemiddel bevatten dat ons in staat stelt om te herkennen wanneer iemand onze dienst heeft bezocht of een e-mail heeft geopend die we hebben verzonden. Tracking-URL's zijn op maat gemaakte links die ons helpen begrijpen waar het verkeer naar onze webpagina's vandaan komt. SDK's zijn kleine stukjes code in apps die functioneren als cookies en webbakens. Voor de eenvoud verwijzen we ook naar deze technologieën als "cookies" in dit cookiebeleid</Text>


                    <Text>Waar gebruiken we cookies voor?</Text>
                    <Text style={s.alinea}>Net als de meeste aanbieders van online diensten, gebruiken wij cookies om onze diensten te leveren, te beveiligen en te verbeteren, onder meer door jouw voorkeuren te onthouden, je te herkennen wanneer je onze website of app bezoekt en advertenties aan je interesses aan te passen en te personaliseren. Om deze doelen te bereiken, kunnen we ook informatie van cookies koppelen aan andere persoonlijke informatie die we over je bewaren. Wanneer je onze website/app bezoekt, kunnen sommige of alle van de volgende soorten cookies op jouw apparaat worden ingesteld</Text>

                    <Text>Essentiële cookies</Text>
                    <Text>Deze cookies zijn strikt noodzakelijk om je de diensten te bieden die beschikbaar zijn via onze website/app en om enkele van de functies ervan te gebruiken, zoals toegang tot beveiligde omgevingen.</Text>
                    <Text>Analytische cookies</Text>
                    <Text>Deze cookies helpen ons te begrijpen hoe onze website/app wordt gebruikt, hoe effectief marketingcampagnes zijn en helpen ons onze website/app voor je aan te passen en te verbeteren.</Text>
                    <Text>Advertentie cookies</Text>
                    <Text>Deze cookies worden gebruikt om reclameboodschappen relevanter voor je te maken. Ze voeren functies uit zoals het voorkomen dat dezelfde advertentie voortdurend terugkeert, ervoor zorgen dat advertenties correct worden weergegeven voor adverteerders, selecteren van advertenties die zijn gebaseerd op jouw interesses en meten het aantal weergegeven advertenties en hun prestaties, zoals hoeveel personen op een bepaalde advertentie hebben geklikt.</Text>
                    <Text>Sociale netwerken cookies</Text>
                    <Text style={s.section}>Deze cookies worden gebruikt om je in staat te stellen pagina's en inhoud die u op onze website/app interessant vindt te delen via sociale netwerken van derde partijen en andere websites/apps. Deze cookies kunnen ook voor reclamedoeleinden worden gebruikt.</Text>

                    <Text>Hoe kunt u cookies beheren?</Text>
                    <Text style={s.alinea}>Er zijn verschillende opties voor het beheren van cookies voor jou beschikbaar. Houd er rekening mee dat wijzigingen die jij aanbrengt in je cookie voorkeuren, het bladeren op onze website/app een minder bevredigende ervaring kunnen opleveren. In sommige gevallen kun je zelfs merken dat je niet in staat bent om onze gehele website/app of een gedeelte daarvan te gebruiken.</Text>

                    <Text style={s.alinea}>Sommige browsers bieden instellingen waarmee je cookies kunt beheren of weigeren of om je te waarschuwen wanneer een cookie op uw apparaat wordt geplaatst.  De procedure voor het beheren van cookies verschilt voor elke browser. Je kunt de specifieke stappen in het helpmenu van je eigen browser bekijken.</Text>

                    <Text style={s.alinea}>Je kunt mogelijk ook apparaat-ID's opnieuw instellen door de juiste instelling op jouw mobiele apparaat te activeren. De procedure voor het beheren van apparaat-ID's is voor elk apparaat verschillend. Je kunt de specifieke stappen in het help- of instellingenmenu van je eigen apparaat bekijken.</Text>

                    <Text style={s.section}>Op interesses gebaseerde reclame hulpprogramma’s
Je kunt zich afmelden voor op interesses gebaseerde advertenties van deelnemende bedrijven die je online worden getoond via de Digital Advertising Alliance(https://optout.aboutads.info/?lang=EN&c=2#!%2F), the Interactive Digital Advertising Alliance(https://www.youronlinechoices.com/) of Appchoices (alleen apps). Als jij je afmeldt, betekent dit niet dat je geen advertenties meer ziet. Dit betekent dat je geen gepersonaliseerde advertenties meer ziet van de bedrijven die deelnemen aan de afmeldprogramma's. Als je cookies verwijdert op jouw apparaat nadat je je hebt afgemeld, moet je je opnieuw afmelden</Text>


                    <Text>Sociale cookies</Text>
                    <Text style={s.section}>Om je in staat te stellen inhoud op sociale media te delen, gebruiken sommige functies van onze diensten plug-ins voor sociale media (bijvoorbeeld Twitter™ "Delen via Twitter" of LinkedIn™ "in"-knoppen). Afhankelijk van je instellingen voor je sociale media-account, ontvangen we automatisch informatie van het sociale mediaplatform wanneer je de overeenkomstige knop op onze website/app gebruikt. Als je meer wilt weten over cookies op sociale media, raden we je aan om het cookiebeleid en het privacybeleid van je sociale mediaplatform te raadplegen.</Text>

                    <Text>Adobe Flash Player™ Flash cookies</Text>
                    <Text style={s.section}>Adobe Flash Player™ is een toepassing voor weergave en interactie met dynamische inhoud met behulp van het Flash-platform. Flash (en soortgelijke applicaties) gebruiken een technologie die lijkt op cookies om parameters, voorkeuren en gebruik van deze inhoud te onthouden. Adobe Flash Player beheert deze informatie en uw keuzes echter via een andere interface dan die wordt geleverd door jou browser. Als het erop lijkt dat jouw terminal inhoud toont die is ontwikkeld met behulp van het Flash-platform, raden we je aan rechtstreeks je Flash-hulpprogramma's voor het beheren van cookies te openen via https://www.adobe.com.</Text>


                    <Text>Google™ cookies</Text>
                    <Text style={s.alinea}>Dingen over de technologie voor gegevensverzameling van Google waarvan Google zeker wil weten dat jij het weet. </Text>

                    <Text style={s.alinea}>Google™ maps API cookies
                    Sommige functies van onze diensten zijn afhankelijk van het gebruik van Google™ maps API cookies. Dergelijke cookies worden op je apparaat opgeslagen.Tijdens het bladeren op onze website/app en het gebruik van de diensten die afhankelijk zijn van Google™ maps API cookies, stem je in met de opslag, verzameling van dergelijke cookies op je apparaat en de toegang, het gebruik en het delen door Google van de gegevens die daarmee zijn verzameld. Google™ beheert de informatie en jouw keuzes met betrekking tot Google™ maps API cookies via een andere interface dan die wordt geleverd door jouw browser. Zie https://www.google.com/policies/technologies/cookies/ voor meer informatie </Text>
                    <Text>Google Analytics</Text>
                    <Text style={s.alinea}>We gebruiken Google Analytics, een dienst van Google die cookies en andere technologieën voor gegevensverzameling gebruikt om informatie te verzamelen over jouw gebruik van de website/app en diensten om trends te rapporteren.
                    Je kunt je afmelden voor Google Analytics door naar www.google.com/settings/ads te gaan of door de browser add-on voor afmelden van Google Analytics te downloaden op https://tools.google.com/dlpage/gaoptout.</Text>
                    <Text style={s.alinea}>Als je vragen hebt over dit cookiebeleid, kun je ons bereiken via info@upforme.nl
                    </Text>


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

});

export default CookiePolicy;