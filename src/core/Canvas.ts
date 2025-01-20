export default class Canvas {
    private canvas: OffscreenCanvas;

    constructor() {
        this.canvas = wx.createOffscreenCanvas();
    }

    getCanvas(): OffscreenCanvas {
        return this.canvas;
    }
}
