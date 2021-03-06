// TODO:
// 1. Change users array to array of objects;
//    E.g. [{ name: 'IselDrew', isChecked: false }, {...}, ...]
// 2. Add list of users with line-through for those, who has isChecked: true;
// 3. Redo Reload without refreshing page;
// 4. Rewrite Reload button; || done!

(function() {
  const sounds = [
    'memeSound1.mp3',
    'skyrimSound1.mp3',
    'skyrimSound2.mp3',
    'warcraftSound1.mp3',
    'warcraftSound2.mp3',
    'witcherSound1.mp3', 
    'witcherSound2.mp3' 
  ];
  function getRandomSound() {
    const randomNumber = Math.floor(Math.random() * sounds.length);
    return sounds[randomNumber];
  }

  function playSound() {
    const randomSound = getRandomSound();
    const sound = new Audio(`sounds/${randomSound}`)
    sound.play();
  }

  let users = [
    "iseldrew",
    "oksanakozhukh",
    "antonpanchenk0",
    "giruta",
    "staspitsyk",
    "alexandrkrivobok",
    "alekseypetrenko",
    "maslovakat",
    "kolesnicknick",
  ]
  let userList = []

  const chooseButton = document.querySelector(".choose-button")

  function getAllUsers() {
    const promises = users.map(user => loadUser(user))

    Promise.all(promises)
      .then(results => {
        userList = results
        console.log(results)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function loadUser(pickedUser) {
    const link = "https://api.github.com/users/" + pickedUser
    return fetch(link)
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  function handleClick() {
    if (chooseButton.textContent === "Reload") {
      reloadPage()
    }
    if (!userList.length) {
      const sound = new Audio(`sounds/warcraftSoundError.mp3`)
      sound.play();
      chooseButton.textContent = "Reload"
      showMessage("No Users Left")
    } else {
      playSound();
      getRandomUser()
    }
  }

  function getRandomUser() {
    const randomNumber = Math.floor(Math.random() * userList.length)
    const user = userList[randomNumber]
    userList = userList.filter(item => item !== user)

    addUserToDOM(user)
  }

  function reloadPage() {
    location.reload() // rewrite this function
  }

  function addUserToDOM(user) {
    const output = `<div class="user"> 
        <a href="${user.html_url}" target="_blank">  
          <div class="img-wrapper"> 
            <img src="${user.avatar_url}"> 
          </div> 
        </a> 
        <br>  
        <h1>${user.login}</h1> 
      </div>`

    document.querySelector(".users").innerHTML = output
  }

  function showMessage(msg) {
    const output = `<h1>${msg}</h1>`
    document.querySelector(".users").innerHTML = output
  }

  chooseButton.addEventListener("click", handleClick)
  getAllUsers()
})()
