import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_clock() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 14 14">
            <G fill="#4A4A4A" fillRule="evenodd">
                <Path
                    d="M6.989 0A6.997 6.997 0 000 6.989a6.997 6.997 0 006.989 6.989 6.997 6.997 0 006.989-6.99A6.997 6.997 0 006.988 0zm0 13.104A6.122 6.122 0 01.874 6.99 6.122 6.122 0 016.989.874a6.122 6.122 0 016.115 6.115 6.122 6.122 0 01-6.115 6.115z"
                    fillRule="nonzero"
                />
                <Path d="M6.707 2.333h-.874v4.55l2.75 2.748.617-.618-2.493-2.492z" />
            </G>
        </Svg>
    )
}

export default RNSVG_clock
