class zBlock {
    constructor() {
        this.id = null
        this.data = null
    }
    get HTML() {
        return `NOT DEFINED!`
    }
}

class ZApp {
    constructor(model = []) {
        this.blocks = model
    }
    init() {
        const outmodule = new OutputModule('#outside');
        outmodule.renderOut(this.blocks)
    }


}

class OutputModule {
    constructor(selector) {
        this.$out = document.querySelector(selector)
    }

    renderOut(blocks) {
        this.$out.innerHTML = '';
        blocks.forEach(block => {
            this.$out.insertAdjacentElement('beforeend', block)
        });
    }
}

class BlocksFF {
    constructor() {
        this.items = []
    }
    getBlocks(conteiner = OutContainer.cont) {
        this.blocks = conteiner.map(item => item.HTML)
        return this.blocks
    }

}