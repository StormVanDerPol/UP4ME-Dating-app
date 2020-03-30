import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Logo from '../logo';
import BigButton from '../bigbutton';
import { gs } from '../../globals';

class CookiePolicy extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <ScrollView>
                    <Logo />
                    <Text style={[s.header, gs.mainHeader]}>Cookiebeleid</Text>

                    <View style={[gs.grayTextBox, s.textContainer]}>
                        <View style={s.section}>
                            <Text>Cookiebeleid Up4me</Text>
                            <Text> Versie: 3-3-2020</Text>
                        </View>


                        <Text>What Are Cookies</Text>
                        <Text style={s.section}>As in common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality. For more general information on cookies see the Wikipedia article on HTTP Cookies.</Text>

                        <Text>How We Use Cookies</Text>
                        <Text style={s.section}>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</Text>

                        <Text>Disabling Cookies</Text>
                        <Text style={s.section}>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually also disable certain functionality and features of the site. Therefore it is recommended that you do not disable cookies.</Text>

                        <Text>Cookies We Use</Text>
                        <Text style={s.section}>We use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site. This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.</Text>

                        <Text >More Information</Text>
                        <Text>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the Cookie Policy Template Generator. However if you are still looking for more information then you can contact us through one of our preferred contact methods: Email: info@up4me.nl</Text>

                    </View>
                    <BigButton text="doorgaan uwu" />
                </ScrollView>
            </>

        );
    }
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

});

export default CookiePolicy;