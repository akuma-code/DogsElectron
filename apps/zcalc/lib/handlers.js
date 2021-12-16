function addListener() { //добавляет на поля ввода размеров возможность считать по нажатию ентера
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

    document.getElementById('calc-btn').addEventListener('click', (event) => {
        const inst = getInstanceData();
        const block = BC.makeBlock(inst)
        BC.addBlock(block);
        BC.updateOUT()
        saveToLocalStorage()

        if (event.altKey) {
            //! gonow()
            event.preventDefault()
            gonow()
            // document.querySelector('#outside').insertAdjacentElement('afterbegin', newblock.toDIV)
            return
        }

        document.getElementById("reset").style.display = "block";
    })

}
window.addEventListener("load", () => restoreInputs)
window.addEventListener('beforeunload', () => saveToLocalStorage);

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
    const $inst = document.querySelector('#showinst');
    $inst.innerHTML = '<ul>';
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