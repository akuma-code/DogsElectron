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
        d: [{
            w: +w,
            h: +h,
            himp: +himp
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
    const $gdepth = document.getElementById('gdepth');

    const $stv = ['s1', 's2', 's3', 'sd'].map(id => {
        let state = document.getElementById(`${id}`).style.opacity || 0;
        return {
            id: id,
            state: state
        }
    })
    const korob = getKorob()
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
        korob: korob,
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


class OutContainer {
    constructor() {
        this.cont = [];
        this.exportCont = new TableExport();
        this.toTab = this.exportCont.expRaws;
        this.startcount = 0;
    }

    makeBlock(block = getInstanceData) {
        let n = (this.startcount++).toString()
        if (n.length == 1) n = '0' + n

        const type = block.type
        const bID = (n, type) => {
            let lett = type.toString()
            return `${n}_${(lett[0]+lett[1]+lett[2]).toUpperCase()}`
        }
        const newblock = new OutBlockMain(block);
        const tempDiv = newblock.toDIV;
        tempDiv.dataset.outblock_id = bID(n, type);

        this._addListeners(tempDiv);

        return {
            id: bID(n, type),
            data: newblock.data,
            HTML: tempDiv
        }

    }
    _copy(obj = {}) {
        return JSON.parse(JSON.stringify(obj))
    }
    addBlock(block) {
        this.cont.push(block);
        this.getInfo()
    }


    _addListeners(elem = HTMLDivElement) {
        let counted = false;
        elem.addEventListener('click', (event) => {
            const target = event.target;
            const id = elem.dataset.outblock_id

            if (target.matches('[data-outbtn=delete]')) {
                elem.remove()
                this.removeBlock(id)
                // this.removeBlock(elem.dataset.outblock_id)
            }
            if (target.matches('[data-outbtn=load]')) {
                console.log('LOAD');
                this.loadBlockState(elem.dataset.outblock_id)
                const all = Array.from(document.querySelectorAll('.outblock'));
                all.forEach(item => item.classList.remove('loaded'));
                elem.classList.add('loaded')

                // setTimeout(() => elem.classList.remove('loaded'), 5000)

            }
            if (target.matches('[data-outbtn=export]')) {
                const current = this.getBlockDataById(id);
                target.style.opacity = 0.8;
                target.style.color = '#fff'
                target.textContent = 'Добавлено';
                document.querySelector('#show_calc').style.display = 'block'
                this.exportCont.addRowToCont(current);
                this.exportCont.toExel;
                target.disabled = true;

                console.log("items to export: ", this.exportCont.expRaws.length)
            }

        })
        // console.log('Listeners added!')
    }

    loadBlockState(id) {
        return loadState(this.getBlockDataById(id))
    }

    removeBlock(id) {
        const arrID = this.cont.map(item => item.id);
        const removeIndex = arrID.indexOf(id);
        this.cont.splice(removeIndex, 1);
        console.log("Deleted: ", id);
        this.updateOUT()
        return this.getInfo()
    }
    getBlockDataById(id) {
        return this.cont.find(block => block.id === id).data
    }
    updateOUT() {
        const $out = document.getElementById('outside');

        function makeDivs(cont = this.cont) {
            const items = cont.map(item => item.HTML);
            return items
        }
        const summaryALL = this.cont.map(item => item.data.prices);

        const summ = _applyDiscount(summaryALL.reduce((a, b) => a + b, 0));
        const blocks = makeDivs(this.cont);
        $out.innerHTML = '';
        blocks.forEach(block => {
            $out.insertAdjacentElement('beforeend', block)
        })
        document.querySelector('#calc-btn').textContent = summ + ' руб.'
    }
    getInfo() {
        console.log(`BlockBox[${this.cont.length}]: `, this.cont);
        // console.log('DivBlocks: ', this.divBlocks);
    }
}


function IA(func) {
    let isadded = false;
    if (!isadded) {
        isadded = !isadded
        return func.call(this, ...args)
    }
}

class OutBlockMain extends OutContainer {
    constructor(block = getInstanceData) {
        super()
        this.data = block;
        this.toDIV;
    };

    get toDIV() {
        return this._div()
    }

    _div() {
        const div = document.createElement('div');
        div.innerHTML = '';

        function _outhead({
            system,
            gdepth
        }) {
            return `<div class = "outblock_head">
                <span>${system}</span><span>(${gdepth}мм)</span>
                </div>`
        }
        div.innerHTML += _outhead(this.data);

        function _outbody({
            color,
            zhals,
            prices
        }) {
            let discPrice = _applyDiscount(prices)
            const isDisc = document.querySelector('#isdisc').checked;

            let out = '<div class=outblock_body>';
            out += (isDisc) ? `<div class = "out_color"><span>${color}</span><span style="color:#f7f0a4">${discPrice} руб.</span></div>` :
                `<div class = "out_color"><span>${color}</span><span>${discPrice} руб.</span></div>`
            zhals.forEach(({
                zw,
                zh,
                price
            }) => {
                out += (isDisc) ? `<div class="out_sizes"><span>${zw} x ${zh} мм</span><span style="color:#ffffff">${_applyDiscount(price)} руб.</span></div>` :
                    `<div class="out_sizes"><span>${zw} x ${zh} мм</span><span>${_applyDiscount(price)} руб.</span></div>`
            })
            out += `</div>`
            return out
        }
        div.innerHTML += _outbody(this.data);

        function _outfooter() {
            const footer = document.createElement('div');
            footer.classList.add('outblock_footer')
            footer.innerHTML = `
            <button data-outbtn="export">В РДО</button>
            <button data-outbtn="load">Загрузить</button>
            <button data-outbtn="delete">Удалить</button>`

            return footer
        };

        div.insertAdjacentElement("beforeend", _outfooter());
        div.classList.add('outblock');
        // div.dataset.outblock_id = '';

        return div
    }

}

function _applyDiscount(price) {
    const rate = getDiscount();
    const isDisc = document.querySelector('input#isdisc').checked
    const result = (isDisc) ? Math.floor(price * rate) : price
    return result
}
const BC = new OutContainer();