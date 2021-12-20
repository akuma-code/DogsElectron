class AppScriptLoader {
    constructor(scripts = []) {
        this.init(scripts)
    }

    async addSrc(src) {
        const script = document.createElement('script')
        script.src = await src;
        document.head.insertAdjacentElement('beforeend', script)
    }

    init(scripts = []) {
        scripts.forEach(this.addSrc)
    }
}