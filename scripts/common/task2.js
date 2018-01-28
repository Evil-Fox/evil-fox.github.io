var task = [
  {
    "task_name": "Task # 7",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "2018-01-30",
    "task_state": "now"
  },
  {
    "task_name": "Task # 6",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "2018-01-30",
    "task_state": "closed"
  },
  {
    "task_name": "Task # 5",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "1993-11-22",
    "task_state": "overdue"
  },
  {
    "task_name": "Task # 4",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "2018-01-30",
    "task_state": "now"
  },
  {
    "task_name": "Task # 3",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "2018-01-30",
    "task_state": "closed"
  },
  {
    "task_name": "Task # 2",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "1993-11-22",
    "task_state": "overdue"
  },
  {
    "task_name": "Task # 1",
    "task_description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, magnam? Rerum tempora vel sed dicta quis tempore, at culpa, numquam distinctio earum quasi illum ipsam ipsa quisquam perspiciatis sequi consequatur.",
    "task_date": "1993-11-22",
    "task_state": "now"
  }
];

var dialog       = document.querySelector('dialog');
var blockNow     = document.getElementById('now_task');
var blockClosed  = document.getElementById('closed_task');
var blockOverdue = document.getElementById('overdue_task');
var blockTask    = document.getElementsByClassName('element_task');
var addTask      = document.getElementById('addTask');
var blockError   = document.getElementById('error');
var overdueArray = [];
var closedArray  = [];
var today        = new Date();
var checkDate    = new Date();
console.log(task);

// Выдаю ID
function addId(){
  for (var i = 0; i < task.length; i++) {
    Object.defineProperty(task[i], 'task_id', {
      writable : true,
      value : +[i]
    });
  };
};
addId();

// Добавляет новую задачу в массив и выводит в DOM
addTask.addEventListener('click', function(){
  var nameTask, descriptionTask, dateTask;
  nameTask = document.getElementById('task_name').value;
  descriptionTask = document.getElementById('task_description').value;
  dateTask = document.getElementById('task_date').value;
  var newTask = {
    task_name        : nameTask,
    task_description : descriptionTask,
    task_date        : dateTask,
    task_state       : 'now'
  }
  console.log(dateTask);
  checkDate.setTime(Date.parse(dateTask));
  if(dateTask.length == 0 || descriptionTask.length == 0 || nameTask.length == 0){
      blockError.innerHTML = `<h4>Ошибка!</h4><p>Все поля обязательны для заполнения!</p>`
  } else {
      blockError.innerHTML = '';
      task.unshift(newTask);
      addId();
      checkStatus();
      checkClick();
      console.log(task);
  };
});

// Проверяет статус задачи
function checkStatus(){
  for (var state in task) {
    if (task[state].task_state == 'now') {
        var now = task.filter(t => t.task_state == task[state].task_state);
        showNow(now);
    };
    if (task[state].task_state == 'closed') {
        var closed = task.filter(t => t.task_state == task[state].task_state);
        showClosed(closed);
    };
    if (task[state].task_state == 'overdue') {
        var overdue = task.filter(t => t.task_state == task[state].task_state);
        showOverdue(overdue);
    };
  };
};
checkStatus();

// DOM в зависимости от статуса задачи
function showNow(taskNow){
  blockNow.innerHTML = '';
  for (var i in taskNow) {
    blockNow.innerHTML += `
      <div class="element_task" data-state=${taskNow[i].task_state} data-id="${taskNow[i].task_id}" data-date="${taskNow[i].task_date}">
        <h3> ${taskNow[i].task_name} </h3>
        <p> ${taskNow[i].task_description} </p>
        <hr/>
        <input type="submit" name="editTask" value="Изменить">
        <input type="submit" name="completedTask" value="Выполнить">
        <input type="submit" name="delTask" value="Удалить">
      </div>`
  };
};
function showClosed(taskNow){
  blockClosed.innerHTML = '';
  for (var i in taskNow) {
    blockClosed.innerHTML += `
      <div class="element_task" data-state=${taskNow[i].task_state} data-id="${taskNow[i].task_id}" data-date="${taskNow[i].task_date}">
        <h3> ${taskNow[i].task_name} </h3>
        <p> ${taskNow[i].task_description} </p>
        <hr/>
        <input type="submit" name="delTask" value="Удалить">
      </div>`
  };
};
function showOverdue(taskNow){
  blockOverdue.innerHTML = '';
  for (var i in taskNow) {
    blockOverdue.innerHTML += `
      <div class="element_task" data-state=${taskNow[i].task_state} data-id="${taskNow[i].task_id}" data-date="${taskNow[i].task_date}">
        <h3> ${taskNow[i].task_name} </h3>
        <p> ${taskNow[i].task_description} </p>
        <hr/>
        <input type="submit" name="delTask" value="Удалить">
      </div>`
  };
};

// Вытаскивает кнопки смотрит клики. Вызов только после построения DOM.
function checkClick(){
  for (var i = 0; i < blockTask.length; i++){
    if (blockTask[i].getAttribute('data-state') == 'now'){
      var dataClick = blockTask[i];
      dataClick.onclick = function(event){
        var target = event.target;
        // Вытаскиваю кнопку удалить.
        if (target.getAttribute('name') == 'delTask') {
          deleteTaskNow(this);
          checkChild();
        };
        // Вытаскиваю кнопку изменить. Вызывает диалог
        if (target.getAttribute('name') == 'editTask') {
          openDialog(this.dataset.id);
        };
        // Вытаскиваю кнопку выполнить.
        if (target.getAttribute('name') == 'completedTask') {
          closedTask(this);
          checkChild();
        };
      };
    };
    if (blockTask[i].getAttribute('data-state') == 'closed'){
      var dataState = blockTask[i];
      dataState.onclick = function(event){
        var target = event.target;
        // Вытаскиваю кнопку удалить из выполненых. Вызываю удаление из узла.
        if (target.getAttribute('name') == 'delTask') {
           deleteTaskClosed(this);
           checkChild();
        };
      };
    };
    if (blockTask[i].getAttribute('data-state') == 'overdue'){
      var dataState = blockTask[i];
      dataState.onclick = function(event){
        var target = event.target;
        // Вытаскиваю кнопку удалить из просроченых. Вызываю удаление из узла.
        if (target.getAttribute('name') == 'delTask') {
           deleteTaskOverdue(this);
           checkChild();
        };
      };
    };
  };
};
checkClick();

// Удаляет узел в DOM. Вызывает удаление из массива. Вызывает новую проверку на клик.
function deleteTaskNow(blockTask){
  blockNow.removeChild(blockTask);
  rewrite(blockTask.dataset.id);
  checkClick();
};
function deleteTaskClosed(blockTask){
  blockClosed.removeChild(blockTask);
  rewrite(blockTask.dataset.id);
  checkClick();
};
function deleteTaskOverdue(blockTask){
  blockOverdue.removeChild(blockTask);
  rewrite(blockTask.dataset.id);
  checkClick();
};

// Удаляет элемент из массива. Вызывает проверку на Статус. Вызывает построение DOM.
function rewrite(id){
  task = task.filter(t => t.task_id != id);
  checkStatus();
  console.log(task);
};

// Проверяет на пустоту узлов
function checkChild(){
  if (blockNow.childNodes.length == 1){
    blockNow.innerHTML += `<h4>У вас нет задач.</h4>`
  };
  if (blockOverdue.childNodes.length == 1){
    blockOverdue.innerHTML += `<h4>Лист пуст</h4>`
  };
  if (blockClosed.childNodes.length == 1){
    blockClosed.innerHTML += `<h4>Лист пуст</h4>`
  };
};
checkChild();

// Проверяет срок выполнения. Если задача не получила дату при создании то она считаеться проваленой.
function closedTask(closedBlock){
  checkDate.setTime(Date.parse(closedBlock.dataset.date));
  if (checkDate.setHours(0,0,0,0) >= today.setHours(0,0,0,0)){
    for (var state in task) {
      if (task[state].task_id == closedBlock.dataset.id) {
        task[state].task_state = "closed";
        blockNow.innerHTML = '';
        checkStatus();
        checkClick();
      };
    };
  } else {
    for (var state in task) {
      if (task[state].task_id == closedBlock.dataset.id) {
        task[state].task_state = "overdue";
        blockNow.innerHTML = '';
        checkStatus();
        checkClick();
      };
    };
  };
};

// Закрывает диалог если отмена
document.querySelector('#closeDialog').onclick = function() {
  dialog.close();
}
// Открывает окно диалога и присвает текущие значения эементам диалога. Вызывает редактирование массива.
function openDialog(id){
  dialog.show();
  var editName = document.getElementById('edit_name');
  var editDescription = document.getElementById('edit_description');
  var editDate = document.getElementById('edit_date');
  for (var i = 0; i < task.length; i++) {
    if( task[i].task_id == id){
      editName.value = task[i].task_name;
      editDescription.value = task[i].task_description;
      editDate.value = task[i].task_date;
      editTask(task[i].task_id);
    }
  }
};

// Редактирует элемент массива и обновляет массив.
function editTask(id){
  var buttonEdit = document.getElementById('editTask');
  buttonEdit.onclick = function(){
  var editName = document.getElementById('edit_name').value;
  var editDescription = document.getElementById('edit_description').value;
  var editDate = document.getElementById('edit_date').value;
    for (var i = 0; i < task.length; i++) {
      if (task[i].task_id == id){
        task[i].task_name = editName;
        task[i].task_description = editDescription;
        task[i].task_date = editDate;
        console.log(task);
        dialog.close();
        checkStatus();
        checkClick();
      };
    };
  };
};
