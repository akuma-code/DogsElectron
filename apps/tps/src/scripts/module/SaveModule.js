class SaveModule {
    constructor() {
        this.data = {};
        this.savedItems = [];
        this.counter = 0;
    }

    save() {
        const name = `Calced item #${++this.counter}`;
        const saveObj = Object.fromEntries(DataStorage);
        const {
            MS,
            stv_ms,
            glass,
            w,
            h,
            system,
            type
        } = saveObj;
        this.data = {
            glass
        };
        this.data.size = {
            w,
            h
        };
        this.data.state = {
            system,
            type,
            background: document.documentElement.style.getPropertyValue('--bg-image'),
        };
        this.data.stv_ms = stv_ms;
        this.data.MS = MS;
        const savedItem = {

            glass: this.data.glass || null,
            state: this.data.state,
            size: this.data.size,
            ms_stv: this.data.stv_ms || null,
            ms_svet: this.data.MS || null,

        };

        this.savedItems.push(savedItem);
        const toLS = JSON.stringify(this.savedItems);
        localStorage.setItem('Saved', toLS);
        console.clear();
        return this.info
    };

    destruct(index = -1) {
        if (index === -1) return console.log(`saveitem not found!`)
        const item = this.savedItems[index];
        const { glass, state, size, ms_stv, ms_svet } = item;
        return { glass, state, size, ms_stv, ms_svet }


    }

    get info() {
        this.savedItems.forEach(item => console.log(
            item
        ))
        return
    }
};

const ssm = new SaveModule();