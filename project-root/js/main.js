document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenuMobile = document.querySelector('.nav-menu-mobile');
    const overlay = document.querySelector('.overlay');
    const cards = document.querySelectorAll('.card');
    let current = 0;
    let intervalId;

    function moveCards() {
        cards.forEach((card, index) => {
            card.classList.remove('left', 'center', 'right');
            if (index === current) {
                card.classList.add('center');
            } else if (index === (current + 1) % cards.length) {
                card.classList.add('right');
            } else {
                card.classList.add('left');
            }
        });
    }

    function rotateCards() {
        current = (current + 1) % cards.length;
        moveCards();
    }

    function startRotation() {
        intervalId = setInterval(rotateCards, 3000);
    }

    function stopRotation() {
        clearInterval(intervalId);
    }

    // Inicializa o movimento dos cards e começa a rotação
    moveCards();
    startRotation();

    // Adiciona eventos para parar e iniciar a rotação dos cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', stopRotation);
        card.addEventListener('mouseleave', startRotation);
    });

    // Alterna a visibilidade do menu móvel e overlay ao clicar no botão de menu
    menuToggle.addEventListener('click', function () {
        navMenuMobile.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    // Oculta o menu móvel e o overlay ao clicar no overlay
    overlay.addEventListener('click', function () {
        navMenuMobile.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Fecha o menu ao clicar em qualquer link dentro do menu móvel
    navMenuMobile.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            navMenuMobile.classList.remove('open');
            overlay.classList.remove('active');
        }
    });

    // Gerencia a visibilidade do cabeçalho com base no scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
