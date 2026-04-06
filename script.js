/**
 * FREECRAFT HUB - ГЕЙМПЛЕЙНАЯ ЛОГИКА
 * Реализовано по эскизу Kalajer
 */

// 1. Настройки контента для каждой игры
const GAME_DATA = {
    'casino': {
        title: 'МАЙН-КАЗИНО',
        desc: 'Испытай удачу! Ставь алмазы и незерит, чтобы сорвать джекпот. Помни: удача любит смелых!',
        link: 'https://player20020.github.io/FreecraftGame/',
        loot: ['assets/diamond.png', 'assets/netherite_ingot.png', 'assets/netherite_sword.gif']
    },
    'coins': {
        title: 'FREE COINS',
        desc: 'Зарабатывай монеты и ресурсы абсолютно бесплатно. Твой путь к богатству начинается здесь!',
        link: 'https://player20020.github.io/Game-for-diamonds/',
        loot: ['assets/iron_ingot.webp', 'assets/totem.webp', 'assets/diamond.png']
    }
};

// 2. Основная функция выбора игры
function selectGame(gameKey, event) {
    const data = GAME_DATA[gameKey];
    if (!data) return;

    // Вызываем взрыв предметов прямо из иконки
    const iconRect = event.currentTarget.getBoundingClientRect();
    const centerX = iconRect.left + iconRect.width / 2;
    const centerY = iconRect.top + iconRect.height / 2;
    
    spawnLoot(centerX, centerY, data.loot);

    // Заполняем панель управления данными
    document.getElementById('gameTitle').innerText = data.title;
    document.getElementById('gameDesc').innerText = data.desc;
    document.getElementById('finalPlayBtn').href = data.link;

    // Показываем панель (выезжает снизу)
    document.getElementById('controlCenter').classList.add('active');
    
    // Легкая вибрация при выборе
    if (window.navigator.vibrate) window.navigator.vibrate(70);
}

// 3. Функция закрытия панели
function closeControlCenter() {
    document.getElementById('controlCenter').classList.remove('active');
}

// 4. Логика вылетающих предметов (Лут)
function spawnLoot(x, y, lootPool) {
    const count = 15; // Сколько предметов вылетит

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('img');
        
        // Берем случайный предмет из пула именно ЭТОЙ игры
        const randomImg = lootPool[Math.floor(Math.random() * lootPool.length)];
        
        particle.src = randomImg;
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);

        // Математика разлета
        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 400;
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;

        const anim = particle.animate([
            { transform: 'translate(-50%, -50%) rotate(0deg) scale(0)', opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg) scale(1.5)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.4, 1)'
        });

        anim.onfinish = () => particle.remove();
    }
}

// 5. Закрытие панели при клике на фон (мимо панели)
document.addEventListener('click', (e) => {
    const panel = document.getElementById('controlCenter');
    const icons = document.querySelector('.floating-icons-menu');
    
    // Если кликнули не по панели и не по иконкам — закрываем
    if (!panel.contains(e.target) && !icons.contains(e.target) && panel.classList.contains('active')) {
        closeControlCenter();
    }
});
