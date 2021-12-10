//@ts-check
/**@function _sizetype возвращает размеры в виде {w:w, h:h} */
function _SizeTypeSet(type = null) {
    if (!type) {
        return _SizeList()
    }
    const {
        w,
        h,
        himp,
        hlv,
        hpr,
        levo,
        pravo
    } = _SizeList();


    const select = {
        f: [{
            w: +w,
            h: +h
        }],
        ff: [{
            w: +w,
            h: +h
        }, {
            w: +w - levo,
            h: +h
        }],
        fff: [{
            w: +levo,
            h: +h
        }, {
            w: +w - levo - pravo,
            h: +h
        }, {
            w: +pravo,
            h: +h
        }],
        df: [{
            w: +w,
            h: +h,
            himp: +himp
        }, {
            w: +levo,
            h: +hpr,
        }],
        dff: [{
            w: +w,
            h: +h,
            himp: +himp
        }, {
            w: +levo - pravo,
            h: +hpr
        }, {
            w: +pravo,
            h: +hpr
        }],
        fdf: [{
                w: +levo,
                h: +hlv
            },
            {
                w: +w,
                h: +h,
                himp: +himp
            },
            {
                w: +pravo,
                h: +hpr
            }
        ],
    };

    return select[type]

}

function _SizeList() {
    let $sizes = document.getElementsByClassName("size");
    let sizepool = {};
    for (const size of $sizes) {
        //@ts-ignore
        sizepool[size.id] = size.value;
    };
    return sizepool
}

function getInstanceData() {
    const type = document.getElementById('fon').getAttribute('wintype')
    const $ztype = document.getElementById('ztype');
    const $color = document.getElementById('zlist');
    const $grp = document.getElementById('zgrp');


    const sizeset = _SizeTypeSet(type).map(item => new GLS(item.w, item.h));
    const glasses_mainS = new MainSelector()[type]();
    const glasses_OLD = glasses_mainS.map(( /** @type {Array} */ [gw, gh]) => {
        // const [gw, gh] = item
        return {
            gw: gw,
            gh: gh
        }
    })
    const zhalset = applyZs(glasses_mainS).map(([w, h]) => {
        return {
            zw: w,
            zh: h
        }
    });

    const InstData = {
        //@ts-ignore
        color: $color.value,
        type: $ztype.innerText,
        grp: $grp.innerText,
        PARTS_sizes: sizeset,
        glasses_OLD: glasses_OLD,
        zhals: zhalset
    }

    return InstData
}


class SingleZ {
    constructor({
        color = '',
        size = [],
        price = ''
    }) {
        this.color = color;
        this.size = size;
        this.price = price
    }
}
const makeZh = ({
    size,
    price,
    color
}) => new SingleZ({
    color,
    size,
    price
})

class SavedInstance {
    constructor() {
        this.saved = []
        this.savedJSON = []
    }

    save(zpack) {
        this.saved.push(zpack);
        return this.saved
    }
    get info() {

        return console.log("saved: ", this.saved)
    }
}

const zkeep = new SavedInstance()


function removeID(array = [], id = '') {
    const arrID = array.map(item => item.id);
    const removeIndex = arrID.indexOf(id);
    array.splice(removeIndex, 1);
    return array
}

const resulted = {
    id: `R01-7977`,
    color: "Аллегро(2.0)",
    size: [{
        zw: 504,
        zh: 1296
    }, {
        zw: 525,
        zh: 1296
    }, {
        zw: 504,
        zh: 1296
    }],
    price: [
        2659,
        2659,
        2659
    ]
}

function remakeZitem(zitem) {

    function count() {
        let counter = 0
        return function () {
            return counter++
        }
    }
    const idcount = count()
    const sizeToObj = ([w, h]) => {
        return {
            zw: w,
            zh: h
        }
    }
    const summ = zitem.price.reduce(( /** @type {number} */ a, /** @type {number} */ b) => a + b)
    // @ts-ignore
    const sizes = zitem.size.map(sizeArr => sizeToObj(sizeArr))
    const setid = zitem.type[0] + idcount() + '-' + summ
    const result = {
        id: setid,
        color: zitem.color,
        size: sizes,
        summ: summ
    }
    return result
}

function applyHandler(target, handler) {
    return handler.call(this, target)
}