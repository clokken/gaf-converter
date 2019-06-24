import { GafFrame } from "./gafFrame";

export class GafEntry {
    private _name: string;
    private _frames: GafFrame[];

    constructor(name: string, frames: GafFrame[]) {
        this._name = name;
        this._frames = frames;
    }

    get name() {
        return this._name;
    }

    get frames() {
        return this._frames;
    }
}
