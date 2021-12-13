function loadState({
    wintype,
    system,
    gdepth,
    color,
    type,
}) {
    const $loadElems = Array.from(document.querySelectorAll('[data-loadstate]'));
    $loadElems.map(elem => {
        const {
            loadstate
        } = elem.dataset
        if (loadState === 'wintype') {

            let cfg = document.querySelector(`[data-cfg="${wintype}"]`)
            cfg.click()
        }

        if (loadstate === 'system') elem.value = system;
        if (loadstate === 'dpt') elem.value = gdepth;
        if (loadstate === 'zcolor') {
            const currenttype = document.getElementById('ztype').innerText;
            if (currenttype !== type) tt()
            elem.value = color;
            elem.click()
        }
    })
}

let statt = ['Proline', '30', 'Баблс', 'Rollite', 'ff'];


const statetest = {

    "color": "Бетти",
    "wintype": "ff",
    "type": "Rollite",
    "grp": "E",
    "system": "Proline",
    "gdepth": "28",
    "PARTS_sizes": [{
            "w": 1231,
            "h": 1500
        },
        {
            "w": 631,
            "h": 1500
        }
    ],
    "glasses_OLD": [{
            "gw": 430,
            "gh": 1308
        },
        {
            "gw": 461,
            "gh": 1308
        }
    ],
    "zhals": [{
            "zw": 408,
            "zh": 1300,
            "price": 2465
        },
        {
            "zw": 439,
            "zh": 1300,
            "price": 2465
        }
    ],
    "prices": 4930
}


// setTimeout(() => loadState(statetest), 1500)