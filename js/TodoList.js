class TodoList {

    static start() {
        TodoList.listenAddTask(); // ждем события
        TodoList.addHtmlTasks(); // получаем все задачи
    }

    constructor(title, status) {
        this._title = title;
        this._status = status || 'wait';
        this._timestamp = Date.now();
        
    }

    set title(value) {
        this._title = value;
    }

    set status(value) {
        this._status = value;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get title() {
        return this._title;
    }

    get status() {
        return this._status;
    }

    get timestamp() {
        return this._timestamp;
    }

    static save(obj) {
        try {
            let json = JSON.stringify(obj);
            if (!JSON.parse(json)) throw new Error('Неправильно переданна строка!');
            localStorage.setItem(obj._timestamp, json)
            if (!localStorage.getItem(obj._timestamp)) throw new Error('Не удалось сохранить в LocalStorage');    
            return true;
        } catch(e) {
            console.log(e);
        }
    }

    static getObjByTimestamp(timestamp) {
        return JSON.parse(localStorage.getItem(timestamp));
    }

    static addHtmlTasks() {
        let tasks = TodoList.getAllObjects();
        let tasks_wait = TodoList.onlyWaitObject(tasks);
        let tasks_confirm = TodoList.onlyConfirmObject(tasks);
        
        //Добавляем все wait tasks
        let form_add = document.querySelector('.todo-list__new');
        
        for (let i = 0; i < tasks_wait.length; i++) {
            let li = TodoList.htmlWaitTask(tasks_wait[i]._title, tasks_wait[i]._timestamp);
            form_add.after(li);
            TodoList.listenWaitTask(li);
        }

        //Добавляем все confirm task
        
        let ul_confirm = document.querySelectorAll('.todo-list__tasks')[1];
        for (let i = 0; i < tasks_confirm.length; i++) {
            let li = TodoList.htmlConfirmTask(tasks_confirm[i]._title, tasks_confirm[i]._timestamp);
            ul_confirm.append(li);
            TodoList.listenConfirmTask(li);
            
        }


        
    }

    static onlyWaitObject(arr) {
        try {
            let only_wait = [];
            if (!Array.isArray(arr)) throw new Error('Только массив с объектами!');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]._status == 'wait') only_wait.push(arr[i]);
            }
            return only_wait;
        } catch(e) {
            console.log(e);
        }
    }

    static onlyConfirmObject(arr) {
        try {
            let confirm_wait = [];
            if (!Array.isArray(arr)) throw new Error('Только массив с объектами!');
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]._status == 'confirm') confirm_wait.push(arr[i]);
            }
            return confirm_wait;
        } catch(e) {
            console.log(e);
        }
    }

    static getAllObjects() {
        let arr = [];
        for (let [key, value] of Object.entries(localStorage)) {
            let obj = JSON.parse(value);
            arr.push(obj);
        }
        return arr;
    }

    
    static listenAddTask() {
        let new_task = document.querySelector('.todo-list__new');
        new_task.addEventListener('submit',(event) => {
            event.preventDefault();
            let form = event.target;
            let input = form.querySelector('.todo-list__new-add');

            if (input.value.length > 1)  {
                let todo = new TodoList(input.value);
                TodoList.save(todo);
                let todo_html = TodoList.htmlWaitTask(todo.title, todo.timestamp)
                
                form.after(todo_html);
                
                TodoList.listenWaitTask(todo_html); 

                input.value = '';
            }
        });
    }

    static listenWaitTask(li) { 
        let form = li.firstChild;
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let input = form.querySelector('.todo-list__button-hidden');
           
            let task = TodoList.getObjByTimestamp(input.name);
            task._status = 'confirm';
            TodoList.save(task);
            li.remove();

            let ul_confirm = document.querySelectorAll('.todo-list__tasks')[1];
            let li_confirm = TodoList.htmlConfirmTask(task._title, task._timestamp)
            ul_confirm.prepend(li_confirm);
            TodoList.listenConfirmTask(li_confirm);
        });
    }

    static listenConfirmTask(li) {
        let form = li.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let input = form.querySelector('.todo-list__button-hidden');
            localStorage.removeItem(input.name);
            li.remove();
        });
    }



    static htmlWaitTask(text = 'Пример задачи', name = null) {
        let li = document.createElement('li');
        li.classList.add('todo-list__wait','abstract-block');

        let form = document.createElement('form');
        form.name = 'confirmTask';
        form.action= '#';
        form.method = 'post';
        
        let label = document.createElement('label');
        label.classList.add('todo-list__group-link');
        
        let img = document.createElement('img');
        img.src = "icon/ok.svg";
        img.classList.add('todo-list__icon');
        img.alt = 'Выполнить!';

        let input = document.createElement('input');
        input.type = 'submit';
        input.value = 'Выполнить';
        input.classList.add('todo-list__button-hidden');
        input.name = name;

        let p = document.createElement('p');
        p.classList.add('todo-list__wait-text');
        p.innerHTML = text; 


        // Собираем  
        li.prepend(form);
        form.prepend(label);
        label.prepend(img);
        label.append(input);
        li.append(p);
        return li;
    }

    static htmlConfirmTask(text = 'завершенная задача', name = null) {
        
        let li = document.createElement('li');
        li.classList.add('todo-list__confirm','abstract-block');
        
        let p = document.createElement('p');
        p.classList.add('todo-list__confirm-text');
        p.innerHTML = text; 
        
        let form = document.createElement('form');
        form.name = 'confirmTask';
        form.action= '#';
        form.method = 'post';
        
        let label = document.createElement('label');
        label.classList.add('todo-list__group-link');

        let img = document.createElement('img');
        img.src = "icon/cancel.svg";
        img.classList.add('todo-list__icon');
        img.alt = 'Удалить!';

        let input = document.createElement('input');
        input.type = 'submit';
        input.value = 'Выполнить';
        input.classList.add('todo-list__button-hidden');
        input.name = name;

        

        // Собираем
        li.prepend(p);
        li.append(form);
        form.prepend(label);
        label.prepend(img);
        label.prepend(input);

        return li;

    }


}
export default TodoList;