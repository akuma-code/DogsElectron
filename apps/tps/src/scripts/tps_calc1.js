// @ts-check
class MainTPSItem {

    constructor() {
        // console.count('Base item created')
        this.size;
        this.state;
        this.system;
    }


    get size() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        return {
            w,
            h
        }
    };
    /**
     * ! Определяет состояние по значению атрибута активной кнопки(.active)
     */

    get state() {
        const activeButton = document.querySelector('div.tgl_big_box');
        //@ts-ignore
        const state = `${activeButton.dataset.tglStatus}` || 'state undefined';
        return state

    };
    get system() {
        const sys = document.querySelector('span[output=system]');
        return sys.textContent
    };

    rename(text = '') {
        const dictionary = {
            'импост': 'di',
            'рама': 'dr',
            'порог': 'd_porog',
            'штульп': 'd_shtulp',
            ['импост в створке']: 'di_stv',
            ['световой проем']: 'svet'
        }
        if (!dictionary[text]) return
        return dictionary[text]
    };

    toHTML() {
        console.count('Метод toHTML должен быть явно задан в классе наследнике!');
        return alert('Метод toHTML должен быть явно задан в классе наследнике!')
    }
};


/**
 * !Размеры сеток по световому проему
 */
class LightCalc extends MainTPSItem {
    constructor() {
        super();
        console.count('LightCalc created');
        this.toHTML(this.output)
            // this.skf;
            // this.simple
    }

    get skf() {
        if (this.system === 'WHS') console.log('SKF unaviable at WHS!!');
        const inputsizes = this.size,
            dw = -45,
            dh = -47;
        let result = {
            skfW: inputsizes.w + dw,
            skfH: inputsizes.h + dh
        };
        return result
    };
    get simple() {
        const delta = (this.system === 'WHS') ? {
            dw: 24,
            dh: 45
        } : {
            dw: 46,
            dh: 46
        };
        let inputsizes = this.size,

            result = {
                msW: inputsizes.w + delta.dw,
                msH: inputsizes.h + delta.dh
            };
        return result
    }

    get output() {
        const { msW, msH } = this.simple;
        const { skfW, skfH } = this.skf;
        const MS = `<span>М/С:</span><span>${msW}мм x ${msH}мм</span>`,
            SKF = `<span>М/С SKF:</span><span>${skfW}мм x ${skfH}мм</span>`;

        const $elems = {
            type: 'ms',
            items: [{
                id: '#ms_simple',
                output: MS
            }, {
                id: '#ms_skf',
                output: SKF
            }]
        };
        return $elems
    };

    toHTML(content = {}) {
        content.items.forEach(element => {
            const target = document.querySelector(element.id);
            target.innerHTML = '';
            target.insertAdjacentHTML("beforeend", element.output)
        })
    };
}

/**
 *  ! Остальные расчеты по раме со створкой и без
 */
class StvFixCalc extends MainTPSItem {
    constructor() {
        super();
        console.count('StvFixCalc created');
        this.toHTML(this.output)
    };

    get pick_delta() {
        const result = {};
        for (let direction of $sides) {
            //@ts-ignore
            let side = direction.dataset.side;
            let $elem = document.querySelector($outputelem[side]);
            let delta = this.rename($elem.innerText);
            let dSt = BigStorage[this.state][this.system];
            // debugger
            result[side] = dSt[delta];
        }
        return result
    };

    Glass_Shtap(w = this.size.w, h = this.size.h) {

        const {
            left,
            right,
            top,
            bot
        } = this.pick_delta;
        // debugger
        const dw = +left + right;
        const dh = +top + bot;
        const result = {
            glW: w - dw,
            glH: h - dh,
            shtW: w + 10 - dw,
            shtH: w + 10 - dh,
        };

        return result
    };
    get output() {
        const { glW, glH } = this.Glass_Shtap();
        const { shtW, shtH } = this.Glass_Shtap();
        const glsOut = `<span>Стеклопакет:</span><span>${glW}мм x ${glH}мм</span>`;
        const shtOut = `<span>Штапик:</span><span>${shtW}мм x ${shtH}мм</span>`;

        const $elems = {
            type: 'gls',
            items: [{
                id: '#out_glass',
                output: glsOut
            }, {
                id: '#out_shtap',
                output: shtOut
            }]
        };
        return $elems
    };

    toHTML(content = {}) {
        content.items.forEach(element => {
            const target = document.querySelector(element.id);
            target.innerHTML = '';
            target.insertAdjacentHTML("beforeend", element.output)
        })
    };

}


function updateOutput() {
    const $bigBoxBtn = document.querySelector('div.tgl_big_box');
    //@ts-ignore
    const state = `${$bigBoxBtn.dataset.tglStatus}`;
    const calculator = (state === 'svet') ? new LightCalc() : new StvFixCalc();

    return calculator
}