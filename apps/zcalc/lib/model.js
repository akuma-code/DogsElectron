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
/**@return {glasses, zhals} array of mainselector result as array of objects*/
const _sizes = (zsizes) => {
    let converted = [];
    zsizes.map(zsize => {
        const [w, h] = zsize
        converted.push({
            w: parseInt(w),
            h: parseInt(h)
        })
    })
    return converted
}

function zTemplate() {


    const outdiv = document.createElement('div');
    outdiv.classList.add('cls-out');


    outdiv.innerHTML = /*html*/ `
<div class="out_header" data-outblock = header></div>
<div class="out_body" data-outblock = body> </div>
<div class="out_footer" data-outblock = footer> </div>
`

    const _head = (header = {}) => {
        const {
            system = `###`,
                depth = `###`,
                color = null
        } = header;

        return {
            system,
            depth,
            color
        }
    };

    const _body = (bodycontent = test_calcData) => {
        const {
            prices,
            glasses,
            zh_sizes
        } = bodycontent
        const sizes = _sizes(zh_sizes);
    }

    const res = (sizes, head) => {
        const {
            sys,
            dpt
        } = head
        let text = `<div class="sys-line">${sys}-${dpt}</div>
<div class="color-line">${_head.color} (<b>гр. E</b>)' </div>`
        text += sizes
        return text
    }

}