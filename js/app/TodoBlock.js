import Task from './Task.js';
import Todo from './Todo.js';
class TodoBlock {
    constructor() {
        //localStorage.clear();
        this._html = document.createElement('main');
        this._html.classList.add('todo-list', 'abstract-block');

        this._title = document.createElement('h1');
        this._title.innerHTML = 'Список задач';
        this._title.classList.add('todo-list__title');

        this._html.append(this._title);
        this._html.append(this.addTaskBlock);
        
        this._html.append(this.todoList);
        
        this._html.append(this.groupSuccess); 
        this._html.append(this.buttonDeleteTasks);

    }

    get html() {
        return this._html;
    }

    get addTaskBlock() {
        this._taskAdd = document.createElement('ul');
        this._taskAdd.classList.add('todo-list__tasks');
        
        this._form = document.createElement('form');
        this._form.classList.add('todo-list__new'); 
        this._form.name = 'addTask';
        this._form.method = 'POST';
        this._form.action = '#';   
        
        this._input = document.createElement('input');
        this._input.classList.add('todo-list__new-add');
        this._input.type = 'text';
        this._input.name = 'task';
        this._input.placeholder = 'Введите новую задачу...';
        this._input.required = true;


        this._taskAdd.prepend(this._form);
        this._form.prepend(this._input);

        this.listenInputAdd();

        return this._taskAdd;
    }



    get todoList() {
    
        this._todoList = document.createElement('ul');
        this._todoList.classList.add('todo-list__tasks');

        for (let task of Todo.getWait()) {
            let task_block = new Task(true, task[1], task[0]);
            this._todoList.prepend(task_block.html);
            this._todoList.append(task_block.html);
        }  

        return this._todoList;
    }

    get groupSuccess() {
        this._todoListSecond = document.createElement('ul');
        this._todoListSecond.classList.add('todo-list__tasks');

        let mapSuccess = Todo.getSuccess();
        for (let entry of mapSuccess) {
            let task = new Task(false, entry[1], entry[0]);
            this._todoListSecond.prepend(task.html);
        }


        
        
        

        return this._todoListSecond;
    }

    

    listenInputAdd() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            let date = Date.now();
            let task = new Task(true, this._input.value, date);
            this._form.after(task.html)
            Todo.setWait(date, this._input.value);
            this._input.value = '';
        });
    }

    get buttonDeleteTasks() {
        this._buttonDelete = document.createElement('button');
        this._buttonDelete.classList.add('todo-list__delete-all', 'abstract-block');
        this._buttonDelete.innerHTML = 'Удалить выполненные!';
        this._buttonDelete.addEventListener('click', (event) => {
            for (let entries of Todo.getSuccess()) {
                Todo.deleteTask(entries[0]);
            }
            let all_confirm = document.querySelectorAll('.todo-list__confirm');
            for (let node of all_confirm) {
                node.remove();
            }
        });
        return this._buttonDelete;
    }

    

}

export default TodoBlock;