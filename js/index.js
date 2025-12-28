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

            sidebar.appendChild(a);
            index++;
        } else {
            clearInterval(interval)
        }

    }, 200);

}
categoryData()






function showSidebarImages(categoryName) {
  cat.innerHTML = "";       // clear old images
  describ.innerHTML = "";  // clear description

  const matched = categorie.find(
    item => item.strCategory === categoryName
  );

  if (!matched) {
    cat.textContent = "No image found";
    return;
  }

  images([matched]); // send single item as array
}
 

 sidebar.addEventListener("click", (e) => {
  if (e.target.classList.contains("sideancher")) {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    const selectedCategory = e.target.textContent;
    console.log("Clicked:", selectedCategory); // DEBUG

    showSidebarImages(selectedCategory);
    sidebar.classList.remove("active");
  }
});


serbtn.addEventListener("click", () => {
  const value = searcbar.value.toLowerCase();

  describ.innerHTML = ""; // clear old description
  cat.innerHTML = "";     // clear images

  const matched = categorie.find(
    item => item.strCategory.toLowerCase() === value
  );

  if (!matched) {
    describ.textContent = "Category not found";
    return;
  }

  const p = document.createElement("p");
  p.className = "p-disc";
  p.textContent = matched.strCategoryDescription;

  describ.appendChild(p);

  
  searcbar.value = ""; // 🔥 auto refresh input
});




  

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

        //append
        card.appendChild(name)
        card.appendChild(img)
        cat.appendChild(card);
    })
}





