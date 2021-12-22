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
        this.expRaws = [];

    }

    addLineToCont(export_block = OutBlockMain.data) {
        const {
            zhals = [],
                korob
        } = export_block;
        const {
            kColor
        } = korob
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
                kColor,
                zw,
                zh,
                price,
                Lupr,
                shtDpt
            };
            this.expRaws.push(ExpLine)
            return ExpLine
        })

        return expBlock
    };

    addExel(cont = this.expRaws) {
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

    get toExel() {
        return this.addExel(this.expRaws)
    }
}


// const TE = new TableExport();
// TE.addLineToCont({
//     "color": "Аллегро(2.0)",

//     "type": "Rollite",

//     "zhals": [{
//             "zw": 504,
//             "zh": 1396,
//             "price": 2735
//         },
//         {
//             "zw": 25,
//             "zh": 1396,
//             "price": 2346
//         },
//         {
//             "zw": 504,
//             "zh": 1396,
//             "price": 2735
//         }
//     ]
// })
// TE.addLineToCont({
//     "color": "Аллегро(2.0)",

//     "type": "Rollite",

//     "zhals": [{
//             "zw": 504,
//             "zh": 1396,
//             "price": 2735
//         },
//         {
//             "zw": 25,
//             "zh": 1396,
//             "price": 2346
//         },
//         {
//             "zw": 504,
//             "zh": 1396,
//             "price": 2735
//         }
//     ]
// })

// TE.addExel()