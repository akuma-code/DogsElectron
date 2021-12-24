const model = {
    calc: `<input type="text" placeholder="ширина" class="rs_calc_w rs_size">
        <input type="text" placeholder="высота" class="rs_calc_h rs_size">
        <div class="rs_calc_btn"><button onclick="calc_rs()">Узнать цену</button></div>
        <div class="rs_calc_res" id="calc_res"></div>`,

    props(details = []) {
        const {
            type: type,
            color: color
        } = details;
        return `<div class="rs_calc_props" id="rs_props">${type}, ${color}</div>`
    }
};