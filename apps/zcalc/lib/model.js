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


function zTemplate() {

    function outdiv() {
        const outdiv = document.createElement('div');
        outdiv.classList.add('cls-out');
        outdiv.innerHTML = '';

        const _sizes = (zsizes) => {
            const obj = [];
            obj.push(zsizes.map(size => {
                const [
                    zw,
                    zh
                ] = size
                return [
                    zw,
                    zh
                ]
            }))
            return obj
        }

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

        outdiv.insertAdjacentHTML("beforeend", )
    }

}