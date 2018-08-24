//Background

var todoList = {
	todos: [], 

	addTodo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false,
		}); 
	},

	changeTodo: function(position, todoText) {
		this.todos[position].todoText = todoText;
	},

	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},

	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},

	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		this.todos.forEach(function(todo) {
			if (todo.completed === true) {
				completedTodos++;
			}
		});

		this.todos.forEach(function(todo) {
			if (completedTodos === totalTodos) {
				todo.completed = false;
			} else {
				todo.completed = true
			}
		});
	}
};

//GUI 

var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},

	changeTodo: function(position, todoText) {
		todoList.changeTodo(position, todoText);
		changeTodoTextInput.value = '';
		view.displayTodos();
	},

	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},

	toggleCompleted: function(position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	},

	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	},

};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';

		todoList.todos.forEach(function(todo, position) {
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';

		if (todo.completed === true) {
			todoTextWithCompletion = '(x) ' + todo.todoText;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText;
			}

		todoLi.id = position;
		todoLi.textContent = todoTextWithCompletion;
		todoLi.appendChild(this.createDeleteButton());
		todoLi.appendChild(this.createCompleteButton());
		todoLi.appendChild(this.createEditButton());
		todosUl.appendChild(todoLi); 
	}, this);
},

	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;	
	},

	createCompleteButton: function() {
		var completeButton = document.createElement('button');
		completeButton.textContent = 'Complete';
		completeButton.className = 'completeButton';
		return completeButton;
	},

	createEditButton: function() {
		var editButton = document.createElement('button');
		var todoText = document.createElement('INPUT');
		todoText.setAttribute('type', 'text');

		editButton.textContent = 'Edit';
		editButton.className = 'editButton';
		return editButton;
	},

	setUpEventListeners: function() {
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener('click', function(event) {
			var elementClicked = event.target;

			if (elementClicked.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			}

			if (elementClicked.className === 'completeButton') {
				handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
			}

			if (elementClicked.className === 'editButton') {
				console.log(parseInt(elementClicked.parentNode.id) + ', ' + 
				this.createEditButton.todoText);
			}
		});
	},
};

view.setUpEventListeners();
