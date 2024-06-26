document.addEventListener('DOMContentLoaded', async function() {
    try {
        const colleaguesResponse = await fetch('/colleagues');
        const colleaguesData = await colleaguesResponse.json();
        populateColleagues(colleaguesData);
        
        const carouselResponse = await fetch('/carouselContents');
        const carouselData = await carouselResponse.json();
        populateCarousel(carouselData);
        
        console.log(carouselData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function populateColleagues(colleagues) {
    const colleaguesSection = document.querySelector('.container');
    colleagues.forEach(colleague => {
        const colleagueDiv = document.createElement('div');
        colleagueDiv.classList.add('colleague');

        const img = document.createElement('img');
        img.src = colleague.photoUrl;
        img.alt = `Photo of ${colleague.name}`;

        const name = document.createElement('h3');
        name.textContent = colleague.name;

        const link = document.createElement('a');
        link.href = colleague.githubProfileUrl;
        link.target = "_blank";
        link.textContent = "Github Profile";

        colleagueDiv.appendChild(img);
        colleagueDiv.appendChild(name);
        colleagueDiv.appendChild(link);

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