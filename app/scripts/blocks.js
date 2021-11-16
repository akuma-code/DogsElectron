/*
 * TODO: перенести блоки в блокс.жс 
 * TODO: очистка инпута по правой кнопке и при добавлении
 */


class DogItem {
    constructor(content = null) {
        this.update(content)
    }
    data = {
        bIndex: 0,
        checkedID: {},
        date: '',
        id: '',
        master: '',
        name: '',
        obs: '',
        summ: 0
    };
    options = {
        checked: [],
        status: {}
    };

    update(content) {
        if (!content) return
        this.data = content.data;
        this.options = content.options;
        this.id = this.data.id
    }

}

class Block {
    constructor(formInp = DogItem) {
        this.data = formInp.data;
        this.options = formInp.options;
        this.blocktype = 'none'
    }

    toHTML() {
        return `Block.toHTML not defined!!`
    }

    get block() {
        let cls = '';
        const div = document.createElement('div');
        const content = this.toHTML()
        div.innerHTML = content;
        if (this.blocktype === 'form_inputs') {
            cls = 'block_data';
            div.classList.add(cls);
        };
        if (this.blocktype === 'form_options') {
            cls = 'block_options';
            div.classList.add(cls);

        };
        return div
    }
}


class BlockDataBase {
    constructor() {
        this.pool = [];
        this.pool.length = 0;
        this.size = this.pool.length;
    }

    add(block) {
        this.pool.push(new DogItem(block))

        console.log('added', block, 'pool size:', this.pool.length);

        return block
    }

    get clear() {
        return this.pool.length = 0
    }
    get saveQuit() {

        this.pool.map((elem, index) => {
            elem.data.bIndex = index;

        })
        localStorage.setItem('savedblocks', JSON.stringify(this.pool))
        this.pool.length = 0
    };

    get quickSave() {
        return localStorage.setItem('savedblocks', JSON.stringify(this.pool))
    }
    get load() {
        const saved = JSON.parse(localStorage.getItem('savedblocks')) || [];
        return saved
    }
    loadPool() {
        const pool = this.load
        if (pool.length == 0) console.log('All dogs was killed...');

        function outblock(block) {
            const blockD = new OutBlockBuilder().makeOutBlock(block)
            return document.querySelector('#out').insertAdjacentElement("beforeend", blockD)
        };

        pool.map(item => outblock(item))
        this.pool = pool
        return
    }

    getIdIndex(searchItem) {
        return this.pool.findIndex(item => searchItem === item.data.id)
    }

    findIndex(index) {
        return this.pool[index]
    }

    remove(blockID) {
        const temp = [];
        const removeIndex = this.getIdIndex(blockID);
        this.pool.forEach((item, index) => {
            if (index !== removeIndex) temp.push(item)
            else {
                console.log('removed: ', item.id)
                item = null
            }
        });
        this.pool.length = 0;
        this.pool = temp;
        return this.pool
    }
}


/**подБлок с данными */
class Outblock_data extends Block {
    constructor(data = Block) {
        super(data)
        this.blocktype = 'form_inputs'
    }

    toHTML() {
        return `<fieldset data-form-name='data'>
<legend>
<div class='block_data_line'>
<span data-block-data='id' style="font-size: larger;text-shadow: 1px 1px 1px #999;"> ${this.data.id || ''}</span><nobr>
</div>
</legend>
<div class='block_data_list'>
<div class='block_data_line'><span>Заказчик:</span><span data-block-data='name'> ${this.data.name ||''}</span></div>
<div class='block_data_line'><span>Готовность:</span><span data-block-data='date'>${this.data.date || ''}</span></div>
<div class='block_data_line'><span>Стоимость:</span><span data-block-data='summ'>${this.data.summ || ''} руб.</span></div>
<div class='block_data_line'><span>Ведет:</span><span data-block-data='master' style="color:deepskyblue">${this.data.master || ''}</span></div>
<div class='block_data_line'><span>Проверка:</span><span data-block-data='control' data-getvalue='control' style="color:red">${this.data.obs || ''}</span></div>
</div>
</fieldset> 
`
    }

};
/**подБлок с опциями */
class Outblock_options extends Block {
    constructor(data) {
        super(data)
        this.blocktype = 'form_options'
    };

    toHTML() {
        let list = '';
        const times = getDeadline(this.options.checked)
        const max = times[0].name
        const maxDate = times[0].time;
        this.data.deadlineDate = getDeadLineDate(this.data.date, maxDate)
        this.options.checked.map(elem => {
            if (elem === max) list += `<div class='block_options__elem maxdl'>${elem}</div>`
            else list += `<div class='block_options__elem'>${elem}</div>`
        })
        return list
    }

}
/**подБлок контроля */
class Outblock_control {
    constructor(data) {
        this.content = data
        this.observer = getCorrectorUser(this.content.master) || ''

    }

    toHTML() {
        const state = this.content.options.status
        const obs = this.content.data.obs
        const props = this.content.data.props || [];
        const blockProps = props.map(item => `<span onclick="this.remove()">${item}</span>`)
        const {
            prov,
            correct,
            disp
        } = state;
        const checkblock = (
            prov = false,
            correct = false,
            disp = false,

        ) => `<fieldset>
                <legend class="control_props">${blockProps.join('')}</legend>
               <form data-form-name='control'>
                 <label><input type='checkbox' name="prov" data-check='prov' ${(prov) ? 'checked' : ''}></input>проверка</label>
                 <label><input type='checkbox' name="correct" data-check='correct' ${(correct) ? 'checked' : ''}></input>отправлен</label>
                 <label><input type='checkbox' name="disp" data-check='disp' ${(disp) ? 'checked' : ''}></input>подтвержден</label>
                 <input type="button" value="DONE!" disabled>
               </form>
             </fieldset>`;

        return checkblock(
            prov,
            correct,
            disp
        )
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_control');
        div.innerHTML += content;
        return div


    }

}

class OutBlockBuilder {
    makeOutBlock(block) {
        const OutBlockDiv = document.createElement('div');

        const datablock = new Outblock_data(block).block;
        const optionsblock = new Outblock_options(block).block;
        const control = new Outblock_control(block).block;

        const status = block.options.status || {};

        OutBlockDiv.classList.add('out_block');
        if (!warningDeadline(block)) OutBlockDiv.classList.add('deadline');

        OutBlockDiv.oncontextmenu = (event) => {
            if (event.altKey) OutBlockDiv.remove()
            if (event.ctrlKey) {
                event.currentTarget.remove()
                bdb.remove(block.data.id)
            }
        };

        OutBlockDiv.addEventListener('click', event => {
            const currentTarget = event.currentTarget;
            const control_bl = currentTarget.querySelector('[data-form-name=control]');
            const blockbtn = currentTarget.querySelector('input[type=button]');
            isDone(control_bl);

            blockbtn.onclick = () => {
                currentTarget.remove();
                bdb.remove(block.data.id)
            };

            //! check control status
            if (event.target.matches('input[type=checkbox]')) {
                status[event.target.name] = (event.target.checked) ? true : false;
                block.options.status = status
            }

            bdb.quickSave

        }, true);

        [datablock, optionsblock, control].forEach(item => OutBlockDiv.insertAdjacentElement('beforeend', item))

        return OutBlockDiv
    }
};


const bdb = new BlockDataBase();