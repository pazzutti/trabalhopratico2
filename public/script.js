document.addEventListener('DOMContentLoaded', async function() {
    try {
        const colleaguesResponse = await fetch('/colleagues');
        const colleaguesData = await colleaguesResponse.json();
        populateColleagues(colleaguesData);
        
        const carouselResponse = await fetch('/carouselContents');
        const carouselData = await carouselResponse.json();
        populateCarousel(carouselData);

        const perfilResponse = await fetch('https://api.github.com/users/pazzutti');
        const perfilData = await perfilResponse.json();
        populateProfile(perfilData);

        getApiGithub();
        
        console.log(carouselData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
function getApiGithub() {
    fetch('https://api.github.com/users/pazzutti/repos')
        .then(async res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();
            const reposContainer = document.getElementById('repos-container');
            data.forEach(item => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6 mb-4';

                col.innerHTML = `
                    <div class="card h-100" style="background-color: #4f3f68">
                        <div class="card-body" style="justify-content: space-between; margin-top:10px; background-color: #4f3f68;"> 
                            <h5 class="card-title">${item.name.toUpperCase()}</h5>
                            <h6><p>${item.description ? item.description : 'Sem descrição'}</p></h6>
                            <p class="card-text">URL: <a href="${item.html_url}" target="_blank">
                            <button id="animateBtn">${item.name.toUpperCase()}</button></a></p>
                            <p class="card-text">Data Criação: 
                                ${Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))}
                            </p>
                        </div>
                    </div>
                `;
                reposContainer.appendChild(col);
            });
        })
        .catch(e => console.error('Erro ao obter os repositórios:', e));
}


function populateProfile(perfil) {
    const profileImg = document.getElementById('profile-img');
    const profileName = document.getElementById('profile-name');
    const profileBio = document.getElementById('profile-bio');
    const profileGithub = document.getElementById('profile-github');


    profileImg.src = perfil.avatar_url;
    profileName.textContent = perfil.name || perfil.login;
    profileBio.textContent = perfil.bio || 'No bio available';
    profileGithub.href = perfil.html_url;
    
}

function populateColleagues(colleagues) {
    const colleaguesSection = document.getElementById('colleagues-container');
    colleagues.forEach(colleague => {
        const colleagueDiv = document.createElement('div');
        colleagueDiv.classList.add('col-12', 'col-md-4', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('card', 'h-100');

        const img = document.createElement('img');
        img.src = colleague.photoUrl;
        img.alt = `Photo of ${colleague.name}`;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const name = document.createElement('h5');
        name.textContent = colleague.name;
        name.classList.add('card-title');

        const link = document.createElement('a');
        link.href = colleague.githubProfileUrl;
        link.target = "_blank";
        link.textContent = "Github Profile";
        link.classList.add('btn', 'btn-primary');

        cardBody.appendChild(name);
        cardBody.appendChild(link);
        card.appendChild(img);
        card.appendChild(cardBody);
        colleagueDiv.appendChild(card);
        colleaguesSection.appendChild(colleagueDiv);
    });
}

function populateCarousel(carouselContents) {
    const carouselInner = document.getElementById('carousel-inner');

    carouselContents.forEach((item, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');

        const img = document.createElement('img');
        img.src = item.image;
        img.classList.add('d-block', 'w-100');
        img.alt = item.title;

        const carouselCaption = document.createElement('div');
        carouselCaption.classList.add('carousel-caption', 'd-none', 'd-md-block');

        const title = document.createElement('h5');
        title.textContent = item.title;

        const description = document.createElement('p');
        description.textContent = item.description;

        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = `Veja o ${item.type}`;
        link.target = "_blank";

        carouselCaption.appendChild(title);
        carouselCaption.appendChild(description);
        carouselCaption.appendChild(link);

        carouselItem.appendChild(img);
        carouselItem.appendChild(carouselCaption);

        carouselInner.appendChild(carouselItem);
    });
}
