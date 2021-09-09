const BASE_URL = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection")
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToy(data){
  //renders name, image and amount of likes to a div.
  //Where toys are stored
  //declaration of toy variables
  const toyName = document.createElement("H2")
  const toyImage = document.createElement("img")
  const toyLikes = document.createElement("p")
  const toyLikeBtn = document.createElement("button")

   toyName.textContent = data.name
   toyImage.src = data.image
   toyLikes.textContent = data.likes
   toyLikeBtn.textContent = "Like"
   toyLikeBtn.class = "like-btn"
   toyLikeBtn.id = data.id
   toyLikeBtn.addEventListener("click", () => likeToys(data,toyLikes))
   console.log(toyLikeBtn)
  toyCollection.append(toyName, toyImage, toyLikes, toyLikeBtn)
}

function likeToys(toy, likes){
  ++toy.likes
  likes.textContent = toy.likes
  updateLikes(toy)
  

}

function updateLikes(toy){
  fetch(`${BASE_URL}/${toy.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toy)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

function createToy(e){
  e.preventDefault()
  
  
  const newToy ={
    name:e.target['name'].value,
    image:e.target['image'].value,
    likes:0,
  }

  fetch(BASE_URL, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newToy),
  })
  .then(response => response.json())
  .then(newToy => {
    console.log('Success:', newToy);
    renderToy(newToy)
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  
  e.target.reset()

}

const subBtn = document.querySelector('.add-toy-form').addEventListener("submit", createToy)

fetch(BASE_URL)
  .then(response => response.json())
  .then(data => data.forEach(element =>  renderToy(element)))