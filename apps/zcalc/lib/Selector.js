//! ================================================================ Вспомогательный класс, одиночное стекло==========================//
class GLS {
    constructor(w = null, h = null) {
        this.w = w;
        this.h = h;
    }
    get arr() {
        return [this.w, this.h]
    }

    get obj() {
        return { w: this.w, h: this.h }
    }

    applyDelta(delta, gls = this.arr) {
        if (gls.length !== delta.length) console.log(`разная длинна массивов ${gls.length} : ${delta.length}`);
        let out = [];
        out.length = 0;
        for (let i = 0; i < gls.length; i++) {
            out.push([gls[i] - delta[i]])
        };
        return out.join(",").split(",")
    }

}

function applyZs(glasses = []) {
    let dep = document.getElementById('gdepth').value;
    let sys = document.getElementById('prof').value;
    let ztype = document.getElementById('ztype').innerText;
    let zw, zh;
    let dz = (ztype == "Rollite") ? SizeDB[sys]["rd" + dep] : SizeDB[sys].idpt;
    [zw, zh] = dz;
    let out = [];
    for (const glass of glasses) {
        out.push(
            [glass[0] - zw, glass[1] - zh]
        )
    }
    return out;
}
//!----------<<<-----------  getSizes()    ------------->>>-------------//
function getSizes() {

    let wt = document.getElementById('fon').getAttribute("wintype");
    let sizes = document.getElementsByClassName("size");
    let hp = new Map();
    let wp = new Map();
    for (const size of sizes) {
        if (IdSelector.idw[wt].includes(size.id)) wp.set(`${size.id}`, `${+size.value}`); //! array of Ws
        if (IdSelector.idh[wt].includes(size.id)) hp.set(`${size.id}`, `${+size.value}`); //! array of Hs
    };
    let sizepool = [
        Array.from(wp.values()),
        Array.from(hp.values())
    ];
    // console.log({ sizepool });
    return sizepool
}


//! === Контейнер для выбора дельты стекла в зависимости от положения в раме
const Delta_selector = {
    sys() { return document.getElementById('prof').value },

    //! === glass type 0 === [r-r] -> рама-рама
    rr(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_rr, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        dW = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        return [Math.floor(dW), Math.floor(dH)]

    },

    //! === glass type 1 === [r-i] -> рама - импост
    ri(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_ri, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        dW = (isfix) ? SizeDB.d_ri(this.sys()) : SizeDB.d_sisr(this.sys());
        return [Math.floor(dW), Math.floor(dH)]
    },

    //! === glass type 2 === [i-i] -> импост - импост
    ii(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_ii, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rr(this.sys()) : SizeDB.d_rs(this.sys());
        dW = (isfix) ? SizeDB.d_ii(this.sys()) : SizeDB.d_sisi(this.sys());
        return [Math.floor(dW), Math.floor(dH)]
    },

    door(isfix) {
        if (isfix > 1 || isfix < 0) { return console.log(`Неверный isfix_door, указан: ${isfix}`) };

        dH = (isfix) ? SizeDB.d_rs(this.sys()) : SizeDB.d_doori(this.sys());
        dW = SizeDB.d_rs(this.sys());
        return [Math.floor(dW), Math.floor(dH)]
    }

}

class MainSelector {
    check(id) {
        let elem = +document.getElementById(id).dataset.isfix;
        let output = (elem === 1) ? "Фикса" : "Створка";
        // setTimeout(() => console.log(`id: ${id}(${output})`), 1);
        return elem
    }
    f(sizepool = getSizes()) {
        let g_left;
        g_left = new GLS(sizepool[0][0], sizepool[1][0]);
        return [
            g_left.applyDelta(Delta_selector.rr(this.check("s1")))
        ]
    }
    ff(sizepool = getSizes()) {
        let g_left, g_right;
        g_left = new GLS(sizepool[0][0], sizepool[1][0]);
        g_right = new GLS(sizepool[0][1] - sizepool[0][0], sizepool[1][0]);
        return [
            g_left.applyDelta(Delta_selector.ri(this.check("s1"))),
            g_right.applyDelta(Delta_selector.ri(this.check("s2")))
        ]
    }
    fff(sizepool = getSizes()) {
        let g_left, g_mid, g_right, g_w;
        g_left = new GLS(sizepool[0][0], sizepool[1][0]);
        g_right = new GLS(sizepool[0][1], sizepool[1][0]);
        g_w = new GLS(sizepool[0][2], sizepool[1][0]);
        g_mid = new GLS((g_w.w - g_left.w - g_right.w), g_w.h)
        return [
            g_left.applyDelta(Delta_selector.ri(this.check("s1"))),
            g_mid.applyDelta(Delta_selector.ii(this.check("s2"))),
            g_right.applyDelta(Delta_selector.ri(this.check("s3")))
        ]
    }
    df(sizepool = getSizes()) {
        let g_door, g_right;
        //! g_door проверяет есть в двери импост или нет
        g_door = (this.check("sd")) ? new GLS(sizepool[0][1], sizepool[1][0]) : new GLS(sizepool[0][1], sizepool[1][0] - sizepool[1][2]);
        g_right = new GLS(sizepool[0][0], sizepool[1][1]);
        return [
            g_door.applyDelta(Delta_selector.door(this.check("sd"))),
            g_right.applyDelta(Delta_selector.rr(this.check("s2")))
        ]
    }
    dff(sizepool = getSizes()) {
        let g_door, g_right, g_left;
        //! g_door проверяет есть в двери импост или нет
        g_door = (this.check("sd")) ? new GLS(sizepool[0][2], sizepool[1][0]) : new GLS(sizepool[0][2], sizepool[1][0] - sizepool[1][2]);
        g_left = new GLS(sizepool[0][0] - sizepool[0][1], sizepool[1][1]);
        g_right = new GLS(sizepool[0][1], sizepool[1][1]);
        return [
            g_door.applyDelta(Delta_selector.door(this.check("sd"))),
            g_left.applyDelta(Delta_selector.rr(this.check("s1"))),
            g_right.applyDelta(Delta_selector.rr(this.check("s2")))
        ]
    }
    fdf(sizepool = getSizes()) {
        let g_door, g_right, g_left;
        //! g_door проверяет есть в двери импост или нет
        g_left = new GLS(sizepool[0][0], sizepool[1][2]);
        g_door = (this.check("sd")) ? new GLS(sizepool[0][2], sizepool[1][0]) : new GLS(sizepool[0][2], sizepool[1][0] - sizepool[1][3]);
        g_right = new GLS(sizepool[0][1], sizepool[1][1]);
        return [
            g_left.applyDelta(Delta_selector.rr(this.check("s1"))),
            g_door.applyDelta(Delta_selector.door(this.check("sd"))),
            g_right.applyDelta(Delta_selector.rr(this.check("s3")))
        ]
    }
}
//! id selector => getsizes() выбирает размеры, которые войдут в расчетную группу
const IdSelector = {
    idw: {
        f: ["w"],
        ff: ["levo", "w"],
        fff: ["levo", "w", "pravo"],
        df: ["w", "levo"],
        dff: ["w", "levo", "pravo"],
        fdf: ["levo", "w", "pravo"],
    },
    idh: {
        f: ["h"],
        ff: ["h", "h"],
        fff: ["h", "h", "h"],
        df: ["h", "hpr", "himp"],
        dff: ["h", "hpr", "hpr", "himp"],
        fdf: ["hlv", "h", "hpr", "himp"],
    }

}

class Outputer {
    constructor() {
        this.sys = document.getElementById('prof').value;
        this.ztype = document.getElementById('ztype').innerText;
        this.zcolor = document.getElementById('zlist').value;
        this.zgrp = document.getElementById('zgrp').innerText;
        this.gdepth = document.getElementById('gdepth').value;
        this.pricer = new PriceCalculator()
    }


    toDiv(array) {
        let div = document.createElement('div');
        let stuff = "";
        div.classList.add('cls-out');
        stuff += `<div class='sys-line'>${count}) ${this.sys}(${this.gdepth} mm)</div>`;
        stuff += `<div class='color-line'>${this.zcolor} (<b>гр. ${this.zgrp}</b>)</div>`;
        for (let line of array) {
            stuff += `<div class='size-line'> ${line[0]} x ${line[1]} (${this.pricer.calcIt(...line)} руб.)</div>`
        };
        div.innerHTML = stuff;
        document.getElementById('outside').append(div);
        return
    }
}