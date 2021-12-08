//* const blabla = require('./lib/test') - шаблон для вставки модуля
//! заготовка для блока: входные данные для расчета
const test_inputData = {
    system: 'proline',
    depth: 28,
    wintype: 'fff',
    zcolor: 'Берлин(2.0)',
    ztype: 'Rollite',
    sizes: [{
            w: 600,
            h: 1400
        },
        {
            w: 600,
            h: 1400
        },
        {
            w: 1800,
            h: 1400
        }
    ],
    isFix: {
        s1: true,
        s2: true,
        s3: true
    },
}
//! заготовка для блока: результат обработки входных данных
const test_calcData = {
    glasses: [{
            w: 526,
            h: 1304
        },
        {
            w: 547,
            h: 1304
        },
        {
            w: 526,
            h: 1304
        },
    ],
    zh_sizes: [{
            w: 504,
            h: 1296
        },
        {
            w: 525,
            h: 1296
        },
        {
            w: 504,
            h: 1296
        },
    ],
    prices: [2659, 2659, 2659]
}

class InstanceBlock {
    constructor(maindata, calcdata) {
        this.inputs = this.getMainData(maindata);
        this.calced = this.getCalcedData(calcdata);
    }

    getMainData(main = test_inputData) {
        const {
            system,
            wintype,
            ztype,
            zcolor,
            sizes,
            isFix
        } = main;
        return {
            system,
            wintype,
            ztype,
            zcolor,
            sizes,
            isFix
        }
    }

    getCalcedData(calced = test_calcData) {
        const {
            glasses,
            zh_sizes,
            prices
        } = calced
        return {
            glasses,
            zh_sizes,
            prices
        }
    }
}

const testItem = new InstanceBlock(test_inputData, test_calcData);

class OutBlockZ extends InstanceBlock {
    constructor() {
        super();
    }

    makeDivBlock() {
        let mainDiv = document.createElement('div')
        const html = {
            head: '',
            body: '',
            footer: ''
        }
        const zhals = (zhlist = this.calced.zh_sizes) => zhlist.map(item => `${item.zw} x ${item.zh}`);
        const {
            system,
            ztype,
            zcolor,
            depth
        } = this.inputs;

        mainDiv.classList.add('cls-out');

        html.head = `<div class='sys-line'>${system}(${depth} mm)</div>`;


    }
}