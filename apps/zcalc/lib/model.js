const model = {
    calc: `<input type="text" placeholder="width" class="rs_calc_w rs_size">
        <input type="text" placeholder="height" class="rs_calc_h rs_size">
        <div class="rs_calc_btn"><button onclick="calc_rs()">Calc</button></div>
        <div class="rs_calc_res" id="calc_res"></div>`,

    props(details = []) {
        const {
            type: type,
            color: color
        } = details;
        return `<div class="rs_calc_props" id="rs_props">${type}, ${color}</div>`
    }
};


class OutBlockMain {
    constructor(block = getInstanceData) {
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
            grp,
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
            return `<div class="outblock_footer">
    <button data-outbtn="load">load state</button><button data-outbtn="delete">delete</button>
        </div>`
        };

        div.insertAdjacentHTML("beforeend", _outfooter());

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
class OutContainer {
    constructor() {
        this.cont = [];
        // this.divBlocks = [];
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

    addBlock(block) {
        this.cont.push(block);
        this.getInfo()
    }


    _addListeners(elem = HTMLDivElement) {
        elem.addEventListener('click', (event) => {
            const target = event.target;
            const {
                id
            } = elem.dataset.outblock_id
            if (target.matches('[data-outbtn=delete]')) {
                elem.remove()
                this.removeBlock(elem.dataset.outblock_id)
            }
            if (target.matches('[data-outbtn=load]')) {
                console.log('LOAD');
                this.loadBlockState(elem.dataset.outblock_id)
            }
        })
        // console.log('Listeners added!')
    }
    loadBlockState(id) {
        const arrID = this.cont.map(item => item.id);
        const loadIndex = arrID.indexOf(id);


        return loadState(this.cont[loadIndex].data)
    }
    removeBlock(id) {
        const arrID = this.cont.map(item => item.id);
        const removeIndex = arrID.indexOf(id);
        this.cont.splice(removeIndex, 1);
        console.log("Deleted: ", id);
        this.updateOUT()
        return this.getInfo()
    }
    updateOUT() {
        function makeDivs(cont = this.cont) {
            const items = cont.map(item => item.HTML);
            return items
        }
        const summaryALL = this.cont.map(item => item.data.prices);
        const summ = _applyDiscount(summaryALL.reduce((a, b) => a + b));
        const $out = document.getElementById('outside');
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

const BC = new OutContainer();