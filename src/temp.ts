import * as fs from "fs";
import * as path from "path";
import { GafReader } from "./gafReader";
import { FrameWriter } from "./frameWriter";
import { Utils } from "./utils";

const TEMP_DIR = './temp';

if (!fs.existsSync(TEMP_DIR)){
    fs.mkdirSync(TEMP_DIR);
}

let paletteBuffer = fs.readFileSync('./test/tar_textures.pcx');
let palette = Utils.bufferToPalette(paletteBuffer.slice(-256 * 3)); // last 768 bytes are the colors in rgb

let gafBuffer = fs.readFileSync('./test/tarmonst.gaf');
let gaf = GafReader.read(gafBuffer);

gaf.entries.forEach(entry => {
    entry.frames.forEach((frame, idx) => {
        let png = FrameWriter.makePNG(frame.frameData, frame.width, frame.height, palette);
        let file = path.join(TEMP_DIR, `${entry.name}_${idx}.png`);

        fs.writeFileSync(file, png);
    });
});
