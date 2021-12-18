const EXEL_F = (line) => {

    const SquareZ = `=E${line}*F${line}/1000000`;
    const CountBase = `=ЕСЛИ(B${line}="isolite";ЕСЛИ(J${line}<1;1;J${line});ЕСЛИ(B${line}="витэо";0))`;
    const FinalCountBase = `=L${line}*K${line}`;
    const ITOGO = `=ЕСЛИ(B${line}="isolite";(N${line}*M${line}*(1+O${line}/100));ЕСЛИ(B${line}="витэо";(L${line}*N${line}*(1+O${line}/100))))`;
    return {
        SquareZ,
        CountBase,
        FinalCountBase,
        ITOGO
    }
}

class TableExport {
    constructor() {
        this.expCont = []

    }

    addToExportConteiner(export_block = OutBlockMain.data) {
        const {
            zhals = [],
        } = export_block;
        const shtDpt = `10`;
        const uprLength = (h) => (Math.floor((+h - 50) / 10)) * 10

        const expBlock = zhals.map(({
            zw,
            zh,
            price
        }) => {
            const {
                type,
                color
            } = export_block;
            const Lupr = uprLength(zh)
            const ztype = (type == 'Isolite') ? 'isolite' : 'витэо'
            const ExpLine = {
                type: ztype,
                color,
                zw,
                zh,
                price,
                Lupr,
                shtDpt
            };
            this.expCont.push(ExpLine)
            return ExpLine
        })

        return expBlock
    };

    addExel(cont = this.expCont) {
        let start = 18;
        const fullExpCont = cont.map(elem => {
            const {
                SquareZ,
                CountBase,
                FinalCountBase,
                ITOGO
            } = EXEL_F(start++);

            elem.sq = SquareZ;
            elem.cB = CountBase;
            elem.fCB = FinalCountBase;
            elem.itog = ITOGO;
            return elem
        })
        return fullExpCont
    }
}

class ExpTabHTML {
    constructor(export_conteiner = []) {
        this.$tab = this.getTable(export_conteiner)
    }

    makeTR(lineExport) {
        const {
            type,
            color,
            zw,
            zh,
            price,
            Lupr,
            shtDpt,
            sq,
            cB,
            fCB,
            itog
        } = lineExport;
        const tr = document.createElement('tr');
        tr.innerHTML = /*html*/ `
        <td>${type}</td>
        <td>${color}</td>
        <td>белый</td>
        <td>${zw}</td>
        <td>${zh}</td>
        <td>${shtDpt}</td>
        <td></td>
        <td>${Lupr}</td>
        <td>${sq}</td>
        <td>${cB}</td>
        <td>1</td>
        <td>${fCB}</td>
        <td>${price}</td>
        <td></td>
        <td>${itog}</td>
        `;
        return tr
    };

    getTable(cont = []) {
        const tab = document.createElement('table');
        tab.classList.add('exptab');
        cont.forEach(line => {
            tab.insertAdjacentElement('beforeend', this.makeTR(line))
        })
        return tab
    }
}

const TE = new TableExport();
TE.addToExportConteiner({
    "color": "Аллегро(2.0)",

    "type": "Rollite",

    "zhals": [{
            "zw": 504,
            "zh": 1396,
            "price": 2735
        },
        {
            "zw": 25,
            "zh": 1396,
            "price": 2346
        },
        {
            "zw": 504,
            "zh": 1396,
            "price": 2735
        }
    ]
})
TE.addToExportConteiner({
    "color": "Аллегро(2.0)",

    "type": "Rollite",

    "zhals": [{
            "zw": 504,
            "zh": 1396,
            "price": 2735
        },
        {
            "zw": 25,
            "zh": 1396,
            "price": 2346
        },
        {
            "zw": 504,
            "zh": 1396,
            "price": 2735
        }
    ]
})

TE.addExel()