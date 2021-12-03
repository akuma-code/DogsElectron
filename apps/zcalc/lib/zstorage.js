//@ts-check

function getActiveState(sizes = [], prices = []) {
    const $ztype = document.getElementById('ztype');
    const $color = document.getElementById('zlist');
    const $grp = document.getElementById('zgrp');


    function counter() {
        return count++
    }

    return {
        //@ts-ignore
        id: $color.value + '-' + counter(),
        data: {
            type: $ztype.innerText,
            grp: $grp.innerText,
            size: sizes,
            price: prices
        }
    }
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
        const JSONed = JSON.stringify(zpack);
        this.saved.push(zpack);
        this.savedJSON.push(JSONed);
        return JSON.parse(JSONed)
    }

    get info() {
        const result = this.savedJSON.map(item => JSON.parse(item))
        console.log("jsoned: ", result)
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
    console.log(zitem);

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