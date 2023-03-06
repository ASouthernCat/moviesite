const APILINK = 'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn';
// const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.wmdb.tv/api/v1/movie/search?q="
// "https://api.themoviedb.org/3/search/movie?&api_key=b297eb0ae1b3ac78a234c98886aced03&query=";

const main= document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");
const intro_img = document.getElementById("img");
const decription = document.getElementById("description");

returnMovies(APILINK);
clickCard();
function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    console.log(data);
    data.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class','card');
        
        const div_row =document.createElement('div');
        div_row.setAttribute('class','row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class','column');

        const image = document.createElement('img');
        image.setAttribute('class','thumbnail');
        image.setAttribute('id','image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        // title.textContent = `${element.data[0].name}`;
        title.innerHTML = `${element.data[0].name}<br><a class="intro" onclick="show_introCard()">简介</a>`
        image.src = element.data[0].poster;
        // console.log(element.data[0].poster);

        main.appendChild(div_row);
        div_row.appendChild(div_column);
        div_column.appendChild(div_card);
        div_card.appendChild(image);
        div_card.appendChild(title);
        
        div_card.addEventListener('click', event => {
            // console.log(event.target);
            if(event.target.className === "intro"){
                console.log(element.data[0].shareImage);
                intro_img.src = element.data[0].shareImage;
                decription.textContent = '【'+element.data[0].name +'】--'+element.data[0].genre+'--（'+element.dateReleased
                +'）--'+ element.data[0].description;
            }
            else
            window.open("https://www.pkmp4.xyz/vs/-------------.html?wd="+element.data[0].name);
          })
    });
    });
}

form.addEventListener("submit",(e) =>{
    e.preventDefault();
    main.innerHTML = '';
    const searchItem = search.value;
    if(searchItem){
        returnMovies(SEARCHAPI+searchItem);
        // search.value = "";
    }
    else
    returnMovies(APILINK);
});

function clickCard(){
    document.querySelectorAll('.card').forEach(item => {
        item.addEventListener('click', event => {
          //handle click
          console.log(event.target.className);
          const title = document.getElementById("title").textContent;
        console.log(title);
        // window.open("https://www.pkmp4.xyz/vs/-------------.html?wd="+title);
        })
      });
}

function show_introCard(){ 
    if(document.getElementById("img_bg").style.display=="block"){ 
      document.getElementById("img_bg").style.display="none"; 
    }
    else{
      document.getElementById("img_bg").style.display="block"; 
    } 
  }

function close_introCard(){
    document.getElementById("img_bg").style.display="none";
}
