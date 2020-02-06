import Resource from "./Resource";
import { Vector2 } from "./Struct";

export default class Sprite extends Resource {
        
    /**
     * @param {String} path Physical file path
     * @param {Array} size [Width, Height] 
     * @param {Array} offset [OffsetX, OffsetY] 
     * @param {Array} pivot [PivotX, PivotY] 
     * @param {dictionary} labels {"LABELNAME" : {x: OffsetX, y: OffsetY}, ...}
     * Offset as tiles, NOT PIXELS
     * @returns Sprite
     */
    constructor(path, size, offset=[0,0], pivot=[0.5,0.5], labels={}) {
        super(path, "img");
		/** @public */
        this.path = path;
		/** 
		 * @public
		 * @type Vector2
		 */
        this.size = new Vector2(size);
		/** 
		 * @public
		 * @type Vector2
		 */
		this.offset = new Vector2(offset);
		/**
		 * @public
		 * @type Vector2
		 */
		this.pivot = new Vector2(pivot);
		/** 
		 * @public
		 * @type SpriteLabel
		 */
		this.labels = labels;
		/** @private */
        this._element = null;
    }

    /**
	 * @public
	 * Get a sprite from the sprite sheet
	 * @param {Number} x
	 * @param {Number} y 
	 * @returns {Rect}
	 */
    getSpriteRect(x = 0, y = 0) {
        return {
            x: (this.offset.x + this.size.x) * x,
            y: (this.offset.y + this.size.y) * y,
            w: this.size.x,
            h: this.size.y
        };
    }

    /**
	 * @public
	 * Get a sprite from the sprite sheet using the label
	 * @param {SpriteLabel} label
	 * @param {Number} offsetX 
	 * @param {Number} offsetY 
	 * @returns {Rect}
	 */
    getSpriteFromLabel(label, offsetX=0, offsetY=0) {
        const l = this.labels[label.toUpperCase()];
        return this.getSpriteRect(l.x+offsetX, l.y+offsetY);
    }

    /** @type HTMLImageElement */
    get element() {return super.element; }

    load() {
        super.load();
        //this.element.style.scale = 10;
    }
}

