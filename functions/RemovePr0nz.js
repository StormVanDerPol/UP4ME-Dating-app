import * as tf from '@tensorflow/tfjs';
import { fetch, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as jpeg from 'jpeg-js';
import * as nsfwjs from 'nsfwjs';
import { Image } from 'react-native';


export const prepareLewd = async () => {
    await tf.ready();

    return await nsfwjs.load(
        bundleResourceIO(
            require("../nsfwModel.json"),
            require('../nsfwWeights.bin')
        )
    );
}

export const checkLewdFromBase64 = async (base64image, model) => {

    const response = await fetch(base64image).then(res => console.log(res)).catch(e => console.log(e));

    const bin = await response.blob();

    const rawImageData = await bin.arrayBuffer();
    const imageTensor = imageToTensor(rawImageData);

    return await model.classify(imageTensor);
}

export const checkLewd = async (uri, model) => {

    const imageAssetPath = Image.resolveAssetSource({ uri: uri });

    const bin = await fetch(imageAssetPath.uri, {}, { isBinary: true });

    const rawImageData = await bin.arrayBuffer();
    const imageTensor = imageToTensor(rawImageData);

    return await model.classify(imageTensor);
}


const imageToTensor = (rawImageData) => {
    const TO_UINT8ARRAY = true;
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY);
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0; // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
        buffer[i] = data[offset];
        buffer[i + 1] = data[offset + 1];
        buffer[i + 2] = data[offset + 2];

        offset += 4;
    }

    return tf.tensor3d(buffer, [height, width, 3]);
}