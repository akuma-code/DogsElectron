function addListener() { //добавляет на поля ввода размеров возможность считать по нажатию ентера
    let sizes = document.getElementsByClassName("size");
    for (let size of sizes) {
        size.addEventListener("keyup", function(event) {
            if (event.keyCode === 13 && (event.ctrlKey || event.altKey)) {
                event.preventDefault();
            };

            if (event.keyCode === 13) {

                event.preventDefault();
                document.getElementById("calc-btn").focus();
                document.getElementById("calc-btn").click();
            }
        });
        size.addEventListener('mouseup', function(event) {
            event.preventDefault();
            this.value = "";
        })
    };
    let door = document.getElementById('sd');
    const imp = document.getElementById('himp');
    door.addEventListener("click", function() {
        imp.style.display = (door.dataset.isfix == "0") ? "block" : "none";

    });

}

function showdisc() {
    const disc = document.getElementById('discount');
    const elem = document.querySelector("body > div.disc.abs > label");
    disc.addEventListener("input", function() {
        elem.innerHTML = `Скидка: <span>${disc.value}%</span>`
    });
    elem.addEventListener("click", function(event) {
        event.preventDefault();
        let inp = prompt("Укажите скидку вручную", disc.value);
        if (inp > 90) return alert("Number!");
        disc.value = inp;
        this.innerHTML = `Скидка: <span>${disc.value}%</span>`;
    })
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