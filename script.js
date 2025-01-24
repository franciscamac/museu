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
