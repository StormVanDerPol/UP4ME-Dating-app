import * as React from "react"
import Svg, { G, Text, TSpan, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_up4me_logo_login() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 92 95">
            <G fill="none" fillRule="evenodd">
                <Text
                    fontFamily="Quicksand-Light_Medium, Quicksand"
                    fontSize={27.795}
                    fontWeight={400}
                    fill="#FFF"
                    transform="translate(0 2)"
                >
                    <TSpan x={0} y={86}>
                        {"Up"}
                    </TSpan>
                    <TSpan x={36.661} y={86} letterSpacing={-0.139}>
                        {"4Me"}
                    </TSpan>
                </Text>
                <Path
                    d="M63 21.21c0 6.337-5.667 16.267-17 29.79-11.333-13.523-17-23.453-17-29.79C29 11.705 36.61 4 46 4s17 7.705 17 17.21z"
                    stroke="#FFF"
                    strokeWidth={2.6}
                />
                <Path
                    d="M46 19.509c.853-1.56 2.187-3.509 4-3.509 2.56.208 3.894 1.664 4 4.366 0 3.327-2.666 6.476-8 10.634-5.334-4.158-8-7.307-8-10.634.106-2.702 1.44-4.158 4-4.366 1.813 0 3.147 1.949 4 3.509z"
                    stroke="#FFF"
                    strokeWidth={2.6}
                />
            </G>
        </Svg>
    )
}

export default RNSVG_up4me_logo_login