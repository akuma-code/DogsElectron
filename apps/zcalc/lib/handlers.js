window.addEventListener("load", () => restoreInputs)
window.addEventListener('beforeunload', () => saveToLocalStorage);
// window.addEventListener('keydown', (e) => {
//     const calcbtn = document.querySelector('#calc-btn');
//     let temp = calcbtn.textContent;
//     if (e.altKey) {
//         calcbtn.textContent = 'Таблица'
//         setTimeout(() => calcbtn.textContent = temp, 2000)
//     }
// })

function addListener() {
    //добавляет на поля ввода размеров возможность считать по нажатию ентера
    //! INPUT.SIZE
    let sizes = document.getElementsByClassName("size");
    for (let size of sizes) {
        size.addEventListener("keyup", function (event) {
            if (event.keyCode === 13 && (event.ctrlKey || event.altKey)) {
                event.preventDefault();
            };

            if (event.keyCode === 13) {

                event.preventDefault();
                // document.getElementById("calc-btn").focus();
                document.getElementById("calc-btn").click();
            }
        });
        size.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            this.value = "";
        })
    };
    let door = document.getElementById('sd');
    const imp = document.getElementById('himp');
    door.addEventListener("click", function () {
        imp.style.display = (door.dataset.isfix == "0") ? "block" : "none";

    });
    //! CALC BUTTON
    document.getElementById('calc-btn').addEventListener('click', (event) => {

        if (event.altKey) {
            event.preventDefault();
            const maketab = new TableElementMaker();
            const tab = maketab.getTable(BC.toTab)
            document.querySelector('#et').style.display = 'block'
            document.querySelector('#et').innerHTML = ''
            document.querySelector('#et').insertAdjacentElement('afterbegin', tab);
            tabCopy('et')
            return
        }
        const inst = getInstanceData();
        const block = BC.makeBlock(inst)
        BC.addBlock(block);
        BC.updateOUT()
        saveToLocalStorage()

        document.getElementById("reset").style.display = "block";

    })
    //! CLOSE EXPORT TABLE
    document.querySelector('div.tabwrapper').addEventListener('click', (ev) => {
        const targ = ev.target;

        if (targ.matches('.exptab')) {
            return
        }
        if (targ.matches('div.tabwrapper')) {
            targ.style.display = 'none'
        }
    })
    //! KOROB COLOR
    document.querySelector('#kor_col').addEventListener('click', (event) => {
        const targ = event.target;
        const targSelector = event.currentTarget;
        let type = document.getElementById('ztype').textContent;
        let $zgrp = document.getElementById('zgrp');
        let groups = (type == "Isolite") ? groupsI : groupsR;
        let zcolor = document.getElementById('zlist').value;
        let korobColorType = "";

        document.querySelectorAll('[data-kor_select]').forEach(elem => elem.classList.remove('active'))

        if (targ.matches('.korgroup [data-kor_select]')) {
            targ.classList.add('active');
            const kcol_group = targ.dataset.kor_select;
            targSelector.dataset.kor_color = kcol_group;
            korobColorType = kcol_group
        }
        if (targ.matches('.droplist span')) {
            const kcol_group = targ.dataset.kor_select;
            targSelector.dataset.kor_color = kcol_group;
            korobColorType = kcol_group;
            targSelector.querySelectorAll(`[data-kor_select=${korobColorType}]`).forEach(elem => elem.classList.remove('selected'))
            targSelector.querySelector(`span[data-kor_select=${korobColorType}]`).textContent = targ.textContent;
            targSelector.querySelector(`span[data-kor_select=${korobColorType}]`).classList.add('active');
            targ.classList.add('selected');
        }
        for (let item of groups) {
            if (item.name.includes(zcolor)) $zgrp.innerText = item.setKat(korobColorType)
        }
    }, true)

    document.querySelector('#show_calc').addEventListener('click', (e) => {

        getExport(BC.toTab)
    })

}

function getKorob() {
    const $KorElem = document.querySelector('#kor_col');
    const $ztype = document.querySelector('#ztype');
    const activeKor = $KorElem.querySelector('.active').textContent;
    const korGrp = $KorElem.dataset.kor_color;
    return {
        type: $ztype.textContent,
        kColor: activeKor,
        kGroup: korGrp,
    }
}

function restoreInputs() {
    if (!localStorage.getItem('zcalc_inputs')) {
        return 'Nothing to restore'
    }
    const SavedInputs = JSON.parse(localStorage.getItem('zcalc_inputs')) || [];
    const $sizes = Array.from(document.getElementsByClassName('size'));
    $sizes.map(item => {
        //@ts-ignore
        item.value = SavedInputs[item.id] || ''
    })
    return 'Restored'
}



function saveToLocalStorage() {
    const sizes = _SizeList();
    // const $inst = document.querySelector('#showinst');
    // $inst.innerHTML = '<ul>';
    localStorage.setItem('zcalc_inputs', JSON.stringify(sizes))
    const $savedElems = Array.from(document.querySelectorAll('[data-stls]')) || [];
    const toLS = $savedElems.map(element => {
        const {
            stls: elemID
        } = element.dataset;
        const value = element.value || element.textContent || element.getAttribute('wintype');
        return {
            elemID,
            value
        }
    })
    const savedCont = Object.values(BC.cont);

    toLS.push({
        sizes
    })
    localStorage.setItem('z_last_inst', JSON.stringify(toLS))
    localStorage.setItem('saved_zBlocks', JSON.stringify(savedCont));
}

function tabCopy(id) {
    let range = document.createRange();
    let selection = window.getSelection();
    const nodeToCopy = document.getElementById(id)

    selection.removeAllRanges();
    range.selectNodeContents(nodeToCopy);
    selection.addRange(range)

    document.execCommand('copy', true)

}

function loadDB(src, cb) {
    const script = document.createElement('script');
    const DB = ['lib/priceDB.js', 'lib/SizeDB.js', 'lib/funcprice.js', 'lib/zDB.js'];
    script.src = src;
    script.onload = () => cb(script);
}

function getDiscount() {
    const disc = document.getElementById('discount');
    const rate = (100 - disc.value) / 100;
    return rate
}

function show_calc(block = "") {
    const $rs_calc = document.getElementById('rs__calc');
    if ($rs_calc.dataset.rsCalc === "open") {
        $rs_calc.dataset.rsCalc = "hide"
        return $rs_calc.innerHTML = ""
    };

    $rs_calc.dataset.rsCalc = "open";
    return $rs_calc.insertAdjacentHTML('afterbegin', block);

}

function toggleCalc() {
    return show_calc(model.calc)
}

function setprops() {
    const $ztype = document.querySelector('#ztype');
    const $zcolor = document.querySelector('#zlist');
    const $rs_props = document.querySelector('#rs_props');
    return $rs_props.innerHTML = `${$ztype.innerHTML} || ${$zcolor.value}`
}