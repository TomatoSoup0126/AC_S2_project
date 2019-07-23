const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const data = []
const dataPanel = document.getElementById('data-panel')
const pagination = document.getElementById('pagination')
const lucky = document.getElementById('lucky')
const displayToggle = document.getElementById('display-toggle')

let ITEM_PER_PAGE = 8
let paginationData = []
let displayMode = 'card' //'list'
let focusPage = 1



function getFriends() {
  axios.get(INDEX_URL)
    .then((response) => {
      console.log(response)
      data.push(...response.data.results)
      console.log(data)
      console.log(data[0])
      // displayUserList(data)
      getTotalPages(data)
      getPageData(1, data)
    })
    .catch((err) => {
      console.log(err)
    })
}

function getRandomFriends() {
  let randomFriends = []
  axios.get(INDEX_URL)
    .then((response) => {
      data.push(...response.data.results)
      for (let i = 0; i < 8; i++) {
        randomFriends.push(data[randomNumRange(0, 199)])
      }
      getTotalPages(randomFriends)
      getPageData(1, randomFriends)
    })
    .catch((err) => {
      console.log(err)
    })
}






function displayUserList(data) {
  let htmlContent = ''
  if (displayMode === 'card') {
    data.forEach(item => {
      htmlContent += `
      <div class="card bg-dark text-white border-primary my-2 mx-2">
        <img src="${item.avatar}" class="card-img" alt="user avatar">
        <div class="card-img-overlay">
          <h4 class="card-text  d-block">${item.name}</p>
        </div>
        <div class="card-img-overlay">
          <button type="button" class="btn btn-default float-right btn-circle btn-showuser" data-toggle="modal" data-target="#show-user-modal" data-id="${item.id}">...</button>
          <button class="btn btn-default btn-circle btn-add-favorite float-right" id="likeButton" data-id="${item.id}"><i class="fa fa-heart" aria-hidden="true"></i></button>
        </div>
      </div>
    `
    })
    dataPanel.innerHTML = htmlContent
  } else if (displayMode === 'list') {
    htmlContent += `
    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
        <th scope="col">Age</th>
        <th scope="col">Birthday</th>
        <th scope="col">Region</th>
        <th scope="col">Created at</th>
        <th scope="col">updated at</th>
        <th scope="col"></th>
        <th scope="col"></th>
       </tr>
     </thead>
      <tbody>
    `
    data.forEach(item => {
      htmlContent += `
      <tr>
        <td>
          <div>
            <img src="${item.avatar}" class="img-fluid thumbnails float-none" alt="Responsive image"
         </div>
        </td>
        <td>${item.name} ${item.surname}</td>
        <td>${item.gender}</td>
        <td>${item.age}</td>
        <td>${item.birthday}</td>
        <td><a href="https://www.google.com.tw/maps/place/${item.region}" target="_blank">${item.region}</a></td>
        <td>${item.created_at.slice(0, 10)}</td>
        <td>${item.updated_at.slice(0, 10)}</td>
        <td><button type="button" class="btn btn-default float-right btn-circle btn-showuser" data-toggle="modal" data-target="#show-user-modal" data-id="${item.id}">...</button></td>
        <td><button class="btn btn-default btn-circle btn-add-favorite float-right" id="likeButton" data-id="${item.id}"><i class="fa fa-heart" aria-hidden="true"></i></button></td>
      </tr>
      `
    })
    htmlContent += `
        </tbody>
      </table>
    `
    dataPanel.innerHTML = htmlContent
  }

}

function showUser(id) {
  // get elements
  const modelTarget = document.getElementById('show-user-information')
  const modalTitle = document.getElementById('show-user-title')
  const modalImage = document.getElementById('show-user-image')
  const modalCreated = document.getElementById('show-user-created')
  const modalUpdated = document.getElementById('show-user-updated')

  // set request url
  const url = INDEX_URL + id
  console.log(url)

  // send request to show api
  axios.get(url).then(response => {
    console.log(response)
    const data = response.data
    console.log(data)
    //insert data into modal ui
    modalTitle.innerHTML = `<h5 class="modal-title" id="show-user-title">${data.name} ${data.surname}</h5>`
    modalImage.innerHTML = `<img src="${data.avatar}" class="img-fluid" alt="Responsive image">`

    let htmlContent = `
    <h6>Gender : ${data.gender}</h6>
    <h6>Age : ${data.age}</h6>
    <h6>Birthday : ${data.birthday}</h6>
    <h6>Region : <a href="https://www.google.com.tw/maps/place/${data.region}" target="_blank">${data.region}</a></h6>
  
    `
    modelTarget.innerHTML = htmlContent
    modalCreated.textContent = `Created at : ${data.created_at.slice(0, 10)}`
    modalUpdated.textContent = `updated at : ${data.updated_at.slice(0, 10)}`
  })
}

function getTotalPages(data) {
  let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
  let pageItemContent = ''
  for (let i = 0; i < totalPages; i++) {
    pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
  }
  pagination.innerHTML = pageItemContent
}

function getPageData(pageNum, data) {
  let offset = (pageNum - 1) * ITEM_PER_PAGE
  let pageData = data.slice(offset, offset + ITEM_PER_PAGE)
  displayUserList(pageData)
}

function changColor(node) {
  if (node.style.color === 'red') {
    node.style.color = 'black'
  } else if ((node.style.color !== 'red')) {
    node.style.color = 'red'
  }
}

function randomNumRange(min, max) { //限制範圍的生成隨機數
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function modeFlag(node) {
  if (node.className.indexOf('cardMode') === 23) {
    console.log(node.className.indexOf('cardMode'))
    displayMode = 'card'
  } else {
    console.log(node.className.indexOf('cardMode'))
    displayMode = 'list'
  }
}

// listen to data panel
dataPanel.addEventListener('click', (event) => {
  if (event.target.matches('.btn-showuser')) {
    console.log(event.target.dataset.id)
    showUser(event.target.dataset.id)
  } else if (event.target.matches('.fa-heart')) {
    changColor(event.target)
  } else if (event.target.matches('.btn-add-favorite')) {
    changColor(event.target.firstChild)
  }
})

pagination.addEventListener('click', event => {
  console.log(event.target.dataset.page)
  if (event.target.tagName === 'A') {
    focusPage = event.target.dataset.page
    console.log(`focusPage now is ${focusPage}`)
    getPageData(event.target.dataset.page, data)
  }
})

lucky.addEventListener('click', (event) => {
  getRandomFriends()
})

displayToggle.addEventListener('click', event => {
  if (event.target.className.indexOf('fa') === 0) {
    modeFlag(event.target.parentNode)
    getTotalPages(data)
    getPageData(focusPage, data)
  } else {
    modeFlag(event.target)
    getTotalPages(data)
    getPageData(focusPage, data)
  }
})

getFriends()