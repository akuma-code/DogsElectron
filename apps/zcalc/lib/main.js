// import SI from './zstorage.js';
// console.log(SI)


function gonow() {
    document.getElementById('reset').style.display = "block";
    let wt = document.getElementById('fon').getAttribute('wintype');
    let disc = document.getElementById('discount').value;

    let glasses = new MainSelector()[wt]();

    let out = new Outputer();
    let pricer = new PriceCalculator();

    let zh = applyZs(glasses);
    let prices = pricer.calc(zh);
    out.toDiv(zh);

    const summary = getInstanceData() //! summary data here

    let box = zbox(zh, prices);
    let sum = prices.reduce((prev, current) => current + prev);

    if (store.has('summ')) {
        let temp = store.get('summ') + sum;
        store.set('summ', temp);
    } else {
        store.set('summ', sum)
    }
    //* console.log("remakeZ: ", remakeZitem(box.data));
    store.set(box.key, box.data);
    //* zkeep.save(makeZh(box.data));


    //* console.log(`Стекла: `, glasses);
    //* console.log(`Жалюзи: `, zh);
    //* stylelog(`Price: ${prices} Summary: ${sum} rub`);

    document.getElementById('calc-btn').innerHTML = `${Math.floor(store.get("summ") * (1-disc/100))} руб.`;
    // document.getElementById('calc-btn').innerHTML = `${Math.ceil(sum * (1-disc/100))} руб.`;
    document.getElementById('outside').insertAdjacentHTML('beforeend', `<div class="summ">Скидка ${disc}%: <b>${Math.round(sum*(1-disc/100))} руб.</b></div> `);

    console.log(`Stored elements: ${store.size - 1}`);
    saveToLocalStorage()
    //* console.log("data: ", summary)
    return summary
}

function calc_rs() {
    const $w = document.querySelector('input.rs_calc_w.rs_size');
    const $h = document.querySelector('input.rs_calc_h.rs_size');
    const $color = document.getElementById('zlist').value;
    // const $disc = 1 - document.getElementById('discount').value / 100;
    const calc = new PriceCalculator();
    const result = Math.round(calc.calcIt($w.value, $h.value));


    const $output = document.getElementById('calc_res');

    $output.insertAdjacentHTML("beforeend", `
<div class="rs_out">${calc.type} ಄ ${$color}<br>
${$w.value}мм x ${$h.value}мм<br>
<b>${_applyDiscount(result)} руб.</b> </div>`)
}



function resetvals() {
    document.getElementById('zlist').value = "";
    document.getElementById('zgrp').textContent = "";

}



function fullreset() {
    document.getElementById('outside').innerHTML = ""; // ! сброс вывода жалюзи
    // document.getElementById('zlist').value = ""; //! цвет жалюзи
    // document.getElementById('zgrp').innerText = ""; //! группа жалюзи
    document.getElementById("reset").style.display = "none";
    document.getElementById("show_calc").style.display = "none";
    document.getElementById('calc-btn').innerHTML = "Рассчитать"; //! возврат кнопки к исходному значению
    store.set("summ", 0); //! обнуление общей стоимости в хранилище
    BC.cont.length = 0;
    BC.toTab.length = 0;

}

function reload() {
    td();
    tl();
    tt();
}