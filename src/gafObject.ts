import { GafEntry } from "./gafEntry";
import { MappedBuffer } from "./mappedBuffer";

export class GafObject {
    private _entries: GafEntry[];

    constructor(entries: GafEntry[]) {
        this._entries = entries;
    }

    get entries() {
        return this._entries;
    }
}
