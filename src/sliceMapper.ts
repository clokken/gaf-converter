type FieldMapper = [number, number]; // index, length

export type Slice = [number, number]; // start, end

export class SliceMapper {
    private slices: Slice[]; // index = Field Enum Key (ex: IdVersion)
    private _length: number = 0;

    constructor(fields: FieldMapper[]) {
        this.slices = [];

        let offset = 0;
        let length = 0;

        for (let idx = 0; idx < fields.length; idx++) {
            let field = fields[idx];
            let key = field[0];
            let size = field[1];

            this.slices[key] = [offset, offset + size];

            offset += size;
            length += size;
        }

        this._length = length;
    }

    get(key: number) {
        return this.slices[key];
    }

    get length() {
        return this._length;
    }
}
