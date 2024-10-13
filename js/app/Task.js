import Todo from "./Todo.js";

class Task {
    constructor(wait = true, value, name) {
        if (wait) {
            this._html = document.createElement('li');
            this._html.classList.add('todo-list__wait','abstract-block');
            
            this._form = document.createElement('form');
            this._form.name = 'confirmTask';
            this._form.method = 'POST';
            this._form.action = '#'; 

            this._label = document.createElement('label');
            this._label.classList.add('todo-list__group-link');
           
            this._img = document.createElement('img');
            this._img.src = 'icon/ok.svg';
            this._img.alt = 'Выполнить';
            this._img.classList.add('todo-list__icon');
            
            this._input = document.createElement('input');
            this._input.type = 'submit';
            this._input.value = 'выполнить';
            this._input.name = name;
            
            this._input.classList.add('todo-list__button-hidden');

            this._text = document.createElement('p');
            this._text.classList.add('todo-list__wait-text');
            this._text.innerHTML = value;

            this._html.prepend(this._form);
            this._form.prepend(this._label);
            this._label.prepend(this._img);
            this._label.prepend(this._input);
            this._form.after(this._text);

            this.listenWait();
        
        } 
        else {
            this._html = document.createElement('li');
            this._html.classList.add('todo-list__confirm','abstract-block');
            
            this._form = document.createElement('form');
            this._form.name = 'confirmTask';
            this._form.method = 'POST';
            this._form.action = '#'; 

            this._label = document.createElement('label');
            this._label.classList.add('todo-list__group-link');
           
            this._img = document.createElement('img');
            this._img.src = 'icon/cancel.svg';
            this._img.alt = 'Выполнить';
            this._img.classList.add('todo-list__icon');
            
            this._input = document.createElement('input');
            this._input.type = 'submit';
            this._input.value = 'выполнить';
            this._input.name = name;
            this._input.classList.add('todo-list__button-hidden');

            this._text = document.createElement('p');
            this._text.classList.add('todo-list__confirm-text');
            this._text.innerHTML = value;

            this._html.prepend(this._form);
            this._form.prepend(this._label);
            this._label.prepend(this._img);
            this._label.prepend(this._input);
            this._form.before(this._text);

            this._form.addEventListener('submit', (event) => {
                event.preventDefault();
                Todo.deleteTask(+this._input.name);
                this._html.remove();
            });
        }        

    }

    listenWait() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            Todo.confirmTask(+this._input.name);
            let confirm_task = new Task(false, this._text.innerHTML, this._input.name);
            let ul = document.querySelectorAll('.todo-list__tasks');
            ul[1].append(confirm_task.html);
            this._html.remove();
            
        });
    }



    get form() {
        return this._form;
    }

    get input() {
        return this._input;
    }

    get label() {
        return this._label;
    }

    get html() {
        return this._html;
    }


}

export default Task;