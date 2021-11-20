class SizeItem {
    constructor() {
        this.w = document.querySelector('#tps_w').value || 0;
        this.h = document.querySelector('#tps_h').value || 0;
        // console.count(JSON.stringify(DSO(s2.data)));
    }

};
const Map2Obj = (obj) => Object.fromEntries(obj);
const DSO = Object.fromEntries;

class Storage2 {
    constructor() {
        this.data = DataStorage;
    }

    get obj() {
        return Object.fromEntries(this.data)
    };

    glass(obj = this.data) {
        const str = JSON.stringify(Object.fromEntries(obj));
        JSON.parse(str, (key, value) => {
            if (key === "gw" || key === 'gh') console.log(`${key}: ${value}`);
        });
    }
};

const s2 = new Storage2();

class StorageModule {
    constructor() {
        this.storage = DataStorage;
    };

    get Obj() {
        const obj = Object.fromEntries(this.storage);
        return obj
    };
    item(key) {
        return this.storage.get(key)
    }
};

class DeltaCalcModule extends StorageModule {
    constructor() {
        super();
        this.init()
    }

    init() {
        const {
            w,
            h
        } = new SizeItem();


        this.storage.set('w', w)
            .set('h', h);
        return this.Obj
    }

    updateGlass() {
        const sideBox = [];
        let {
            type,
            system
        } = getState();
        if (type === 'svet') return;

        const {
            w,
            h
        } = new SizeItem();
        this.storage.set('type', type);
        this.storage.set('system', system);
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
        const deltabox = RamaStorage[type][system];
        let dw = 0;
        let dh = 0;

        sideBox.map(side => {
            if (side.side == 'top' || side.side == 'bot') dh += deltabox[side.delta_id]
            if (side.side == 'left' || side.side == 'right') dw += deltabox[side.delta_id]
        });

        const glass = {
            gw: w - Math.floor(dw),
            gh: h - Math.floor(dh)
        }

        this.storage.set('glass', glass);
        return this.Obj
    };
    updateStvMs() {
        const stv_ms = MS_STV(this.Obj);
        this.storage.set('stv_ms', stv_ms);
        return this.Obj
    };

    updateWeight(gls) {
        if (!gls) return 0;
        const {
            type
        } = getState();
        const $Welem = document.querySelector('#gweight');
        const glasses = Array.from(gls).join(',').split(',');
        const sumOfGlasses = glasses.reduce((sum, current) => sum + parseInt(current), 0);
        // console.log(sumOfGlasses);
        const weight = this.storage.get('glass') && getWeight(this.storage.get('glass'), sumOfGlasses);
        this.storage.set('weight', weight)
        return weight
    };

    updateMS() {
        getState();
        const {
            w,
            h
        } = new SizeItem();
        const glasses = Array.from($weight.value || 0).join(',').split(',');
        const sumOfGlasses = glasses.reduce((sum, current) => sum + parseInt(current), 0);
        let MS = SS(w, h);
        MS.weight = getWeight({ gw: w, gh: h }, sumOfGlasses);

        // let MS = SS(this.storage.get('w'), this.storage.get('h'));
        this.storage.set('MS', MS);
        return this.Obj
    }
}

class ListenerModule extends DeltaCalcModule {
    constructor() {
        super();
        this.add()
    }

    add() {
        const $elements = document.querySelectorAll('[data-handler]');
        for (let el of $elements) {
            const action = el.dataset.handler;
            const actionType = el.dataset.handlerType;
            if (action && actionType) {
                el.addEventListener(actionType, this[action].bind(this), true)
            }
        }
        const inputs = document.querySelectorAll('input[data-handler]');
        for (let input of inputs) {
            input.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                input.value = '';
            }, true);
            //! Костыль для того, шоб размеры обновлялись в реальном времени, по-другому чет они этого делать не хотят... */
            input.addEventListener('input', function() {
                const btnClick = () => document.querySelector(`[data-type_sel=${getState().type}]`).click();
                setTimeout(btnClick, 0)
            })

        }

    };

    updW(e) {
        let target = e.target;
        let w = target.value;
        this.storage.set('w', w);
        Send2HTML(this.Obj)
        return
    };
    updH(e) {
        let target = e.target;
        let h = target.value;
        this.storage.set('h', h)
        return Send2HTML(this.Obj)

    };

    updSizes() {
        getState();
        const { w, h } = new SizeItem();
        this.storage.set('w', w)
            .set('h', h);
        $StatusCheck.width = w;
        $StatusCheck.height = h;
        Send2HTML(this.Obj)
    };

    updSides() {
        this.updateGlass();
        this.updateStvMs();
        this.updateWeight($weight.value);
        return Send2HTML(this.Obj)
    };

    updMSCalc() {
        this.storage.set('type', 'svet');
        this.updateWeight($weight.value)
        this.updateMS();
        return Send2HTML(this.Obj)
    };

    updWeight() {
        const gls = $weight.value
        this.updateWeight(gls || null);
        Send2HTML()
        return
    }
};

new ListenerModule();

function Send2HTML(storageObj = DSO(DataStorage)) {
    $out.innerHTML = '';
    if (storageObj.type && storageObj.type !== 'svet') {
        const {
            system,
            type
        } = storageObj;
        const model = RamaOutputModel;

        model(storageObj).forEach(item => {
            const fixIgnore = ['skf', 'simple']
            if (type === 'fix' && fixIgnore.includes(item.type)) item.div = '';
            if (type === 'stv' && system === 'WHS' && item.type === 'skf') {
                item.div = '<div  style="margin-top: 20px; font-weight: 100; color: #fff"><span>#SKF на WHS не ставится!</span></div>'
            };
            $out.insertAdjacentHTML("beforeend", item.div)
        });
    };
    if (storageObj.type && storageObj.type === 'svet') {
        const model = MSoutputModel;
        model(storageObj.MS).forEach(item => {
            $out.insertAdjacentHTML("beforeend", item.div)
        });

    }
}

const MSoutputModel = (MS) => [{
        type: 'skf',
        div: `<div><span>#SKF:</span>${spanResult(MS.skf.w, MS.skf.h)}</div>`
    },
    {
        type: 'simple',
        div: `<div><span>#Простая:</span>${spanResult(MS.simple.w, MS.simple.h)}</div>`
    },
    {
        type: 'simple_whs',
        div: `<div style='margin-top: 20px'><span># на WHS:</span>${spanResult(MS.simple_whs.w, MS.simple_whs.h)}</div>`
    },
    {
        type: 'weight',
        div: `<div style='margin-top: 20px; color: #fff'><span>Вес ст/п:</span>${spanWeight(MS.weight || 0)}</div>`
    },
];

const RamaOutputModel = (sizes) => [{
    type: 'glass',
    div: `<div><span>Стеклопакет:</span>${spanResult(sizes.glass.gw, sizes.glass.gh)}</div>`
}, {
    type: 'square',
    div: `<div><span>Площадь ст/п:</span>${sqResult(sizes.glass.gw, sizes.glass.gh)}</div>`
}, {
    type: 'weight',
    div: `<div style='color: #fff'><span>Вес ст/п:</span>${spanWeight(sizes.weight || 0)}</div>`
}, {
    type: 'shtap',
    div: `<div><span>Штапик:</span>${spanResult(sizes.glass.gw+10, sizes.glass.gh+10)}</div>`
}, {
    type: 'skf',
    div: `<div style='margin-top: 20px'><span>#SKF:</span>${spanResult(sizes.stv_ms.skf.w, sizes.stv_ms.skf.h)}</div>`
}, {
    type: 'simple',
    div: `<div><span>#М/С:</span>${spanResult(sizes.stv_ms.simple.w, sizes.stv_ms.simple.h)}</div>`
}, ];