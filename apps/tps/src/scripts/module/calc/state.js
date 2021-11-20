class StateBox {
    constructor() {
        this.storage = new Map();

        // this.init()
    }
    get Obj() {
        return Object.fromEntries(this.storage)
    }
    updateSize() {
        const { w, h } = new SizeMaker().makeSizeItem;
        if (this.storage.get('w') !== w) {
            this.storage.set('w', w);
            console.log(`updated W: ${this.storage.get('w')}`)
        }
        if (this.storage.get('h') !== h) {
            this.storage.set('h', h);
            console.log(`updated H: ${this.storage.get('h')}`);
        }

        this.storage.set('w', w);
        this.storage.set('h', h);
        console.table(this.storage);
        return this.storage
    };

    updateState() {
        const { type, system } = StatusBox();
        this.storage.set('type', type);
        this.storage.set('system', system);
        return this.storage
    };

    updateSides() {
        const sideBox = [];
        const $sides = document.querySelectorAll('.img_side')
        for (let $el of $sides) {
            let side = $el.dataset.side;
            let $elem = document.querySelector($outputelem[side]);
            let delta = rename($elem.innerText);
            sideBox.push({
                side: side,
                name: $elem.innerText,
                delta_id: delta,
            })
        };
        this.storage.set('sides', sideBox)
        return this.storage
    };

    init() {

        this.updateState();
        this.updateSides();
        this.updateSize();
        return this.Obj
    }

}

const sb = new StateBox();