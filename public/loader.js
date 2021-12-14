const {
    ipcRenderer,
} = require("electron");



function ver() {
    const div = document.createElement('div');
    div.id = 'vers'
    div.insertAdjacentHTML('afterbegin', '<a id="patch">version: 1.2.1</a>');
    document.body.insertAdjacentElement('afterbegin', div);

    return
}

ver()

document.querySelector('#zcalc').addEventListener('click', (event) => {
    const target = event.target;
    const {
        app
    } = target.dataset;


    ipcRenderer.send('msg', `${app}`)
    ipcRenderer.on('msg', (_, ...args) => console.log('mainEvent response: ', ...args))

}, true);


document.querySelector('#tps').addEventListener('click', (event) => {
    const target = event.target;
    const {
        app
    } = target.dataset;

    ipcRenderer.send('msg', `${app}`)
    ipcRenderer.on('msg', (_, ...args) => console.log('from main.event.sender:', ...args))

}, true);

document.querySelector('#patch').addEventListener('click', (event) => {
    window.open('./patchnote.html', '_blank')
})