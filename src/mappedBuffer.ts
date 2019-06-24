import { SliceMapper } from "./sliceMapper";

type FieldList = {[name: string]: number};

export interface Struct {
    fields: FieldList,
    mapper: SliceMapper,
}

export class MappedBuffer {
    private buffers: Buffer[];

    private constructor(buffers: Buffer[]) {
        this.buffers = buffers;
    }

    static fromBuffer(buffer: Buffer, struct: Struct, offset: number = 0): MappedBuffer {
        let buffers: Buffer[] = [];

        for (let key in struct.fields) {
            let index = struct.fields[key];
            let slice = struct.mapper.get(index);

            buffers[index] = buffer.slice(offset + slice[0], offset + slice[1]);
        }

        return new MappedBuffer(buffers);
    }

    at(index: number) {
        return this.buffers[index];
    }

    valueAt(index: number) {
        let data = this.at(index);
        return data.readIntLE(0, data.length);
    }
}
