var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var addButton = e('#id-button-add')
addButton.addEventListener('click', function(){
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value

    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo, false)

    todoContainer.insertAdjacentHTML('beforeend', t)
    saveTodos()
})

var templateTodo = function(todo, done) {
    var status = ''
    if(done) {
        // 嗯， 字符串要用引号括起来。
        status = 'done'
    }
    var t = `
    <div class="todo-cell ${status}">
        <button type="button" class="todo-done">Finished</button>
        <button type="button" class="todo-delete">Delete</button>
        <span class="todo-content" contenteditable="true">${todo}</span>
    </div>
    `
    return t
}

var todoContainer = e('#id-div-container')

todoContainer.addEventListener('click', function(event){
    var target = event.target;

    if(target.classList.contains('todo-done')) {
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        saveTodos()
    } else if(target.classList.contains('todo-delete')) {
        var todoDiv = target.parentElement;
        todoDiv.remove();
        saveTodos()
    }
})

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s;
}

var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

// 现在应该干嘛
// 思路是这样的
// 一旦有删除， 和加入， 就重新遍历， localStorage的数组，
var saveTodos = function() {
    // 选出所有的， todo
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for(var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')

        var todo = {
            done: done,
            content: c.innerHTML,
        }

        todos.push(todo)
    }
    // 保存数组
    save(todos)
}

var loadTodos = function() {
    // 首先得到数组
    // 然后将他输出到页面上

    var todos = load()
    // 我得到了什么呢？
    // 得到了， innerHTML
    // 所以现在把innerHTML放进去就行了
    // 用循环写进去
    log('loadTodes')
    for( var i = 0; i < todos.length; i++) {
        var todoContainer = e('#id-div-container')
        var todo = todos[i]

        var t = templateTodo(todo.content, todo.done)

        todoContainer.insertAdjacentHTML('beforeend', t)
    }
}

// 运行 loadTodes 这个函数
loadTodos()
// 现在还有一个问题， 就是我不能， 储存样式， 所以我们要储存样式
// 怎么储存样式呢？
// 怎么获得样式呢？
