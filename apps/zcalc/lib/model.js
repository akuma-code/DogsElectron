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
    },


};

const myZ1 = {
    color: "Standart 0225",
    size: {
        w: 500,
        h: 1170
    },
    price: 2459
}
const myZ2 = {
    color: "Standart 4077",
    size: {
        w: 400,
        h: 1070
    },
    price: 2200
}