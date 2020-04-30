import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_occupation() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 13 12">
            <Path
                d="M12.622 1.6H9.166v-.4c0-.662-.513-1.2-1.143-1.2H4.977c-.63 0-1.143.538-1.143 1.2v.4H.381A.392.392 0 000 2v8.8c0 .662.513 1.2 1.143 1.2h10.714c.63 0 1.143-.538 1.143-1.2V2.008v-.001c-.015-.263-.168-.405-.378-.407zm-8.026-.4c0-.22.17-.4.38-.4h3.047c.21 0 .381.18.381.4v.4H4.596v-.4zm7.495 1.2l-1.183 3.726a.382.382 0 01-.361.274H8.404V6c0-.22-.17-.4-.38-.4H4.976a.39.39 0 00-.381.4v.4H2.453a.382.382 0 01-.361-.274L.909 2.4h11.182zm-4.448 4v.8H5.357v-.8h2.286zm4.595 4.4c0 .22-.17.4-.38.4H1.142c-.21 0-.381-.18-.381-.4V4.465l.607 1.914c.156.491.592.821 1.084.821h2.143v.4c0 .22.17.4.38.4h3.047c.21 0 .381-.18.381-.4v-.4h2.143c.492 0 .928-.33 1.084-.82l.607-1.915V10.8z"
                fill="#FFF"
                fillRule="nonzero"
            />
        </Svg>
    )
}

export default RNSVG_occupation
