class Animation {
    // eventName, spriteSheet, spriteCount, spritesRows, spritesCols, pixelsWidth, pixelsHeight, timeInterval
    constructor(eventName, spriteSheet, spriteRows, spriteCols, pixelsWidth, pixelsHeight, frameInterval, startFrame) {
        this.eventID = eventName;
        this.sprites = spriteSheet;
        this.rows = spriteRows;
        this.columns = spriteCols;
        this.spriteWidth = pixelsWidth;
        this.spriteHeight = pixelsHeight;
        this.frameTime = frameInterval;
        this.currentFrame = startFrame;
        this.totalFrames = spriteRows * spriteCols;
    }

    getSprite = function(index) {
        let row = index % this.spriteCols;
        let column = index / this.spriteRows;

        const subImageX = row * this.spriteWidth;
        const subImageY = column * this.spriteHeight;
        return { x: subImageX, y:subImageY };
    };

    nextFrame(ctx) {

        this.currentFrame = this.currentFrame + 1;
        const { srcX, srcY } = getSprite(this.currentFrame);
        if (this.currentFrame < this.totalFrames) {
            return null;
        }
        return { sheet: this.sprites, spriteX: srcX, spriteY: srcY, pixelsY: this.spriteHeight, pixelX: this.spriteWidth }
    }
}
