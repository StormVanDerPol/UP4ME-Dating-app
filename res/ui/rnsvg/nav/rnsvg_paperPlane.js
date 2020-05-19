import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function RNSVG_paperPlane() {
    return (
        <Svg width={'100%'} height={'100%'} viewBox="0 0 12 10">
            <Path
                d="M.122 2.997L4.48 5.274l1.078 4.554c.019.08.088.142.175.155a.22.22 0 00.219-.097L11.955.32a.19.19 0 00-.007-.22l-.003-.004a.216.216 0 00-.167-.08V.014c-.02 0-.04.002-.06.007L.177 2.628a.206.206 0 00-.162.167.196.196 0 00.107.202zm5.735 6.247l-.95-4.018L11.056.961 5.857 9.244zM10.8.64L4.651 4.905.808 2.897 10.8.64z"
                fill="#000"
                fillRule="nonzero"
            />
        </Svg>
    )
}

export default RNSVG_paperPlane
