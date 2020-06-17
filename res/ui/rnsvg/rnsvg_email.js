import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_email() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 16 12">
            <Path
                d="M14.472.03H1.497C.672.03 0 .698 0 1.521v8.958c0 .823.672 1.493 1.497 1.493h12.975c.825 0 1.497-.67 1.497-1.493V1.522C15.969.7 15.297.03 14.472.03zm0 .995c.067 0 .132.014.19.038L7.985 6.835 1.306 1.063a.498.498 0 01.191-.038h12.975zm0 9.952H1.497a.499.499 0 01-.499-.497V2.115l6.66 5.755a.5.5 0 00.653 0l6.66-5.755v8.365a.499.499 0 01-.5.497z"
                fill="#000"
                fillRule="nonzero"
            />
        </Svg>
    )
}

export default RNSVG_email
