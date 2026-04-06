// Список путей к картинкам твоего лута
// Убедись, что файлы лежат в папке assets
const lootItems = [
    'assets/totem.png',
    'assets/netherite_ingot.png',
    'assets/diamond.png',
    'assets/iron_ingot.png',
    'assets/netherite_sword.gif' // Твоя сверкающая гифка
];

const playBtn = document.getElementById('playBtn');

// Слушатель клика на кнопку PLAY
playBtn.addEventListener('click', (e) => {
    // Количество вылетающих предметов за один клик
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
        createLootParticle(e.clientX, e.clientY);
    }
});

function createLootParticle(x, y) {
    const particle = document.createElement('img');
    
    // Выбираем случайный предмет из списка
    const randomLoot = lootItems[Math.floor(Math.random() * lootItems.length)];
    particle.src = randomLoot;
    particle.className = 'particle';
    
    // Начальная точка появления (координаты клика)
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);

    // Генерируем случайное направление (угол 360 градусов)
    const angle = Math.random() * Math.PI * 2;
    // Случайная сила вылета (расстояние)
    const velocity = 150 + Math.random() * 350; 
    
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity;

    // Анимация полета
    const animation = particle.animate([
        { 
            transform: 'translate(-50%, -50%) rotate(0deg) scale(0)', 
            opacity: 1 
        },
        { 
            transform: `translate(${destX}px, ${destY}px) rotate(${Math.random() * 1080}deg) scale(1.5)`, 
            opacity: 0 
        }
    ], {
        duration: 1000 + Math.random() * 1000, // Случайная длительность от 1 до 2 сек
        easing: 'cubic-bezier(0.1, 0.8, 0.4, 1)' // Плавное замедление в конце
    });

    // Удаляем элемент из DOM после завершения анимации
    animation.onfinish = () => {
        particle.remove();
    };
}

