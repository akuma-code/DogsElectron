const model = {
    calc: `<input type="text" placeholder="width" class="rs_calc_w rs_size">
        <input type="text" placeholder="height" class="rs_calc_h rs_size">
        <div class="rs_calc_btn"><button onclick="calc_rs()">Calc</button></div>
        <div class="rs_calc_res" id="calc_res"></div>`,

    props(details = []) {
        const { type: type, color: color } = details;
        return `<div class="rs_calc_props" id="rs_props">${type}, ${color}</div>`
    },


};
// `<div class="rs_out">${$w.value} x ${$h.value} ::: ${calc.type}</div>
// <div class="rs_out bb"><b>${$color} :::  ${Math.round(calc.calcIt($w.value, $h.value)*$disc)} руб.</b></div>`
// 
// 
// class Render{
//     constructor()
// }