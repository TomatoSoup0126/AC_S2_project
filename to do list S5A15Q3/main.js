// init
let toDoList = document.querySelector('#my-todo')
let doneList = document.querySelector('#my-done')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash"></i>
  `
  toDoList.appendChild(newItem)
}

//用trim去頭尾空格來驗證是否有任一字符存在於input中
function inputCheck() {
  let inputCheck = document.querySelector('#newTodo').value.trim()
  if (inputCheck) {
    return true
  } else {
    return false
  }
}

//清空輸入欄位
function clearField(input) {
  input.value = "";
}

// Create
const addBtn = document.querySelector('#addBtn')

addBtn.addEventListener('click', function (event) {
  console.log(this)
  console.log(event.target)
  let inputValue = document.querySelector('#newTodo').value
  console.log(inputValue)
  if (inputCheck()) {
    addItem(inputValue)
    clearField(document.querySelector('#newTodo'))
  } else {
    alert('您尚未輸入文字')
  }
})

//enter鍵觸發
window.addEventListener('keypress', function (event) {
  let key = event.which || event.keyCode;
  if (key === 13) {
    console.log(this)
    console.log(event.target)
    let inputValue = document.querySelector('#newTodo').value
    console.log(inputValue)
    if (inputCheck()) {
      addItem(inputValue)
      clearField(document.querySelector('#newTodo'))
    } else {
      alert('您尚未輸入文字')
    }
  }
})


// Delete and check(ToDos)
toDoList.addEventListener('click', function (event) {
  console.log(this)
  console.log(event.target)
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement
    li.remove()
  } else if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked')
  }
  transferItemToDone()

})

function transferItemToDone() {
  if (event.target.classList.contains('checked')) {
    let doneli = event.target.parentElement
    console.log(doneli)
    doneList.appendChild(doneli)
  }
}

// Delete and uncheck(Done)
doneList.addEventListener('click', function (event) {
  console.log(this)
  console.log(event.target)
  if (event.target.classList.contains('delete')) {
    let li = event.target.parentElement
    li.remove()
  } else if (event.target.tagName === 'LABEL') {
    event.target.classList.toggle('checked')
  }
  transferItemBack()
})

function transferItemBack() {
  if (!(event.target.classList.contains('delete'))) {
    let toDoli = event.target.parentElement
    console.log(toDoli)
    toDoList.appendChild(toDoli)
  }
}

//All check and All uncheck
function allCheck() {
  let allItem = document.querySelectorAll('li')
  for (let i = 0; i < allItem.length; i++) {
    doneList.appendChild(allItem[i])
    allItem[i].firstElementChild.classList.add('checked')
  }
}

function allUncheck() {
  let allItem = document.querySelectorAll('li')
  for (let i = 0; i < allItem.length; i++) {
    toDoList.appendChild(allItem[i])
    allItem[i].firstElementChild.classList.remove('checked')
  }
}

const allcheck = document.querySelector('#allCheck')
const alluncheck = document.querySelector('#allUncheck')

allcheck.addEventListener('click', function (event) {
  allCheck()
})

alluncheck.addEventListener('click', function (event) {
  allUncheck()
})