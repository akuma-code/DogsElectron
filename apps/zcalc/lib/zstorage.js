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
    const $system = document.getElementById('prof');
    const $gdepth = document.getElementById('gdepth')
    const $stv = ['1', '2', '3', 'd'].map(id => {
        let state = document.getElementById(`s${id}`).style.opacity || 0;
        return {
            id: 's' + id,
            state: state
        }
    })

    const sizeset = _SizeTypeSet(type).map(item => new GLS(item.w, item.h));
    const glasses_mainS = new MainSelector()[type]();

    const sizeList = _SizeList();
    //@ts-ignore
    const getPrice = (zw, zh) => new PriceCalculator().calcIt(zw, zh);
    const glasses_OLD = glasses_mainS.map(( /** @type {Array} */ [gw, gh]) => {
        return {
            gw: gw,
            gh: gh
        }
    })
    const zhalset = applyZs(glasses_mainS).map(([w, h]) => {
        return {
            zw: w,
            zh: h,
            price: getPrice(w, h)
        }
    });
    const priceset = zhalset.map(item => item.price)
    const instSumm = priceset.reduce((current, next) => next + current, 0)
    const InstData = {
        //@ts-ignore
        color: $color.value,
        wintype: type,
        fixes: $stv,
        type: $ztype.innerText,
        grp: $grp.innerText,
        // @ts-ignore
        system: $system.value,
        // @ts-ignore
        gdepth: $gdepth.value,
        PARTS_sizes: sizeset,
        glasses_OLD: glasses_OLD,
        zhals: zhalset,
        prices: instSumm,
        idSizeList: sizeList
    }

    return InstData
}



function removeID(array = [], id = '') {
    const arrID = array.map(item => item.id);
    const removeIndex = arrID.indexOf(id);
    array.splice(removeIndex, 1);
    return array
}


function countID() {
    let counter = 0
    return function () {
        return counter++
    }
}

function remakeZitem(zitem) {


    const idcount = countID()
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