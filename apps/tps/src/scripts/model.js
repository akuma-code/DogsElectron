const Systems = [
    [`proline`, `ProLine 70 mm`],
    [`softline`, `SoftLine 70 mm`],
    [`softline82`, `SoftLine 82 mm`],
]
console.log('model Loaded');

const IMG = {
    fix: {
        src: 'src/assets/rama/f.min.svg',
        width: '115px',
        height: '220px',
    },

    stv: {
        src: 'src/assets/rama/s1.min.svg',
        width: '105px',
        height: '210px',
    }

}
const Model = {
    image: {

        R: {
            src: 'src/assets/rama/f.min.svg',
            width: '115px',
            height: '220px',
        },
        Sl: {
            src: 'src/assets/rama/s1.min.svg',
        },
        Sr: {
            src: 'src/assets/rama/s3.min.svg'
        },
    }
};


function setimg(selector, img) {
    const $sel = document.querySelector(selector);
    let $el = document.createElement('img');
    $el.src = img.src;
    $el.style.height = img.height;
    $el.style.width = img.width;
    $el.classList.add('tps_img')
    $sel.insertAdjacentElement('beforeend', $el);
    return $el

}

// function opt([systemName = '', showName = '']) {
//     return `<option value="${systemName}">${showName}</option>`
// }
// 
// function selId(id = '', options = []) {
//     let html = `<select name=${id} id=${id}>`;
//     options.forEach(value => {
//         // if (typeof value != String) value = `${value}`;
//         html += `${opt(value)}`;
//     });
//     html += `</select>`;
//     return html
// }

let testoptions = [
    `proline`, `softline`
]

class TPSSelector {
    constructor(options = [], selector = '') {
        this.selector = selector;
        this.options = options;

    }


    opt([value = '', text = '']) {
        return `<option value="${value}">${text}</option>`
    }

    htmlSelect(options = this.options) {
        let html = `<select >`;
        options.forEach(value => {
            html += `${this.opt(value)}`;
        });
        html += `</select>`;
        return html
    }

    get elem() {
        const $html = this.htmlSelect(this.options);
        return $html
    }

    wrapdiv(cls = 'selector') {
        // document.querySelector(`${this.selector}`).innerHTML = '';
        document.querySelector(`${this.selector}`).classList.add(cls);
        return `<div width="100%">${this.elem}</div>`
    }

}