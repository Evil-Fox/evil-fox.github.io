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

var dialog = document.querySelector('dialog');
var blockNow = document.getElementById('now_task');
var blockClosed = document.getElementById('closed_task');
var blockOverdue = document.getElementById('overdue_task');
var blockTask = document.getElementsByClassName('element_task');
var overdueArray = [];
var closedArray = [];
console.log(task);

// Добавляет новую задачу в массив и выводит в DOM
var addTask = document.getElementById('addTask');
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
  task.unshift(newTask);
  checkStatus();
  checkClick();
  console.log(task);
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
      <div class="element_task" data-state=${taskNow[i].task_state} data-task-name="${taskNow[i].task_name}" data-date="${taskNow[i].task_date}">
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
      <div class="element_task" data-state=${taskNow[i].task_state} data-task-name="${taskNow[i].task_name}" data-date="${taskNow[i].task_date}">
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
      <div class="element_task" data-state=${taskNow[i].task_state} data-task-name="${taskNow[i].task_name}" data-date="${taskNow[i].task_date}">
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
        };
        // Вытаскиваю кнопку изменить. Вызывает диалог
        if (target.getAttribute('name') == 'editTask') {
          openDialog(this);
        };
        // Вытаскиваю кнопку выполнить.
        if (target.getAttribute('name') == 'completedTask') {
          closedTask(this);
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
        };
      };
    };
  };
};
checkClick();

// Удаляет узел в DOM. Вызывает удаление из массива. Вызывает новую проверку на клик.
function deleteTaskNow(blockTask){
  blockNow.removeChild(blockTask);
  rewrite(blockTask.dataset.taskName);
  checkClick();
};
function deleteTaskClosed(blockTask){
  blockClosed.removeChild(blockTask);
  rewrite(blockTask.dataset.taskName);
  checkClick();
};
function deleteTaskOverdue(blockTask){
  blockOverdue.removeChild(blockTask);
  rewrite(blockTask.dataset.taskName);
  checkClick();
};
// Удаляет элемент из массива. Вызывает проверку на Статус. Вызывает построение DOM.
function rewrite(taskName){
  task = task.filter(t => t.task_name != taskName);
  checkStatus();
  console.log(task);
};

// Проверяет срок выполнения. Если задача не получила дату при создании то она считаеться проваленой.
function closedTask(closedBlock){
  var dateTask = new Date();
  dateTask.setTime(Date.parse(closedBlock.dataset.date));
  var now = new Date();
  if (dateTask.setHours(0,0,0,0) >= now.setHours(0,0,0,0)){
    for (var state in task) {
      if (task[state].task_name == closedBlock.dataset.taskName) {
        task[state].task_state = "closed";
        blockNow.innerHTML = '';
        checkStatus();
        checkClick();
      };
    };
  } else {
    for (var state in task) {
      if (task[state].task_name == closedBlock.dataset.taskName) {
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
function openDialog(editBlock){
  dialog.show();
  var editName = document.getElementById('edit_name');
  var editDescription = document.getElementById('edit_description');
  var editDate = document.getElementById('edit_date');
  var oldName = editBlock.getElementsByTagName('h3');
  var oldNameObj = Array.from(oldName);
  var oldDescription = editBlock.getElementsByTagName('p');
  var oldDescriptionObj = Array.from(oldDescription);
  var oldDateObj = editBlock.dataset.date;
  editName.value = oldNameObj[0].innerHTML;
  editDescription.value = oldDescriptionObj[0].innerHTML;
  editDate.value = oldDateObj;
  editTask(editBlock);
};
// Редактирует элемент массива и обновляет массив.
function editTask(newBlock){
  var buttonEdit = document.getElementById('editTask');
  buttonEdit.addEventListener('click', function(){
    var editName = document.getElementById('edit_name').value;
    var editDescription = document.getElementById('edit_description').value;
    var editDate = document.getElementById('edit_date').value;
    var newTask = {
      task_name : editName,
      task_description : editDescription,
      task_date : editDate,
      task_state: 'now'
    };
    for (var i in task) {
      if (task[i].task_name == newBlock.dataset.taskName){
        task[i] = newTask;
        var edit = task[i];
        dialog.close();
        checkStatus();
        checkClick();
      };
    };
  });
};
