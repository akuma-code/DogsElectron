function loadState({
    wintype,
    fixes,
    system,
    gdepth,
    color,
    type,
    idSizeList
}) {
    const $loadElems = Array.from(document.querySelectorAll('[data-loadstate]'));
    const winState = document.querySelector(`[data-loadstate=${wintype}]`);
    winState.click()
    fixes.map(({
        id,
        state
    }) => {
        // if (state == 0) opaopa(`${id}`)
        if (state == 1) {
            document.querySelector(`#${id}`).style.opacity = 1
            document.querySelector(`#${id}`).dataset.isfix = 0
        } else {
            document.querySelector(`#${id}`).style.opacity = 0
            document.querySelector(`#${id}`).dataset.isfix = 1
        }
    })
    $loadElems.map(elem => {
        const {
            loadstate
        } = elem.dataset


        if (loadstate === 'system') elem.value = system;
        if (loadstate === 'gdepth') elem.value = gdepth;
        if (loadstate === 'zcolor') {
            const currenttype = document.getElementById('ztype').innerText;
            if (currenttype !== type) tt()
            elem.value = color;
            elem.click()
        }
    })
    Array.from(document.getElementsByClassName('size')).map(elem => {
        elem.value = idSizeList[elem.id]
    })


}

let statt = ['Proline', '30', 'Баблс', 'Rollite', 'ff'];


const statetest = {
    "color": "Аллегро(2.0)",
    "wintype": "f",
    "fixes": [{
            "id": "s1",
            "state": "1"
        },
        {
            "id": "s2",
            "state": "1"
        },
        {
            "id": "s3",
            "state": "1"
        },
        {
            "id": "sd",
            "state": "0"
        }
    ],
    "type": "Rollite",
    "grp": "E",
    "system": "Proline",
    "gdepth": "28",
    "PARTS_sizes": [{
        "w": 800,
        "h": 1500
    }],
    "glasses_OLD": [{
        "gw": 608,
        "gh": 1308
    }],
    "zhals": [{
        "zw": 586,
        "zh": 1300,
        "price": 2659
    }],
    "prices": 2659,
    "idSizeList": {
        "levo": "600",
        "pravo": "600",
        "h": "1500",
        "w": "800",
        "hpr": "1500",
        "hlv": "1500",
        "himp": "800"
    }
}


// setTimeout(() => loadState(statetest), 1500)