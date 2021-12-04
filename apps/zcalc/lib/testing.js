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
            gw: 526,
            gh: 1304
        },
        {
            gw: 547,
            gh: 1304
        },
        {
            gw: 526,
            gh: 1304
        },
    ],
    zh_sizes: [{
            zw: 504,
            zh: 1296
        },
        {
            zw: 525,
            zh: 1296
        },
        {
            zw: 504,
            zh: 1296
        },
    ],
    prices: [2659, 2659, 2659]
}

class InstanceBlock {
    constructor(maindata, calcdata) {
        this.inputs = this.getMainData(maindata);
        this.result = this.getCalcedData(calcdata);
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