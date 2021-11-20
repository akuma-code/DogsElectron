const img_sides = ['top', 'bot', 'left', 'right'];

const Sidelist = {
    svet: {
        top: ['свет'],
        bot: ['свет'],
        left: ['свет'],
        right: ['свет'],
    },

    fix: {
        top: ['рама', 'импост'],
        bot: ['рама', 'импост'],
        left: ['рама', 'импост'],
        right: ['рама', 'импост'],
    },

    stv: {
        top: ['рама', 'импост', 'импост в створке'],
        bot: ['рама', 'импост', 'импост в створке', 'порог'],
        left: ['рама', 'импост', 'штульп', 'импост в створке'],
        right: ['рама', 'импост', 'штульп', 'импост в створке'],
    },

    setup(tglStatus = '') {

        for (let side of img_sides) {
            let list = '';
            let $selector = document.querySelector(`ul.drop_content[data-side=${side}]`);
            this[tglStatus][side].forEach(element => list += `<li data-handler-type='click' data-handler='updSides'>${element}</li>`);
            $selector.innerHTML = '';
            $selector.insertAdjacentHTML('afterbegin', list)
        }
    },
};

const Detailslist = {
    stv: `<span></span>`,
    fix: '<span>Фикса, просто фикса...</span>',
    svet: '<span>Только для определения размеров москитных сеток!</span>',
    toHTML(current_state) {
        const $tps_det = document.querySelector('div.tps_det');
        $tps_det.innerHTML = '';
        $tps_det.insertAdjacentHTML('afterbegin', this[current_state]);
    }
}

//! ОБЩИЙ ОБРАБОТЧИК (onClick Listener)
$main.addEventListener('click', function(e) {
    let target = e.target;
    //! выделение строки списка
    if (target.matches('li')) {
        let selector = target.closest('ul').dataset.side;
        document.querySelector(`${$outputelem[selector]}`).innerText = target.textContent
        $StatusCheck[selector] = target.textContent;
        for (let elem of target.closest('ul').children) {
            elem.classList.remove('selected')
        }
        target.classList.add('selected');
    }
    //! толщина ст-пакета
    if (target.matches('[data-side=system] li')) {
        document.querySelector('[data-side=depth]').innerHTML = '';
        document.querySelector('[data-side=depth]').innerHTML = setDepth(target.textContent);

        $StatusCheck.system = target.textContent
    }

    if (target.matches('[data-side=depth] *')) {
        $StatusCheck.depth = target.textContent
    }


}, true);

$tgl_rama.addEventListener('click', function(event) {
    let t = event.target;
    const el_active = Array.from(document.getElementsByClassName('ts'));
    if (t.matches('[data-tgl-status]')) {
        const state = t.dataset.tglStatus;
        Sidelist.setup(state);
        selectBGimg(state);
        checkSideState(t);
        $tgl_svet.classList.remove('active');
        $tgl_rama.classList.add('active');
        el_active.forEach(elem => elem.classList.remove('active'));
        event.target.classList.add('active');

    };

}, true)
$tgl_svet.addEventListener('click', function(event) {
    let t = event.target;
    const el_active = Array.from(document.getElementsByClassName('ts'));
    if (t.matches('[data-tgl-status]')) {
        const state = t.dataset.tglStatus;
        Sidelist.setup(state);
        selectBGimg(state);
        checkSideState(t);
        $tgl_rama.classList.remove('active');
        $tgl_svet.classList.add('active');
        el_active.forEach(elem => elem.classList.remove('active'));
        event.target.classList.add('active');

    };

}, true)
window.addEventListener('beforeunload', () => updateDB($StatusCheck));

function setDepth(system) {
    let list = '';
    currentDepth[system].forEach(element => list += `<li>${element}</li>`);
    return list
}


function tglActive(element) {
    element.classList.toggle('active')
}

function updateDB(storage = {}) {
    for (let key in storage) {
        if (localStorage.getItem(key) === storage[key]) continue
        localStorage.setItem(key, storage[key]);
        $StatusCheck[key] = localStorage.getItem(key);
        console.count(`added ${key} : ${storage[key]}`)
    }
    return
}

function selectBGimg(state) {
    $img_cont.dataset.bgState = state;
    $StatusCheck.bgState = state;
    const src = {
        stv: "url('../assets/rama/stv.svg')",
        fix: "url('../assets/rama/fix.svg')",
        svet: "url('../assets/rama/svet.svg')",
    }

    let root = document.documentElement.style;
    return root.setProperty(`--bg-image`, src[state])
}
/**
 * меняет сторону окна или рамы при смене типа расчета - створка/фикса/свет
 * @param {string} target event.target
 * @returns Если совпадает, то ничего, если не совпадает, то заменяет на первое значение из списка
 */
function checkSideState(target) {
    const currentState = target.dataset.tglStatus || 'unset';
    if (currentState === 'unset') return console.log('state unset');
    for (let side of $sides) {
        let direction = side.dataset.side;
        let elem = document.querySelector(`span[output=${direction}`)
        if (!Sidelist[currentState][direction].includes(elem.textContent)) elem.textContent = Sidelist[currentState][direction][0]
    }
}