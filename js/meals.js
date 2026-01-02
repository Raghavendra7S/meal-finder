

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const h3=document.getElementById("tit");
const details=document.getElementById("descri-tion")

const mealsDiv = document.getElementById("meals");
 const titles = document.getElementById("titles");


//safety check
if (!category) {
  titles.textContent = "No Category Found";
} else {
  titles.textContent = category + " Meals";


}
 titles.textContent = category + " Meals";


async function dataS(){
    const det= await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const store= await det.json()
    console.log(store)
    
    const adding=store.categories.find(
    ge=>ge.strCategory===category

    );
    

    if(adding){
        h3.textContent=adding.strCategory
        details.textContent=adding.strCategoryDescription
    }
    
    console.log(adding)

}
dataS()


fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then(res => res.json())
  .then(data => {

    mealsDiv.innerHTML = "";

    if (!data.meals) {
      mealsDiv.innerHTML = "<p>No meals found</p>";
      return;
    }

    data.meals.forEach(meal => {
      
      const card = document.createElement("div");
      card.className = "meal-card";
    
      card.innerHTML = `
     
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
         <h4>${meal.strMeal}</h4>
      `;

      card.addEventListener("click",()=>{
        console.log("clicked")
        window.location.href=
        `details.html?id=${meal.idMeal}`;
      })

    
    //   title.appendChild(titles)
      mealsDiv.appendChild(card);
    });
  })
  .catch(err => {
    mealsDiv.innerHTML = "<p>Something went wrong</p>";
    console.error(err);
  });
