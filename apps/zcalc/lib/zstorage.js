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

// zkeep.save(makeZh(myZ1))
// zkeep.save(makeZh(myZ2))