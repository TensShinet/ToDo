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
    var t = templateTodo(todo)

    todoContainer.insertAdjacentHTML('beforeend', t)
})

var templateTodo = function(todo) {
    var t = `
    <div class="todo-cell">
        <button type="button" class="todo-done">Finished</button>
        <button type="button" class="todo-delete">Delete</button>
        <span contenteditable="true">${todo}</span>
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
    } else if(target.classList.contains('todo-delete')) {
        var todoDiv = target.parentElement;
        todoDiv.remove();
    }
})

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
