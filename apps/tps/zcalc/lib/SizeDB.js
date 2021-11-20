const SizeDB = { //дельта рама, шмпост, импост-створка, импост-рама, импост в створке

    d_rr(sys) { //*rama + rama
        return this[sys].dsize[0] * 2
    },
    d_ri(sys) { //*rama + impost
        return this[sys].dsize[0] + this[sys].dsize[1]
    },
    d_ii(sys) { //*impost + impost
        return this[sys].dsize[1] * 2
    },
    d_rs(sys) { //*stvorka_rama + stvorka_rama
        return this[sys].dsize[3] * 2
    },
    d_sisi(sys) { //*stvorka_impost + stvorka_impost
        return this[sys].dsize[2] * 2
    },
    d_sisr(sys) { //*stvorka_impost + stvorka_rama
        return this[sys].dsize[2] + this[sys].dsize[3]
    },
    d_doori(sys) { //*door_impost + door_full
        return this[sys].dsize[3] + this[sys].dsize[4]
    },



    "Proline": {
        "dsize": [48, 26.5, 74.5, 96, 26], //! dr, di, dsi, drs, diis
        "dpt": ["28", "36", "40"],
        "rd28": [22, 8],
        "rd36": [24, 8],
        "rd40": [32, 8],
        "idpt": [34, 34],

    },
    "Softline": {
        "dsize": [51, 26.5, 77.5, 102, 26], //! dr, di, dsi, drs, diis
        "dpt": ["28", "36", "40"],
        "rd28": [22, 8],
        "rd36": [24, 8],
        "rd40": [32, 8],
        "idpt": [34, 34],

    },
    "Premium82": {
        "dsize": [58, 32, 78, 104, 27], //! dr, di, dsi, drs, diis
        "dpt": ["40", "52"],
        "rd40": [32, 8],
        "rd52": [36, 8],
        "idpt": [34, 34],

    },
    "Euroline": {
        "dsize": [54, 28, 84.5, 110.5, 27.5], //! dr, di, dsi, drs, diis
        "dpt": ["24", "32"],
        "rd24": [22, 8],
        "rd32": [26, 8],
        "idpt": [28, 28],

    },
    "WHS60": {
        "dsize": [44, 23.5, 71.5, 92, 23], //! dr, di, dsi, drs, diis
        "dpt": ["24", "30"],
        "idpt": [30, 30],

    },
    "WHS72": {
        "dsize": [45, 25.5, 74.5, 95, 24], //! dr, di, dsi, drs, diis
        "dpt": ["24", "32", "40"],
        "rd24": [20, 8],
        "rd32": [22, 8],
        "rd40": [23, 8],
        "idpt": [34, 34],

    },
    "BasicPlus": {
        "dsize": [50, 27, 76, 99, 27], //! dr, di, dsi, drs, diis
        "dpt": ["24", "30", "38"],
        "rd24": [17, 8],
        "rd30": [23, 8],
        "rd38": [23, 8],
        "idpt": [32, 32],

    },
    "Lux": {
        "dsize": [55, 27, 81, 109, 27], //! dr, di, dsi, drs, diis
        "dpt": ["24", "30", "38"],
        "rd24": [17, 8],
        "rd30": [23, 8],
        "rd38": [23, 8],
        "idpt": [32, 32],

    },
    "TermoPlus": {
        "dsize": [55, 27, 76, 104, 22], //! dr, di, dsi, drs, diis
        "dpt": ["24", "30", "38"],
        "rd24": [23, 8],
        "rd30": [23, 8],
        "rd38": [23, 8],
        "idpt": [32, 32],

    },

    "Optima": {
        "dsize": [55, 24.5, 79, 109, 24], //! dr, di, dsi, drs, diis
        "dpt": ["24", "30"],
        "rd24": [23, 8],
        "rd30": [23, 8],
        "idpt": [32, 32],

    }
};


const Rama = {
    use: {
        "f": ["w", "h"],
        "ff": ["h", "w", "levo"],
        "fff": ["h", "w", "levo", "pravo"],
        "df": ["h", "w", "hpr", "pravo", "himp"],
        "dff": ["h", "w", "levo", "pravo", "hpr", "himp"],
        "fdf": ["h", "w", "levo", "pravo", "himp", "hlv", "hpr"],
    },

}