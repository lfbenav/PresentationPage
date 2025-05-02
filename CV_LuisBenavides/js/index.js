let typingInProgress = false;
let typingTimeout;
let respuestaEnvio;
let respuestaEnvioError;

let currentLanguage = document.getElementById('languageSwitch').checked ? 'en' : 'es';
let currentPalette = 'default';

let proyectList = [];
let proyectIncrement = window.innerWidth < 1000 ? 2 : 4;
let displayedProyects = proyectIncrement



function loadContent() {

    currentLanguage = document.getElementById('languageSwitch').checked ? 'en' : 'es';

    fetch(`../lang/${currentLanguage}.json`)
        .then(response => response.json())
        .then(translations => {
            loadTranslations(translations)
        })
        .catch(error => console.error('Error loading translation:', error));

    fetch(`../data/${currentLanguage}_proyects.json`)
        .then(response => response.json())
        .then(proyects => {
            cargarProyectos(proyects)
        })
        .catch(error => console.error('Error loading proyects:', error));

}




function loadTranslations(translations) {

    let introText = translations.greeting;
    cargarIntro(introText);

    document.getElementById('about').textContent = translations.about;
    document.getElementById('portfolio').textContent = translations.portfolio;
    document.getElementById('resume').textContent = translations.resume;
    document.getElementById('interests').textContent = translations.interests;
    document.getElementById('contact').textContent = translations.contact;

    document.getElementById('contact_me_btn').textContent = translations.contact_me_btn;
    document.getElementById('download_cv_btn').textContent = translations.download_cv_btn;

    document.getElementById('about_h1').textContent = translations.about_h1;
    document.getElementById('portfolio_h1').textContent = translations.portfolio_h1;
    document.getElementById('resume_h1').textContent = translations.resume_h1;
    document.getElementById('interests_h1').textContent = translations.interests_h1;
    document.getElementById('contact_h1').textContent = translations.contact_h1;

    document.getElementById('about_text').innerHTML = translations.about_text;
    document.getElementById('portfolio_text').innerHTML = translations.portfolio_text;
    document.getElementById('resume_text').innerHTML = translations.resume_text;
    document.getElementById('interests_text').innerHTML = translations.interests_text;
    document.getElementById('thanks_text').innerHTML = translations.thanks_text;
    document.getElementById('contact_text').innerHTML = translations.contact_text;

    document.getElementById('see_more_btn').innerHTML = translations.see_more_btn;
    document.getElementById('see_less_btn').innerHTML = translations.see_less_btn;

    document.getElementById('experience_languages').innerHTML = translations.experience_languages;
    document.getElementById('experience_databases').innerHTML = translations.experience_databases;
    document.getElementById('experience_technologies').innerHTML = translations.experience_technologies;
    document.getElementById('experience_habilities').innerHTML = translations.experience_habilities;
    document.getElementById('skill_design_patterns').innerHTML = translations.skill_design_patterns;
    document.getElementById('skill_diagrams').innerHTML = translations.skill_diagrams;
    document.getElementById('skill_data_structures').innerHTML = translations.skill_data_structures;
    document.getElementById('skill_agile_methods').innerHTML = translations.skill_agile_methods;

    document.getElementById('interests_swimming').textContent = translations.interests_swimming;
    document.getElementById('interests_swimming_desc').textContent = translations.interests_swimming_desc;
    document.getElementById('interests_cooking').textContent = translations.interests_cooking;
    document.getElementById('interests_cooking_desc').textContent = translations.interests_cooking_desc;
    document.getElementById('interests_cycling').textContent = translations.interests_cycling;
    document.getElementById('interests_cycling_desc').textContent = translations.interests_cycling_desc;
    document.getElementById('interests_gaming').textContent = translations.interests_gaming;
    document.getElementById('interests_gaming_desc').textContent = translations.interests_gaming_desc;
    document.getElementById('interests_dog').textContent = translations.interests_dog;
    document.getElementById('interests_dog_desc').textContent = translations.interests_dog_desc;

    document.getElementById('InputName').placeholder = translations.InputName;
    document.getElementById('InputEmail').placeholder = translations.InputEmail;
    document.getElementById('InputSubject').placeholder = translations.InputSubject;
    document.getElementById('InputMessage').placeholder = translations.InputMessage;
    document.getElementById('submit_btn').innerHTML = translations.submit_btn;
    respuestaEnvio = translations.response_sent;
    respuestaEnvioError = translations.response_error;

    document.getElementById('footer_text').textContent = translations.footer_text;

}




function cargarIntro(texto) {

    if (typingInProgress) {
        clearTimeout(typingTimeout);
        typingInProgress = false;
    }

    const typeWriter = () => {
        let delay = 40;
        if (i < texto.length) {
            if (texto.charAt(i) == ",") delay += 400;
            document.getElementById("greeting").innerHTML += texto.charAt(i);
            i++;
            typingInProgress = true;
            typingTimeout = setTimeout(typeWriter, delay);
        } else {
            typingInProgress = false;
        }
    };

    let i = 0;
    document.getElementById("greeting").innerHTML = "";
    typeWriter();

}




function cargarProyectos(proyectos) {
    proyectList = [];

    document.getElementById('contenedorProyectos').innerHTML = "";
    proyectos.forEach(proyecto => {

        badges = ""
        proyecto.technologies.forEach(tech => {
            badges += `<span class="d-inline-block badge fondo-highlight ml-1">${tech}</span> `
        })
        
        html = 
            `
            <div class="col">
                <div class="card shadow-sm h-100 d-flex flex-column">

                    <!-- Imagen -->
                    <div class="contenedor-card-imagen my-auto">
                        <img src="${proyecto.image}" alt="${proyecto.name}" class="card-imagen">
                    </div>

                    <div class="card-body d-flex flex-column">
                        <!-- Texto -->
                        <h5 class="card-title">${proyecto.name}</h5>
                        <p class="card-text">${proyecto.description}</p>

                        <div class="mt-auto">
                            <!-- Badges -->
                            <div class="mb-3">
                                ${badges}
                            </div>

                            <!-- Botones -->
                            <div class="d-flex justify-content-between align-items-center">
                                <a href="${proyecto.github}" target="_blank" rel="noopener noreferrer">
                                    <img class="icono-pequeno" src="../images/github.svg" alt="GitHub">
                                </a>
                                <small class="text-body-secondary">${proyecto.category}</small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            `;

        proyectList.push(html)
    });

    for (let index = 0; index < displayedProyects; index++) {
        if (proyectList.length > 0) {
            document.getElementById('contenedorProyectos').innerHTML += proyectList.shift()
        }
    }

    // proyectList.forEach(proyect => {document.getElementById('contenedorProyectos').innerHTML += proyect})
    
}




function cargarMasProyectos() {

    document.getElementById('see_more_btn').style.display = 'inline-block';

    // const proyectosAMostrar = proyectList.splice(0, 4);
    // proyectosAMostrar.forEach(proyect => {document.getElementById('contenedorProyectos').innerHTML += proyect})

    for (let index = 0; index < proyectIncrement; index++) {
        if (proyectList.length > 0) {
            displayedProyects++
            document.getElementById('contenedorProyectos').innerHTML += proyectList.shift()
        }
    }


    if (proyectList.length === 0) {
        document.getElementById('see_more_btn').style.display = 'none';
        document.getElementById('see_less_btn').style.display = 'inline-block';
        return;
    }

}




function cargarMenosProyectos() {

    document.getElementById('see_less_btn').style.display = 'none';
    document.getElementById('see_more_btn').style.display = 'inline-block';

    displayedProyects = proyectIncrement;

    loadContent();
}




function mandarCorreo(event) {

    event.preventDefault();

    let name = document.getElementById('InputName').value;
    let email = document.getElementById('InputEmail').value;
    let subject = document.getElementById('InputSubject').value;
    let message = document.getElementById('InputMessage').value;

    if (name && email && subject && message) {
        let params = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        emailjs.send("service_udvzcna", "template_ooj41p1", params)
            .then(function(response) {

                document.getElementById('InputName').value = '';
                document.getElementById('InputEmail').value = '';
                document.getElementById('InputSubject').value = '';
                document.getElementById('InputMessage').value = '';

                document.getElementById('InputAnswer').innerHTML = respuestaEnvio;
                setTimeout(function() {
                    document.getElementById('InputAnswer').innerHTML = '';
                }, 5000);

            }, function(error) {
                document.getElementById('InputAnswer').innerHTML = respuestaEnvioError;
                setTimeout(function() {
                    document.getElementById('InputAnswer').innerHTML = '';
                }, 5000);
            });
    }
}




function descargarCV() {
    let nombre = (currentLanguage == 'en') ? 'Luis_Benavides_CV_EN.pdf' : 'Luis_Benavides_CV_ES.pdf';
    const ruta = `../pdf/${nombre}`;

    const link = document.createElement("a");
    link.href = ruta;
    link.download = nombre;
    link.click();
}




document.getElementById('contactForm').addEventListener('submit', mandarCorreo);

document.getElementById('languageSwitch').addEventListener('change', function() {
    loadContent(); 
});

document.getElementById('brand').addEventListener('click', function() {
    confetti({
        particleCount: 400,
        spread: 200,
        origin: { y: 1 },
    });

    if (document.body.classList.contains('default')) {
        document.body.classList.add('wis')
        document.body.classList.remove('default');
        currentPalette = 'wis';
    }else {
        document.body.classList.add('default')
        document.body.classList.remove('wis');
        currentPalette = 'default';
    }
});




loadContent();