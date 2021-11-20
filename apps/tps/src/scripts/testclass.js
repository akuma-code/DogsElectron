class SizeMaker {
    constructor() {
        console.count('sizemaker#')
        this.options = getState();
        // this.makeSizeItem;
    }

    get makeSizeItem() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        const item = new SizeItem(w, h, this.options);
        // console.log({ item });
        console.count('makeSizeItem ')
        return item
    };
}

class Manipulator {
    constructor() {
        console.count('manipulator')
        this.itemSize = {};
        this.delta_dwdh = {};
    }
    create() {
        this.itemSize = new SizeMaker().makeSizeItem;
        this.delta_dwdh = this.select_dwdh();
        return
    }

    updateSize() {
        //@ts-ignore
        const w = +document.querySelector('input#tps_w').value;
        //@ts-ignore
        const h = +document.querySelector('input#tps_h').value;
        this.itemSize.w = w || 0;
        this.itemSize.h = h || 0;
        console.log('updateSize()')
        return this.itemSize
    };



    convert() {
        return dwdh(this.delta_dwdh)
    };

    get info() {
        const info = {
            item: this.itemSize,
            // dwdh: dwdh(this.select().deltaRama()),
            delta: this.delta_dwdh,
        };
        console.table(info.delta);
        return info
    };

    select_dwdh() {
        // debugger;
        const {
            type
        } = getState();
        if (type === 'svet') {
            const skf = RamaStorage.dwdh_s('skf')[0];
            const simple = RamaStorage.dwdh_s('simple')[0];
            const whs = RamaStorage.dwdh_s('whs')[0];
            const items = {
                skf,
                simple,
                whs
            };
            return items
        }
        if (type === 'stv') {
            return new dBox().Rama2dwdh()
        };
        if (type === 'fix') {
            return new dBox().Rama2dwdh()
        };
    }
}




class Operator extends Manipulator {
    calcGlass() {
        const {
            w,
            h
        } = this.updateSize();
        const {
            dw,
            dh
        } = this.select_dwdh();
        const result = {
            gw: w - dw,
            gh: h - dh,
            w: w,
            h: h

        };
        return result
    }

    calcMS() {
        // debugger
        const {
            skf,
            simple,
            whs
        } = this.select_dwdh();
        const dwdhitems = [skf, simple, whs];
        const {
            w,
            h
        } = this.updateSize();
        const result = {};
        // const resultArray = [];
        dwdhitems.forEach(item => {
            result[item.ms_type] = {
                w: w,
                h: h,
                msW: w + item.dw,
                msH: h + item.dh
            }
        });
        // dwdhitems.forEach(item => {
        //     resultArray.push({ type: item.ms_type, msW: w + item.dw, msH: h + item.dh })
        // })
        return result
    }
};


// let Man = new Manipulator();
// let op = new Operator();


// TODO: функция расчета стекла, обработчик на изменения значений
// ! TODO: добавить калькуляцию

// *Калькуляция стеклопакета и дельты

class dBox {
    constructor() {
        this.options = getState();
        console.count('dBox#')
            // this.Rama2dwdh();
    };





    deltaRama() {
        let {
            type,
            system
        } = this.options;

        if (type === 'svet') {
            console.log(`Use another calc for SVET`);
            return
        };

        const deltaBox = [];
        const $sides = document.querySelectorAll('.img_side')
        for (let $el of $sides) {
            let side = $el.dataset.side;
            let $elem = document.querySelector($outputelem[side]);
            let delta = rename($elem.innerText);
            deltaBox.push({
                side: side,
                name: $elem.innerText,

                value: RamaStorage[type][system][delta],
            })
        };

        return deltaBox
    };

    Rama2dwdh() {
        let {
            type,
            system
        } = this.options;
        const delta_obj = {
            dw: 0,
            dh: 0,
            type: type,
            system: system,
        };
        this.deltaRama().forEach(element => {
            if (element.side === 'top' || element.side === 'bot') delta_obj.dh += element.value;
            if (element.side === 'right' || element.side === 'left') delta_obj.dw += element.value;
        });

        return delta_obj
    };


};

function dwdh(dbox) {
    const {
        type,
        system
    } = getState();
    const delta_obj = {
        dw: 0,
        dh: 0,
        type: type,
        system: system,
    };
    dbox.forEach(element => {
        if (element.side === 'top' || element.side === 'bot') delta_obj.dh += element.value;
        if (element.side === 'right' || element.side === 'left') delta_obj.dw += element.value;
    });
    console.table(delta_obj);
    return delta_obj
}



const modelOutput = {
    svet: [{
            id: '#out_sizes',
            label: 'Исходные размеры:',
            html_out: 'html_sizes',
        },
        {
            id: '#ms_simple',
            label: 'М/С:',
            html_out: 'html_simple',
        },
        {
            id: '#ms_skf',
            label: 'М/С SKF:',
            html_out: 'html_skf',
        },
    ],
    fix: [{
            id: '#out_sizes',
            label: 'Исходные размеры:',
            html_out: 'html_sizes',
        },
        {
            id: '#out_glass',
            label: 'Стеклопакет:',
            html_out: 'html_glass',
        },
        {
            id: '#out_stv',
            label: 'Створка:',
            html_out: 'html_stv',
        },
    ],
    stv: [{
            id: '#out_sizes',
            label: 'Исходные размеры:',
            html_out: 'html_sizes',
        },
        {
            id: '#out_glass',
            label: 'Стеклопакет:',
            html_out: 'html_glass',
        },
        {
            id: '#out_stv',
            label: 'Створка:',
            html_out: 'html_stv',
        },
        {
            id: '#ms_simple',
            label: 'М/С:',
            html_out: 'html_simple',
        },
        {
            id: '#ms_skf',
            label: 'М/С SKF:',
            html_out: 'html_skf',
        },
    ],
};

class TPS_HTML_Output {
    constructor() {
        this.templateOutput = modelOutput
    }

    getModel() {

        // const $el = document.querySelector('[data-html-type]');
        const type = getState().type;
        const result = this.templateOutput[type];
        return result
    };
    addSizes(MODEL = []) {
        // const MODEL = this.getModel();
        // debugger
        if (getState().type !== 'svet') {
            let {
                gw,
                gh,
                w,
                h
            } = op.calcGlass();
            MODEL.map(item => {
                if (item.html_out == 'html_glass') {
                    item.gw = gw;
                    item.gh = gh
                };
                if (item.html_out == 'html_sizes') {
                    item.h = h;
                    item.w = w
                };
            })
        }
        if (getState().type === 'svet') MODEL.map(item => {
            let {
                msW,
                msH,
                h,
                w
            } = op.calcMS();
            if (item.html_out === 'html_skf' || item.html_out === 'html_simple') {
                item.msW = msW;
                item.msH = msH
            }
            if (item.html_out == 'html_sizes') {
                item.h = h;
                item.w = w
            };
        });
        console.table(MODEL)
        return MODEL
    }


    getHTMLObject() {
        const type = getState().type
        let Text2Html = [];
        let MODEL = this.addSizes(this.getModel());
        if (type === 'stv') {
            MODEL.forEach(element => {
                Text2Html.push(`
                <div data-output=${element.html_out}><span>${element.label}</span><span>${element.gw}x${element.gh}</span></div>`)
            });
            // console.table(resultHTML);
            return Text2Html
        }
    };

};

function renderHTML(HtmlTextObjects = []) {
    const output = document.querySelector('[data-output=html_out]');
    output.innerHTML = ''
    HtmlTextObjects.forEach(TextElement => {
        output.insertAdjacentHTML('beforeend', TextElement)
    })
}

function TPS_addHandler() {
    const buttons = document.getElementsByClassName('ts');
    for (button of buttons) {

        button.addEventListener('click', function(event) {
            let t = event.target;
            let type = t.dataset.type_sel;
            $stateElem.dataset.bgState = type;

        }, false)

    }

}

// TPS_addHandler();