document.addEventListener('DOMContentLoaded', () => {
    obtenerDatosAPI();
});

async function obtenerDatosAPI() {
    const apiKey = '2196c48de3177e4f421fd1b40d3745fe';
    const ligaID = 61;  // Ligue 1 ID
    const temporada = 2023;

    const urlEquipos = `https://v3.football.api-sports.io/teams?league=${ligaID}&season=${temporada}`;
    const urlTopScorers = `https://v3.football.api-sports.io/players/topscorers?league=${ligaID}&season=${temporada}`;
    const urlLeagueInfo = `https://v3.football.api-sports.io/leagues?id=${ligaID}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        }
    };

    try {
        const [responseEquipos, responseTopScorers, responseLeagueInfo] = await Promise.all([
            fetch(urlEquipos, options),
            fetch(urlTopScorers, options),
            fetch(urlLeagueInfo, options)
        ]);

        const dataEquipos = await responseEquipos.json();
        const dataTopScorers = await responseTopScorers.json();
        const dataLeagueInfo = await responseLeagueInfo.json();

        if (dataEquipos.response && dataTopScorers.response && dataLeagueInfo.response) {
            cargarImagenesSlide(dataEquipos.response);
            cargarInformacionCards(dataEquipos.response, dataTopScorers.response);
            configurarAccordion(dataEquipos.response, dataTopScorers.response, dataLeagueInfo.response[0]);
            cargarLogoLiga(dataLeagueInfo.response[0].league.logo);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function cargarImagenesSlide(teams) {
    const carouselInner = document.querySelector('.carousel-inner');
    carouselInner.innerHTML = ''; // Limpiar el contenido actual del carrusel

    teams.forEach((team, index) => {
        if (team.team.logo) {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) carouselItem.classList.add('active'); // Primer item activo

            const img = document.createElement('img');
            img.src = team.team.logo;
            img.alt = team.team.name;
            img.classList.add('d-block', 'w-100');

            carouselItem.appendChild(img);
            carouselInner.appendChild(carouselItem);
        }
    });
}

function cargarInformacionCards(teams, topScorers) {
    const maximoCampeonCard = document.querySelector('#maximoCampeonCard');
    const maximoGoleadorCard = document.querySelector('#maximoGoleadorCard');
    const actualCampeonCard = document.querySelector('#actualCampeonCard');
    const trofeoCard = document.querySelector('#trofeoCard');

    // Cargar información en las tarjetas (ejemplo)
    maximoCampeonCard.querySelector('.card-title').textContent = "Máximo Campeón";
    maximoCampeonCard.querySelector('.card-text').textContent = `El equipo más exitoso es el Paris Saint Germain`;
    maximoCampeonCard.querySelector('.card-img-top').src = "https://imgs.search.brave.com/Z2i6ToAcSQZmFeg7IiA30XDDYuTvyT_qF69cQ89slT4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGVsZWFkaGVzaXZv/LmNvbS9lcy9pbWcv/cHNnMDA2LWpwZy9m/b2xkZXIvcHJvZHVj/dHMtbGlzdGFkby1t/ZXJjaGFudC92aW5p/bG9zLWRlY29yYXRp/dm9zLWVzY3Vkby1w/c2ctZGUtcGFyaXMu/anBn";

    maximoGoleadorCard.querySelector('.card-title').textContent = "Máximo Goleador";
    maximoGoleadorCard.querySelector('.card-text').textContent = "Delio Onnis es el máximo goleador en la historia de la Ligue 1 con 299 goles.";
    maximoGoleadorCard.querySelector('.card-img-top').src = "https://imgs.search.brave.com/dJUTfluJT-VEtYojEZpJVJuHj3KjSnrGf9-xiyBC_1E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzI1L0RlbGlvX09u/bmlzX2VuXzE5Nzhf/KEFTX01vbmFjbyku/cG5n";

    actualCampeonCard.querySelector('.card-title').textContent = "Actual Campeón";
    actualCampeonCard.querySelector('.card-text').textContent = `El actual campeón es el PSG`;
    actualCampeonCard.querySelector('.card-img-top').src = "https://imgs.search.brave.com/EqqI7T8YypP5BUUMUlE9-naDrv0WFq1ULmskxIyfqM8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWct/NC5saW50ZXJuYXV0/ZS5jb20vc0tzOUNB/OXlVbVBIYk45S3BY/SnZKYWJPWU53PS8x/NTAweC9zbWFydC84/NTAxMDc5MmYxMDA0/MzYzYTU3ZTc2NDkz/ZGNlNDc3OC9jY21j/bXMtbGludGVybmF1/dGUvNTk1MDU1NjEu/anBn";

    trofeoCard.querySelector('.card-title').textContent = "Trofeo";
    trofeoCard.querySelector('.card-text').textContent = "Descripción del trofeo de la Ligue 1.";
    trofeoCard.querySelector('.card-img-top').src = "https://imgs.search.brave.com/0w6IMicr35BzgOAuBojZZpiD2oQ3thQzZSE4PrRSRlo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/bGV4ZXhwcmVzcy5u/ZXQvY2RuL3Nob3Av/ZmlsZXMvbGlndWUt/MS1mcmVuY2gtZm9v/dGJhbGwtbGVhZ3Vl/LWNvbXBldGl0aW9u/LWhleGFnb2FsLTEt/MS1yZXBsaWNhLXRy/b3BoeS1jb21wbGV4/ZXhwcmVzcy0xXzQw/MHg0MDAud2VicD92/PTE2ODc5ODcwMzI"; // Reemplazar con la URL correcta
}

function configurarAccordion(teams, topScorers, leagueInfo) {
    const mejoresEquipos = teams.slice(0, 3).map(team => team.team.name).join(', ');
    document.querySelector('#mejoresEquiposAccordion').textContent = `El PSG es el club más exitoso con 12 títulos de Ligue 1, seguido por el AS Monaco con 7 títulos también estan el Marsella y el Olimpik.`;

    const maximoGoleadores = topScorers.slice(0, 3).map(scorer => `${scorer.player.name} (${scorer.statistics[0].goals.total} goles)`).join(', ');
    document.querySelector('#maximosGoleadoresAccordion').textContent = `Delio Onnis es el máximo goleador con 299 goles, seguido de Bernard Lacombe con 255 goles.`;

    const formato = `La Ligue 1 está compuesta por 20 equipos, donde cada uno juega 38 partidos por temporada. Al final de la temporada, el equipo con más puntos es coronado campeón.`;
    document.querySelector('#formatoAccordion').textContent = formato;
}

function cargarLogoLiga(logoUrl) {
    const logoElement = document.querySelector('.liga-logo');
    logoElement.src = logoUrl;
}
