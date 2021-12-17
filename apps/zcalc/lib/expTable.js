class TableExport {
    constructor() {}
    get line() {
        return this.lineCounter(9)
    }
    lineCounter(startLine = 1) {
        return function () {
            return startLine++
        }
    }

    getTableRaw(export_block) {
        const {
            rawType: type,
            zhals = [],
            rawColor: color
        } = export_block;
        const n = zhals.length


        const shtDpt = `<td>10</td>`;
        const uprLength = (h) => (Math.floor((h - 50) / 10)) * 10
        const addSizes = zhals.map(({
            zw,
            zh
        }) => {});



    }
}

const TE = new TableExport()