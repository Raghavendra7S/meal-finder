const mealdetails = document.getElementById("detail-meal")

const headrett = document.getElementById("headre-title")


async function getInformation() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    console.error("No ID found in URL");
    return;
  }

  const info = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  const collect = await info.json();

  const meal = collect.meals[0]; // ONE meal object
  console.log(meal)


  headrett.innerHTML = `>>${meal.strMeal.toUpperCase()}`

  const div1 = document.createElement("div")
  div1.className = "mealD";



  const div2 = document.createElement("div")
  div2.className = "div2-img"


  const imgage = document.createElement("img")
  imgage.className = "side-img";
  imgage.src = meal.strMealThumb;

  const h2 = document.createElement("h2")
  h2.className = "side-name";
  h2.textContent = meal.strMeal;


  const div4 = document.createElement("div")
  div4.className = "side-details"

  div4.appendChild(h2)

  const h3 = document.createElement("h4")
  h3.className = "side-category"
  h3.textContent = `CATEGORY: ${meal.strCategory.toUpperCase()};`

  const p2 = document.createElement("p")
  p2.className = "side-p2"
  p2.textContent = `Source: ${meal.strYoutube};`
  

  const h5 = document.createElement("h5")
  h5.className = "side-tags";
  h5.textContent = `Tags: ${meal.strTags}`;



  const div8 = document.createElement("div")
  div8.className = "order-list"

  const h33 = document.createElement("h3")
  h33.className = "oll-h3"
  h33.textContent = "Ingredients"
  div8.appendChild(h33)

  const list = document.createElement("div")
  list.className = "ol-list"

  let count = 1;

  for (let key in meal) {
    if (key.startsWith("strIngredient")) {
      const value1 = meal[key];
      if (value1 && value1.trim() !== "") {
        const it = document.createElement("div")
        it.className = "items"

        const num = document.createElement("span")
        num.className = "spans"
        num.textContent = count++;

        it.appendChild(num)
        it.append(value1)

        list.appendChild(it)
      }
    }
  }
  div8.appendChild(list)

  div2.append(imgage)
  div4.append(h2, h3, p2, h5, div8)


  const div6 = document.createElement("div")
  div6.className = "side-all"
  div6.append(div2, div4)

  const div3 = document.createElement("div")
  div3.className = "div3-instruction"

  const ol1 = document.createElement("ul")
  ol1.className = "ol1-inst"

  ol1.innerHTML += "";



  const div9 = document.createElement("div")
  div9.className = "measurement"

  const mh3 = document.createElement("h3")
  mh3.className = "mh3"
  mh3.textContent = "Measure"
  div9.appendChild(mh3)

  const div01 = document.createElement("div")
  div01.className = "mesur-item"

  let adds = "%";


  for (let ult in meal) {
    if (ult.startsWith("strMeasure")) {
      const unorder = meal[ult]
      if (unorder && unorder.trim() !== "") {
        const div02 = document.createElement("div")
        div02.className = "mes-items"

        const span2 = document.createElement("span")
        span2.className = "spanss"
        span2.textContent = adds;

        div02.appendChild(span2)
        div02.append(unorder)

        div01.appendChild(div02)


      }
    }
  }
  const dp=document.createElement("p")
  dp.className="dp";
  dp.textContent="First line \n Second line";
  dp.textContent=` ${meal.strInstructions}`;

   const h55=document.createElement("h5")
   h55.className="h55"
   h55.textContent="INSTRUCTIONS:-";

   const di=document.createElement("div")
   di.className="inst-bar"

  div9.appendChild(div01)

  div1.appendChild(div6)

  div1.appendChild(div3)
  div3.appendChild(div9)
  di.append(h55,dp)
  div1.append(di)

  mealdetails.appendChild(div1)





}
getInformation();

console.log(window.location.pathname);
