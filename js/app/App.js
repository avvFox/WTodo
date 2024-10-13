import Background from './Background.js';
import HeaderBlock from './HeaderBlock.js';
import TodoBlock from './TodoBlock.js';
import Todo from './Todo.js';
class App {

    constructor() {
        
        // BG
        this._background = new Background;
        this._background.bgUpdate();
        setInterval(() => {
            this._background.bgUpdate();
        }, 1000 * 60 * 30);
        // BG



        //HTML 
        this._app = document.createElement('div');
        this._app.id = 'app';

        this._conteiner = document.createElement('div');
        this._conteiner.classList.add('conteiner');

        this._header = new HeaderBlock().html;

        this._todo = new TodoBlock().html;

        document.body.prepend(this._app);
        this._app.prepend(this._conteiner);
        this._conteiner.prepend(this._header);
        this._conteiner.append(this._todo); 
        // ---------------------------------------
        
    }





}
export default App;