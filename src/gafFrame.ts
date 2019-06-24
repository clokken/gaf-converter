export class GafFrame {
    private _width: number;
    private _height: number;
    private _offsetX: number;
    private _offsetY: number;
    private _frameData: Buffer;

    constructor(width: number, height: number, offsetX: number,
        offsetY: number, frameData: Buffer)
    {
        this._width = width;
        this._height = height;
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        this._frameData = frameData;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get offsetX() {
        return this._offsetX;
    }

    get offsetY() {
        return this._offsetY;
    }

    get frameData() {
        return this._frameData;
    }
}
