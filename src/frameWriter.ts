import { PNG } from "pngjs";
import { Palette } from "./palette";

export const FrameWriter = {
    makePNG(frame: Buffer, width: number, height: number, palette: Palette = null) {
        let png = new PNG({
            filterType: -1,
            width: width,
            height: height,
        });

        let read = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let idx = (width * y + x) << 2;
                let pixel = frame[read++];

                let [red, green, blue, alpha] = palette ? [
                    palette.getRed(pixel),
                    palette.getGreen(pixel),
                    palette.getBlue(pixel),
                    palette.getAlpha(pixel),
                ] : [
                    pixel,
                    pixel,
                    pixel,
                    pixel,
                ];

                png.data[idx + 0] = red;
                png.data[idx + 1] = green;
                png.data[idx + 2] = blue;
                png.data[idx + 3] = alpha;
            }
        }

        return PNG.sync.write(png);
    }
};
