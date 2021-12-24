class AppScriptLoader {
    constructor(scripts = []) {
        this.$help = document.querySelector('[data-handler=showhelp]')
        this.init(scripts)
    }

    async addSrc(src) {
        const script = document.createElement('script')
        script.src = await src;
        document.head.insertAdjacentElement('beforeend', script)
    }

    init(scripts = []) {
        scripts.forEach(this.addSrc);
    }

    initHandlers() {

    }




}

class HelpDesk {
    constructor() {
        this.$btn = document.querySelector('button[data-handler]');
        this.$desk = document.querySelector('#hd');


        this.$btn.onclick = this.clickHandler.bind(this);
        this.$desk.onclick = this.deskHide.bind(this)
    }

    getImg() {
        const div = document.createElement('div');
        div.id = 'helpcont'
        const imgElem = document.createElement('img')
        imgElem.src = './img/helpdesk/zCalcHelp.jpg';
        imgElem.className = "helpimg";
        div.insertAdjacentElement('afterbegin', imgElem)
        return div
    }

    clickHandler() {

        this.$desk.innerHTML = '';
        this.$desk.insertAdjacentElement('afterbegin', this.getImg())
        this.$desk.style.display = 'block';

    }

    deskHide() {
        return this.$desk.style.display = 'none';

    }
}