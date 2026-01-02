const openbtn = document.getElementById("open")
const closebtn = document.getElementById("close")

const sidebar = document.getElementById("open-sidebar")

const searcbar = document.getElementById("searchBar")
const serbtn = document.getElementById("search")
const describ = document.getElementById("description")
const cat = document.getElementById("categories")



let categorie = []

async function categoryData() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  const data = await response.json()
  categorie = data.categories;
  console.log(categorie)
   side();
  images(categorie)

}
let sidebox = [];

function side() {
  sidebox = categorie.map(item => item.strCategory)
  renderSideBar(sidebox)
  console.log(sidebox)
}



openbtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");

})

function renderSideBar(data) {
   sidebar.innerHTML = "";
  let index = 0;


  const interval = setInterval(() => {
    if (index < data.length) {
     
     
      const a = document.createElement("a")
      a.className = "sideancher"
      a.textContent = data[index];
      const btn=document.createElement("button")
      btn.textContent="X"
      btn.className="closec"       
      sidebar.appendChild(btn);
      sidebar.appendChild(a);


      index++;

      btn.addEventListener("click",function(){
        sidebar.classList.remove("active")
      })
    } else {
      clearInterval(interval)
    }

  }, 200);

}
categoryData()

sidebar.addEventListener("click", (e) => {
  if (!e.target.classList.contains("sideancher")) return;

  e.preventDefault();

  const value = e.target.textContent.trim().toLowerCase();

  describ.replaceChildren();

  const matched = categorie.find(item =>
    item.strCategory.toLowerCase() === value
  );

  if (!matched) {
    describ.textContent = "Description not found";
    return;
  }
  const p = document.createElement("p");
  p.className = "p-disc";
  p.textContent = matched.strCategoryDescription;

  describ.appendChild(p);
  sidebar.classList.remove("active");

})


function image(data) {
  describ.innerHTML = "";

  data.forEach(item => {
    const img = document.createElement("img");
    img.className = "desimg"
    img.src = item.strCategoryThumb;
    img.alt = item.strCategory;

    const name = document.createElement("h3")
    name.className = "descname"
    name.textContent = item.strCategory;
    describ.appendChild(name)
    describ.appendChild(img);


  });
}
serbtn.addEventListener("click", () => {
  const value = searcbar.value.toLowerCase()

  describ.replaceChildren();


  const match = categorie.find(item =>
    item.strCategory.toLowerCase() === value
  );
  if (!match) {
    describ.textContent = "category not found";
    return;
  }
  image([match]);

  searcbar.value = "";

})


function images(data) {
  cat.innerHTML = "";

  data.forEach(images => {

    //card div
    const card = document.createElement("div")
    card.className = "card";

    //image
    const img = document.createElement("img")
    img.className = "cimges"
    img.src = images.strCategoryThumb;
    img.alt = images.strCategory;

    //namebar
    const name = document.createElement("h3")
    name.textContent = images.strCategory;

    card.addEventListener("click", () => {
      console.log("Clicked:", images.strCategory); // DEBUG
       window.location.href =
        `/meal-finder/html/meals.html?category=${images.strCategory}`;
    });

   
    //append
    card.appendChild(name)
    card.appendChild(img)
    cat.appendChild(card);
  })
   
}





