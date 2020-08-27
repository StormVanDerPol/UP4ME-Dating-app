import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as nsfwjs from 'nsfwjs';


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

    const buf = tf.util.encodeString(base64image, 'base64').buffer;
    const raw = new Uint8Array(buf);
    const imageTensor = decodeJpeg(raw);

    return await model.classify(imageTensor);
}