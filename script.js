// Variáveis globais
let currentSlideIndex = 0;
let teamImages = [];
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const prevButton = document.querySelector('.prev'); // Certifique-se de que existe um elemento com a classe "prev"
const nextButton = document.querySelector('.next'); // Certifique-se de que existe um elemento com a classe "next"

// Funções do Lightbox
function updateLightbox() {
    const currentImage = teamImages[currentSlideIndex];
    lightboxImg.src = currentImage.src;
    lightboxImg.alt = currentImage.alt;
    lightboxCaption.textContent = currentImage.caption;
}

function openLightbox(index) {
    currentSlideIndex = index;
    updateLightbox();
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateSlides(n) {
    currentSlideIndex += n;

    if (currentSlideIndex >= teamImages.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = teamImages.length - 1;
    }

    updateLightbox();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa o array de imagens
    const teamCards = document.querySelectorAll('.team-card');
    teamImages = Array.from(teamCards).map(card => {
        return {
            src: card.querySelector('img').src,
            alt: card.querySelector('img').alt,
            caption: `${card.querySelector('h3').textContent} - ${card.querySelector('p').textContent}`
        };
    });

    // Adiciona eventos aos cards
    teamCards.forEach((card, index) => {
        card.addEventListener('click', () => openLightbox(index));
    });

    // Eventos do Lightbox
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateSlides(-1));
    nextBtn.addEventListener('click', () => navigateSlides(1));

    // Fechar ao clicar fora
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', function (e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateSlides(-1);
            } else if (e.key === 'ArrowRight') {
                navigateSlides(1);
            }
        }
    });

    // Seu código existente do slideshow
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            dots[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        showSlide(slideIndex);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            slideIndex = i;
            showSlide(slideIndex);
        });
    });

    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);

    // Inicializa o carrossel
    showSlide(slideIndex);
    setInterval(nextSlide, 5000); // Troca de slide automaticamente a cada 5 segundos

    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let currentIndex = 0; // Índice do slide atual
    const totalItems = carrosselItems.length; // Total de itens no carrossel
    const itemWidth = carrosselItems[0].offsetWidth + 10; // Largura do item + gap

    // Atualiza a posição do carrossel
    function updateCarrossel() {
        const offset = -currentIndex * itemWidth; // Calcula o deslocamento
        carrosselContainer.style.transform = `translateX(${offset}px)`; // Move o carrossel
    }

    // Botão "Anterior"
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Volta ao último item se estiver no primeiro
        updateCarrossel();
    });

    // Botão "Próximo"
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalItems; // Vai para o primeiro item se estiver no último
        updateCarrossel();
    });

    // Ajusta o carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateCarrossel();
    });

    const prevButtonLightbox = document.querySelector('.prev');
    const nextButtonLightbox = document.querySelector('.next');

    if (prevButtonLightbox && nextButtonLightbox) {
        prevButtonLightbox.addEventListener('click', () => {
            console.log('Botão anterior clicado');
        });

        nextButtonLightbox.addEventListener('click', () => {
            console.log('Botão próximo clicado');
        });
    } else {
        console.error('Botões não encontrados no DOM.');
    }
});

// Função do carrossel
function moveCarrossel(button, step) {
    // Seleciona o carrossel correspondente ao botão clicado
    const carrossel = button.closest('.carrossel');
    const container = carrossel.querySelector('.carrossel-container');
    const items = container.querySelectorAll('.carrossel-item');

    // Calcula a largura do item e a nova posição
    const itemWidth = items[0].offsetWidth;
    const maxScroll = itemWidth * (items.length - 1);

    // Obtem o deslocamento atual e calcula o novo
    let currentScroll = container.scrollLeft;
    currentScroll = Math.max(0, Math.min(currentScroll + step * itemWidth, maxScroll));

    // Move o carrossel
    container.scrollTo({ left: currentScroll, behavior: 'smooth' });
}

// Código para alternar navegação
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Função para alternar eventos
function toggleEvents(type) {
    const futureEvents = document.getElementById('future-events');
    const pastEvents = document.getElementById('past-events');

    if (type === 'future') {
        futureEvents.style.display = 'block';
        pastEvents.style.display = 'none';
    } else if (type === 'past') {
        futureEvents.style.display = 'none';
        pastEvents.style.display = 'block';
    }
}
