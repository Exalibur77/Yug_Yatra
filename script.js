const API_KEY = "fb415cd7174847f7ab7eae6ef0825d21";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , ()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){

    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles){

    const cardsContainer = document.getElementById('cards-container');

    const newsCardTemplate = document.getElementById('template-news-card')

    cardsContainer.innerHTML = '';
    

    articles.forEach(article => {
        
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);

        // Fill up the data present in the curr Arcticel into this cardClone
        fillData(cardClone , article);

        // append this clone of the card and push it into the cardContainer

        cardsContainer.append(cardClone);

    });

}

function fillData(cardClone , data){

    const newsImage = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-description');

    newsImage.src = data.urlToImage;
    newsTitle.innerHTML = data.title; 
    newsDescription.innerHTML = data.description;

    const date = new Date(data.publishedAt).toLocaleString("en-US" , {
        timeZone : "Asia/Jakarta"
    })

    newsSource.innerHTML = `${data.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(data.url ,  "_blank");
    })

}

let currSelectedNav = null;

function onNavItemClick(id){

    fetchNews(id);

    const NavItem = document.getElementById(id);

    // remove active class from it
    if(currSelectedNav != null){
        currSelectedNav.classList.remove('active');
    }

    currSelectedNav = NavItem;

    currSelectedNav.classList.add('active');

}

const searchButton = document.getElementById('search-button');
const newsInput = document.getElementById('news-input');

searchButton.addEventListener('click' , ()=>{

    const query = newsInput.value;

    if(!query){
        return;
    }

    fetchNews(query);

    currSelectedNav.classList.remove('active');

})