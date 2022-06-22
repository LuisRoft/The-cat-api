const queryParameters = [
    '?',
    'limit=5',
].join('');
const URL_API_RANDOM = `https://api.thecatapi.com/v1/images/search${queryParameters}`;
const URL_API_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const URL_API_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const URL_API_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
// const API_KEY = '8a70488c-9e68-4db0-9d36-3c1b4642850f'; //cat api
const API_KEY = '9703c064-beb5-4d04-9b37-3ffa34569884';
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {'X-API-KEY': API_KEY},
});


// Promise syntax:
// fetch(URL)
//     .then(res => res.json())
//     .then(data => {
//         const urlImage = data[0].url;
//         const img = document.querySelector('img');
//         img.src = urlImage; // DOM manipulation
//     })


//async/await syntax
async function loadRandomCats() {
    try {
        // const response = await fetch(URL_API_RANDOM);
        // const data = await response.json();

        // using axios:
        const { data, status} = await api.get(`/images/search${queryParameters}`);
        // const img = document.getElementById('image1');
        // const img2 = document.getElementById('image2');
        // const img3 = document.getElementById('image3');
        // img.src = data[0].url; // DOM manipulation
        // img2.src = data[1].url; // DOM manipulation
        // img3.src = data[2].url; // DOM manipulation
        // const btc1 = document.getElementById('button1');
        // const btc2 = document.getElementById('button2');
        // const btc3 = document.getElementById('button3');
        // const btc4 = document.getElementById('button4');
        // const btc5 = document.getElementById('button5');
        // btc1.onclick = saveFavoritecat(data[0].id);
        // btc2.onclick = saveFavoritecat(data[1].id);
        // btc3.onclick = saveFavoritecat(data[2].id);
        // btc4.onclick = saveFavoritecat(data[3].id);
        // btc5.onclick = saveFavoritecat(data[4].id); 

        //Code refactored
        const images = document.querySelectorAll(".section__random-images > article > img"); 
        const arrImages = [...images];
        arrImages.forEach((image, item) => {
            image.src = data[item].url;
        });

        const buttonToFavorite = document.querySelectorAll('.section__random-images > article > button');
        buttonToFavorite.forEach((button, index) => {
            button.onclick = () => saveFavoriteCat(data[index].id);
        })
    }
    catch (error) {
        console.log(error.message);
    }
}

async function saveFavoriteCat(id) {
    try {
        // const response = await fetch(URL_API_FAVORITES, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-API-KEY': API_KEY,
        //     },
        //     body: JSON.stringify({
        //         image_id: id,
        //     }),
        // });

        // Using axios:
        const response = await api.post('/favourites', {
            image_id: id,
        })
        
        loadFavoriteCats();
        
    }
    catch (error) {
        console.log(error.message);
    }
}

async function loadFavoriteCats() {
    try {
        // const response = await fetch(URL_API_FAVORITES, {
        //     method: 'GET',
        //     headers: {
        //         'X-API-KEY': API_KEY,
        //     },
        // });
        // const data = await response.json();

        // using axios: 
        const { data, status } = await api.get('/favourites');
        const section = document.getElementById('main-favorite-cats');
        section.innerHTML = ''; // limpia la pantalla de favoritos para cargar la nueva
        const div = document.createElement('div');
        div.classList.add('section__favorites-images');
        const h2 = document.createElement('h2');
        h2.append('Favorite cats');
        section.append(h2);


        
        data.forEach(cat => {
            //DOM manipulation            
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const textBtn = document.createTextNode('Delete favorite cat');

            
            button.append(textBtn);
            img.src = cat.image.url;
            button.onclick = () => deleteCat(cat.id);

            article.append(img);
            article.append(button);
            div.append(article)
            section.append(div);
        })        
    }
    catch (error) {
        console.log(error.message);
    }
}

async function deleteCat(id) {
    try {
        // const response = await fetch(URL_API_FAVORITES_DELETE(id), {
        //     method: 'DELETE',
        //     headers: {
        //         'X-API-KEY': API_KEY,
        //     },            
        // });

        //using axios:
        const response = await api.delete(`/favourites/${id}`);

        loadFavoriteCats();
               
    }
    catch (error) {
        console.log(error.message);
    }
}

async function uploadCatPhoto() {
    const form = document.getElementById('uploadPhotoForm');
    let formData = new FormData(form);  
    console.log(formData.get('file'));    
    // const response = await fetch(URL_API_UPLOAD, {
    //     method: 'POST',
    //     headers: {
    //         // 'Content-Type': 'multipart/form-data',c4ccf136-fc8a-4b6d-b9a3-83ac6cd4f786
    //         'X-API-KEY': API_KEY,
    //     },
    //     body: formData,
    // });
    // const data = await response.json();

    //using axios: 
    const { data, status} = await api.post('/images/upload', formData);
    if (status !== 201) {
        console.log('error ', status);
    } else {
        saveFavoriteCat(data.id);
    }
}

function photoPreview() {
    const img = document.getElementById('photoPreview');
    const form = document.getElementById('uploadPhotoForm');
    const formData = new FormData(form);
    const file = formData.get('file');
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
        img.src = reader.result;
    };
};

window.onload = loadRandomCats();
window.onload = loadFavoriteCats();
