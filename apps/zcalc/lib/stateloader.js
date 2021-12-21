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