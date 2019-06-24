import { Struct, MappedBuffer } from "./mappedBuffer";
import { Palette } from "./palette";

export const Utils = {
    printStruct(mappedBuffer: MappedBuffer, struct: Struct) {
        for (let key in struct.fields) {
            let index = struct.fields[key];
            let slice = struct.mapper.get(index);

            let data = mappedBuffer.at(index);
            let value = data.readIntLE(0, data.length);
            console.log(`${key}: [${slice[0]}, ${slice[1]}] ${value}`);
        }
    },

    bufferToPalette(buffer: Buffer): Palette {
        return {
            getRed(index: number) {
                return buffer[index * 3 + 0];
            },
            getGreen(index: number) {
                return buffer[index * 3 + 1];
            },
            getBlue(index: number) {
                return buffer[index * 3 + 2];
            },
            getAlpha(index: number) {
                return 255;
            },
        };
    }
};
