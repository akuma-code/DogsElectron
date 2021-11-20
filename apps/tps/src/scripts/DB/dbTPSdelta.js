//@ts-check

const deltaStorage = {
    Svet: {
        skf: {
            dw: (-45),
            dh: (-47)
        },
        simple: {
            dw: (24),
            dh: (45)
        },
        calc(w = Number, h = Number) {
            let result = {};
            result.skf = {
                w: +w + this.skf.dw,
                h: +h + this.skf.dh
            };
            result.simple = {
                w: +w + this.simple.dw,
                h: +h + this.simple.dh
            };
            return result
        }
    },
    ProLine: {
        fix: {
            dr: 48,
            di: 26.5
        },
        stv: {
            dr: 96,
            di: 74.5,
            d_shtulp: 64,
            di_stv: 26.5,
        },
    },

    SoftLine: {
        fix: {
            dr: 51,
            di: 26.5
        },
        stv: {
            dr: 102,
            di: 77.5,
            d_shtulp: 67,
            di_stv: 26.5,
        },
    },
    SoftLine82: {
        fix: {
            dr: 58,
            di: 32
        },
        stv: {
            dr: 104,
            di: 78,
            d_shtulp: 68,
            di_stv: 27,
        },
    },
    WHS: {
        fix: {
            dr: 44,
            di: 23.5
        },
        stv: {
            dr: 92,
            di: 71.5,
            d_shtulp: null,
            di_stv: 23.5,
        },
    },
    WHS72: {
        fix: {
            dr: 45,
            di: 24.5
        },
        stv: {
            dr: 95,
            di: 74.5,
            d_shtulp: null,
            di_stv: 24.5,
        },
    },
    Euroline: {
        fix: {
            dr: 54,
            di: 28
        },
        stv: {
            dr: 110.5,
            di: 84.5,
            d_shtulp: 72.5,
            di_stv: 28,
        },
    },

};

const SvetStorage = {
    skf: {
        dw: (-45),
        dh: (-47)
    },
    simple: {
        dw: (24),
        dh: (45)
    },
    simple_whs: {
        dw: (46),
        dh: (46)
    },
    calc(w = 0, h = 0) {
        let result = {};
        result.skf = {
            w: +w + this.skf.dw,
            h: +h + this.skf.dh
        };
        result.simple = {
            w: +w + this.simple.dw,
            h: +h + this.simple.dh
        };
        result.simple_whs = {
            w: +w + this.simple_whs.dw,
            h: +h + this.simple_whs.dh
        };

        return result
    },

};


const RamaStorage = {
    stv: {
        ProLine: {
            rama: 64,
            impost: 42.5,
            dr: 96,
            di: 74.5,
            d_shtulp: 64,
            di_stv: 26.5,
            d_porog: 0,
        },

        ProLine232: {
            rama: 64,
            impost: 42.5,
            dr: 99,
            di: 77.5,
            d_shtulp: 67,
            di_stv: 26.5,
            d_porog: 0,
        },

        SoftLine: {
            rama: 67,
            impost: 42.5,
            dr: 102,
            di: 77.5,
            d_shtulp: 67,
            di_stv: 26.5,
            d_porog: 76,
        },

        SoftLine232: {
            rama: 67,
            impost: 42.5,
            dr: 102,
            di: 77.5,
            d_shtulp: 67,
            di_stv: 26.5,
            d_porog: 76,
        },

        SoftLine82: {
            rama: 73,
            impost: 47,
            dr: 104,
            di: 78,
            d_shtulp: 68,
            di_stv: 27,
            d_porog: 0,
        },

        WHS: {
            rama: 58,
            impost: 37.5,
            dr: 92,
            di: 71.5,
            d_shtulp: null,
            di_stv: 23.5,
            d_porog: 0,
        },

        WHS72: {
            rama: 61,
            impost: 42.5,
            dr: 95,
            di: 74.5,
            d_shtulp: null,
            di_stv: 24.5,
            d_porog: 0,
        },

        EuroLine: {
            rama: 67,
            impost: 41,
            dr: 110.5,
            di: 84.5,
            d_shtulp: 72.5,
            di_stv: 28,
            d_porog: 0,
        },
    },

    fix: {
        ProLine: {
            dr: 48,
            di: 26.5
        },
        ProLine232: {
            dr: 48,
            di: 26.5
        },

        SoftLine: {
            dr: 51,
            di: 26.5

        },
        SoftLine82: {
            dr: 58,
            di: 32

        },
        WHS: {
            dr: 44,
            di: 23.5

        },
        WHS72: {
            dr: 45,
            di: 24.5

        },
        EuroLine: {
            dr: 54,
            di: 28
        },
    }
};
const NetStorage = {
    ProLine: {
        skf: {
            dw: 19,
            dh: 17
        },
        simple: {
            dw: 88,
            dh: 109
        }
    },
    ProLine232: {
        skf: {
            dw: 19,
            dh: 17
        },
        simple: {
            dw: 88,
            dh: 109
        }
    },
    SoftLine: {
        skf: {
            dw: 25,
            dh: 23
        },
        simple: {
            dw: 94,
            dh: 115
        }
    },
    SoftLine82: {
        skf: {
            dw: 17,
            dh: 15
        },
        simple: {
            dw: 86,
            dh: 107
        }
    },
    EuroLine: {
        skf: {
            dw: 42,
            dh: 40
        },
        simple: {
            dw: 111,
            dh: 132
        }
    },
    WHS: {
        skf: {
            dw: 0,
            dh: 0
        },
        simple: {
            dw: 114,
            dh: 114
        }
    },
    WHS72: {
        skf: {
            dw: 23,
            dh: 21
        },
        simple: {
            dw: 108,
            dh: 98
        }
    },
}
const SS = (w = 0, h = 0) => SvetStorage.calc(w, h);
const MS_STV = (SizeObj = {}) => {
    const {
        system,
        type
    } = SizeObj;
    if (type === 'svet') return
    const {
        gw,
        gh
    } = SizeObj.glass;

    function skfg() {
        const {
            dw,
            dh
        } = NetStorage[system].skf;
        return {
            w: gw + dw,
            h: gh + dh
        }
    };

    function simpleg() {
        const {
            dw,
            dh
        } = NetStorage[system].simple;
        return {
            w: gw + dw,
            h: gh + dh
        }
    };
    return {
        skf: skfg(),
        simple: simpleg()
    }

}