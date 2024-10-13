class Todo {
    static name_ls_wait = 'db_wait';
    static name_ls_success = 'db_success';


    // Все ключи и значения wait объектом map
    static getWait() {
        let arr = [];
        let ls = localStorage.getItem(Todo.name_ls_wait);
        
        if (ls) arr = JSON.parse(ls);
        
        let map = new Map(arr);
        
        return map;
    }

    // Добавить ключи и значения объектом map
    static setWait(key, value) {
        let mapWait = Todo.getWait();
        mapWait.set(key, value);
        Todo.mapAsJson(mapWait);
        localStorage.setItem(Todo.name_ls_wait, Todo.mapAsJson(mapWait));

    }

    static getSuccess() {
        let arr = [];
        let ls = localStorage.getItem(Todo.name_ls_success);
        
        if (ls) arr = JSON.parse(ls);
        
        let map = new Map(arr);
        
        return map;
    }

    static setSuccess(key, value) {
        let mapSuccess = Todo.getSuccess();
        mapSuccess.set(key, value);
        Todo.mapAsJson(mapSuccess);
        localStorage.setItem(Todo.name_ls_success, Todo.mapAsJson(mapSuccess));

    }

    static mapAsJson(map) {
        let mapAsArray = Array.from(map.entries());
        let arrayAsJson = JSON.stringify(mapAsArray);
        return arrayAsJson; 
    }

    // Подтвердить задачу по ключу timestamp
    static confirmTask(key) {
            let tasks_wait = Todo.getWait();
            if (!tasks_wait.has(key)) throw new Error(`Нет ключа ${key} в localStorage wait`);
            else {
                Todo.setSuccess(key, tasks_wait.get(key));
                tasks_wait.delete(key);
                let json = Todo.mapAsJson(tasks_wait);
                localStorage.setItem(Todo.name_ls_wait, json);
                return key;
            }
            
    }

    // Удалить выполненную задачу по ключу timestamp 
    static deleteTask(key) {        
        let task_success = Todo.getSuccess();
        if (!(task_success.delete(key))) throw new Error('Не удалось удалить из выполненных '+key); 
        let json = Todo.mapAsJson(task_success);
        localStorage.setItem(Todo.name_ls_success, json);
        return key;
    }




    




}
export default Todo;