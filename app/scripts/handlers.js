class QuickAction {
    $elems = document.querySelectorAll('[data-quickaction]')
    constructor() {
        this.elems = Array.from(this.$elems);
        this.elems.forEach(elem => {
            const {
                quickaction: handler,
                eventtype
            } = elem.dataset
            if (handler && eventtype) elem.addEventListener(eventtype, this[handler].bind(this))
        })
    }

    clearInput(event) {
        event.preventDefault();
        return event.target.value = ''
    }


}

new QuickAction()