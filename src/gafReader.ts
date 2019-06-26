import { MappedBuffer } from "./mappedBuffer";
import { GAF_HEADER, ENTRY_HEADER, FRAME_POINTER_HEADER, FRAME_HEADER } from "./structs";
import { GafObject } from "./gafObject";
import { GafEntry } from "./gafEntry";
import { GafFrame } from "./gafFrame";

const POINTER_SIZE = 4; // 4 bytes
const PIXEL_SIZE = 1; // 1 byte

export const GafReader = {
    read(buffer: Buffer): GafObject {
        let gafHeader = MappedBuffer.fromBuffer(buffer, GAF_HEADER);
        let entryCount = gafHeader.valueAt(GAF_HEADER.fields.Entries);
        let entries: GafEntry[] = [];

        for (let i = 0; i < entryCount; i++) {
            let offset = GAF_HEADER.mapper.length + (i * POINTER_SIZE);
            let pointer = buffer.readIntLE(offset, POINTER_SIZE);

            entries.push(readEntry(buffer, pointer));
        }

        return new GafObject(entries);
    }
}

function readEntry(buffer: Buffer, offset: number): GafEntry {
    let entryHeader = MappedBuffer.fromBuffer(buffer,
        ENTRY_HEADER, offset);
    let nameBuffer = entryHeader.at(ENTRY_HEADER.fields.Name);
    let name = nameBuffer.toString('ascii', 0, nameBuffer.length)
        .replace(/\0/g, '').trim();
    let frameCount = entryHeader.valueAt(ENTRY_HEADER.fields.Frames);
    let frames: GafFrame[] = [];

    for (let i = 0; i < frameCount; i++) {
        let start = offset + ENTRY_HEADER.mapper.length +
            (i * FRAME_POINTER_HEADER.mapper.length);
        let framePointer = MappedBuffer.fromBuffer(buffer,
            FRAME_POINTER_HEADER, start);
        let pos = framePointer.valueAt
            (FRAME_POINTER_HEADER.fields.PtrFrameTable);

        frames.push(readFrame(buffer, pos));
    }

    return new GafEntry(name, frames);
}

function readFrame(buffer: Buffer, offset: number): GafFrame {
    let frameHeader = MappedBuffer.fromBuffer(buffer, FRAME_HEADER,
        offset);

    let width = frameHeader.valueAt(FRAME_HEADER.fields.Width);
    let height = frameHeader.valueAt(FRAME_HEADER.fields.Height);
    let posX = frameHeader.valueAt(FRAME_HEADER.fields.XPos);
    let posY = frameHeader.valueAt(FRAME_HEADER.fields.YPos);
    let ptrFrameData = frameHeader.valueAt
        (FRAME_HEADER.fields.PtrFrameData);

    let framePartsCount = frameHeader.valueAt
        (FRAME_HEADER.fields.FramePointers);

    if (framePartsCount > 0) {
        // ...then `ptrFrameData` points to a list of pointers of length `framePartsCount`, where each points to a frameHeader
        return null; // TODO
    }

    if (frameHeader.valueAt(FRAME_HEADER.fields.Compressed)) {
        return null; // TODO
    }

    let pixelBuffer = buffer.slice(ptrFrameData,
        ptrFrameData + (width * height * PIXEL_SIZE));

    return new GafFrame(width, height, posX, posY, pixelBuffer);
}
