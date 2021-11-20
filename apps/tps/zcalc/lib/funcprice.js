//@ts-check
/**
 * @class считает цену
 */
class PriceCalculator {
    constructor() {
        this.type = document.getElementById('ztype').innerText;
        this.grp = document.getElementById('zgrp').innerText;
        // @ts-ignore
        this.sizepool = rdo.sizes[this.type];

    }
    get price() {
            if (this.grp == "") return alert(`Укажите цвет жалюзи!`);
            // @ts-ignore
            return zPrice[this.type][this.grp]
        }
        /**
         * 
         * @param {number} w ширина жалюзей
         * @param {number} h высота жалюзей
         * @returns наценку на жалюзи Изолайт
         */
    S_rate(w, h) {

        let S = Math.round((w * h) / 1e4) / 100
            // console.log({ S });
        if (this.type === 'Rollite') return 1
        return (S <= 1) ? 1 : S
    }

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     * @returns индекс размеров в таблице цен
     */
    getind(width, height) {


            if (this.type === "Rollite") {
                if (height < 500) height = 500;
                if (width < 400) width = 400;
                if (height > 2400) return alert(`Высота выходит за гарантийные размеры (${height} мм)`);
                if (width > 1500) return alert(`Ширина выходит за гарантийные размеры (${width} мм)`);
            };
            if (this.type === "Isolite") {
                if (height < 300) height = 300;
                if (width < 300) width = 300;
                if (height > 2400) return alert(`Высота выходит за гарантийные размеры (${height} мм)`);
                if (width > 1800) return alert(`Ширина выходит за гарантийные размеры (${width} мм)`);
            }

            let indH = this.sizepool.h.indexOf((Math.ceil(height / 100)) / 10);
            let indW = this.sizepool.w.indexOf((Math.ceil(width / 100)) / 10);
            return [indH, indW]
        }
        /**
         * 
         * @param {number} zw ширина жалюзи
         * @param {number} zh высота жалюзи
         * @returns цену
         */
    calcIt(zw, zh) {

            let index = this.getind(zw, zh);
            return this.price[index[0]][index[1]] * this.S_rate(zw, zh)
        }
        /**
         * 
         * @param {array} sizes массив размеров 
         * @returns массив цен
         */
    calc(sizes) {
        let result = [];
        for (let size of sizes) {
            let w = size[0];
            let h = size[1];
            let ind = this.getind(w, h);
            result.push(this.price[ind[0]][ind[1]] * this.S_rate(w, h));
        }
        return result
    }

}

class ActualPrice {
    // @ts-ignore
    get rate() { return rdo.rate }

    scale(priceGroup = []) {
        const result = [];
        if (priceGroup.length === 0) return console.log(`${priceGroup} failure`);
        for (let line of priceGroup) {
            result.push(line.map(value => Math.round(value * this.rate)))
        }
        return result
    }

    // @ts-ignore
    rolMap(pl = Pricelist.Rollite) {
            let rMap = new Map();
            for (let key in pl) {
                // console.log(`group:${key}`);
                rMap.set(key, this.scale(pl[key]))
            }

            // console.log(`Rolllite: ${rMap.size} groups`);
            return Object.fromEntries(rMap)
        }
        // @ts-ignore
    isoMap(pl = Pricelist.Isolite) {
        let iMap = new Map();
        for (let key in pl) {
            // console.log(`group:${key}`);
            iMap.set(key, this.scale(pl[key]))
        }
        // console.log(`Isolite: ${iMap.size} groups`);
        return Object.fromEntries(iMap)
    }

}