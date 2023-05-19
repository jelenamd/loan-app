module.exports = {
    mode: "jit",
    purge: ["./build/*.html", "./src/**/*.tsx", "./safeclasses.txt"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        spacing: {
            0: "0!important",
            px: "1px",
            0.5: "8px",
            1: "16px",
            140: "560px",
            127.75: "511px",
            65.5: "262px",
            21.5: "86px",
            22.5: "90px",
            37.25: "149px",
            4.5: "18px",
            43.75: "175px",
            120: "480px",
            95: "380px",
            38.5: "155px",
            19.25: "127.5px",
            17.5: "70px",
            18.5: "74px",
            1.563: "25px",
            46.875: "750px",
            2.5: "40px",
            0.375: "6px",
            1.375: "22px",
            1.563: "25px",
        },
        plugins: [],

        extend: {
            backgroundImage: {
                car: "url('../public/images/travel-1962321_960_720.png')",
                house: "url('../public/images/house-2374925_960_720 1.png')",
                dollar: "url('../public/images/dollar-3717534_960_720 1.png')",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
