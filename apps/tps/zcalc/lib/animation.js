function stylelog(text) {
    const styles = [
        'color: black',
        'background-color: grey',
    ].join(';');

    return console.log('%c%s', styles, text);
}

function toggle_rs_calc(elem) {
    if (elem.dataset.calcState == "close") {
        toggleCalc();
        return elem.dataset.calcState = "open"
    } else {
        toggleCalc();
        return elem.dataset.calcState = "close"
    }

}

function resizeWin(wintype) {

    let fon = document.getElementById("fon");
    let img = document.getElementById('imgbox');
    switch (wintype) {
        case "f":
            img.dataset.isbb = 'false';
            img.dataset.ramaStep = "1";
            fon.setAttribute("wintype", "f");
            img.setAttribute("wintype", "f");
            // fon.dataset.ramaStep = "1";

            fon.src = "img/f.svg";

            fon.style.width = "125px";
            fon.style.height = "290px";


            // rama = "x1";
            break;

        case "ff":
            img.dataset.isbb = 'false';
            img.dataset.ramaStep = "2";
            // fon.dataset.ramaStep = "2";

            fon.src = "img/ff.svg";
            fon.setAttribute("wintype", "ff");
            img.setAttribute("wintype", "ff");

            fon.style.width = "250px";
            fon.style.height = "290px";


            break;

        case "fff":
            img.dataset.isbb = 'false';
            img.dataset.ramaStep = "3";
            // fon.dataset.ramaStep = "3";

            fon.src = "img/fff.svg";
            fon.setAttribute("wintype", "fff");
            img.setAttribute("wintype", "fff");

            fon.style.width = "375px";
            fon.style.top = "0px"

            fon.style.height = "290px";

            break;

        case "df":
            img.dataset.isbb = 'true';
            img.dataset.ramaStep = "4";
            // fon.dataset.ramaStep = "4";

            fon.src = "img/d-f.svg";
            fon.setAttribute("wintype", "df");
            img.setAttribute("wintype", "df");

            fon.style.width = "290px";
            fon.style.height = "415px";


            break;
        case "dff":
            img.dataset.isbb = 'true';
            img.dataset.ramaStep = "5";
            // fon.dataset.ramaStep = "5";

            fon.src = "img/d-ff.svg";
            fon.setAttribute("wintype", "dff");
            img.setAttribute("wintype", "dff");

            fon.style.width = "400px";
            fon.style.height = "415px";

            break;
        case "fdf":
            img.dataset.isbb = 'true';
            img.dataset.ramaStep = "6";
            // fon.dataset.ramaStep = "6";

            fon.src = "img/f-d-f.svg";
            fon.setAttribute("wintype", "fdf");
            img.setAttribute("wintype", "fdf");

            fon.style.width = "415px";
            fon.style.height = "415px";

            break;
        default:
            alert("NOT WORKS YET!! IMG Step is " + img.dataset.ramaStep)
            return;

    }
}




function opaopa(item) {
    if (item.style.opacity < 1) {
        item.style.opacity = 1;
        item.dataset.isfix = 0;
    } else {
        item.style.removeProperty('opacity');
        item.dataset.isfix = 1;
    }
}

//!@toggletype переключатель типа жалюзи
/**
 * @name(Toggle Type) переключает тип жалюзи
 */
async function tt() {
    let elem = document.getElementById('ztype');

    let showelems = document.getElementsByClassName("show");
    if (elem.textContent == "Rollite") {
        elem.textContent = "Isolite";
        elem.style.color = "white";
        elem.style.transform = "rotateX(0deg)";
        type = "Isolite";
        tl()
    } else {
        elem.style.color = "black";
        elem.textContent = "Rollite";
        elem.style.transform = "rotateX(360deg)";
        type = "Rollite";
        tl();
    }
    for (let el of showelems) {
        el.style.display = (type == "Isolite") ? "block" : "none";
    }
}

// !@toggledepth фильтрует список ст/п в зависимости от профиля
/**
 * @name ToggleDepth - переключатель стеклопакетов в зависимости от профиля 
 */
async function td() {
    let sys = await document.getElementById('prof').value;

    let system = SizeDB[sys];
    let elems = document.getElementsByClassName('odepth');

    for (let elem of elems) {

        if (SizeDB[sys].dpt.includes(elem.value)) {
            elem.style.display = "block";
        } else {
            elem.style.display = "none"
        }
    }
    document.getElementById('gdepth').style.opacity = 1;
    document.getElementById('gdepth').value = system.dpt[0];
}




// !@Set Group - определяет группу жалюзей #zgrp
async function setgr() {
    let type = document.getElementById('ztype').textContent;
    let zcolor = await document.getElementById('zlist').value;
    let elem = document.getElementById('zgrp');
    let groups = (type == "Isolite") ? groupsI : groupsR
    let korobs = document.getElementById('korob').children;
    let kr = "";
    for (let korob of korobs) {
        if (!korob.checked) continue
        else {
            kr = korob.value
        }
    }
    for (let item of groups) {
        if (item.name.includes(zcolor)) elem.innerText = item.setKat(kr)
    }
}

//!@togglelist переключает списки выбора цвета жалюзи роллайт/изолайт
async function tl() {
    let type = await document.getElementById('ztype').textContent;
    let list = document.getElementById('zhlist');
    let groups = (type == "Isolite") ? groupsI : groupsR;

    document.getElementById('zlist').value = "";
    document.getElementById('zgrp').innerText = "";
    list.innerHTML = "";


    for (let gr of groups) {
        for (let name of gr.name) {
            let option = document.createElement("option");
            option.value = name;
            list.appendChild(option)
        }
    }


}