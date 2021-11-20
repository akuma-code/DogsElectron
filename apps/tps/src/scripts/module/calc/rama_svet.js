const RamaSvetovoy = {

    ProLine: {
        rama: 64,
        impost: 42.5
    },

    SoftLine: {
        rama: 67,
        impost: 42.5
    },

    SoftLine82: {
        rama: 73,
        impost: 47
    },

    WHS: {
        rama: 58,
        impost: 37.5
    },

    WHS72: {
        rama: 61,
        impost: 42.5
    },

    EuroLine: {
        rama: 67,
        impost: 41
    },
};

function swsh() {
    const delta = RamaSvetovoy[getState().system];
    return function(deltabox = []) {
        const result = {
            sh: 0,
            sw: 0,
        };
        deltabox.forEach(element => {
            if (element.side === 'top' || element.side === 'bot') result.sh += element.value;
            if (element.side === 'right' || element.side === 'left') result.sw += element.value;
        });
    }
}