const rainContainer = document.querySelector('.cli-rain-container');
const mathContainer = document.querySelector('.mft-background');
const symbols = ['$', '&', '/', '#', '@', '%', '*', '!', '?', '+'];
const symbolSize = '1rem';

function createRainSymbol() {
    const symbol = document.createElement('span');
    symbol.className = 'cli-rain-symbol';
    let frame = 0;
    symbol.textContent = symbols[frame];
    const rect = mathContainer.getBoundingClientRect();
    symbol.style.left = Math.random() * rect.width + 'px';
    symbol.style.top = '-32px';
    symbol.style.fontSize = symbolSize;
    // Set the fall distance to container height
    symbol.style.setProperty('--fall-distance', rect.height + 32 + 'px');
    rainContainer.appendChild(symbol);

    const switchInterval = setInterval(() => {
        frame = (frame + 1) % symbols.length;
        symbol.textContent = symbols[frame];
    }, 200);

    symbol.addEventListener('animationend', () => {
        clearInterval(switchInterval);
        symbol.remove();
    });
}

setInterval(createRainSymbol, 2000);

window.addEventListener('resize', () => {
    rainContainer.style.width = mathContainer.offsetWidth + 'px';
    rainContainer.style.height = mathContainer.offsetHeight + 'px';
});