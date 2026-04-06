/**
 * FREECRAFT HUB - CORE SCRIPT
 * Разработчик: Kalajer
 * Особенности: Система частиц, поддержка WebP/GIF, защита от ошибок
 */

// 1. КОНФИГУРАЦИЯ ЛУТА (строго по твоему GitHub)
const LOOT_CONFIG = [
    'assets/totem.webp',           // Твой Вебп тотем
    'assets/iron_ingot.webp',      // Твой Вебп железо
    'assets/netherite_ingot.png',  // Слиток незерита
    'assets/diamond.png',          // Алмаз
    'assets/netherite_sword.gif'   // Анимированный меч
];

// 2. ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('playBtn');
    
    if (playBtn) {
        // Основной обработчик на кнопку PLAY
        playBtn.addEventListener('click', (e) => {
            // Запускаем 12 случайных предметов
            spawnLootBurst(e.clientX, e.clientY, 12);
            
            // Можно добавить легкую вибрацию на телефон при клике
            if (window.navigator.vibrate) {
                window.navigator.vibrate(50);
            }
        });
    }

    // Дополнительно: Фикс баланса (на случай, если юзер перешел из казино с NaN)
    checkUserBalance();
});

/**
 * Функция создания взрыва предметов
 */
function spawnLootBurst(startX, startY, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('img');
        
        // Рандомный выбор предмета
        const randomSource = LOOT_CONFIG[Math.floor(Math.random() * LOOT_CONFIG.length)];
        
        particle.src = randomSource;
        particle.className = 'particle';
        
        // Стили появления
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.position = 'absolute';
        particle.style.pointerEvents = 'none';
        
        document.body.appendChild(particle);

        // Математика полета
        const angle = Math.random() * Math.PI * 2; // Направление (360 градусов)
        const velocity = 200 + Math.random() * 400; // Сила вылета
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;
        const rotation = Math.random() * 1000 - 500; // Случайное вращение

        // Запуск анимации через Web Animations API
        const animation = particle.animate([
            { 
                transform: 'translate(-50%, -50%) rotate(0deg) scale(0.3)', 
                opacity: 1 
            },
            { 
                transform: `translate(${destX}px, ${destY}px) rotate(${rotation}deg) scale(1.5)`, 
                opacity: 0 
            }
        ], {
            duration: 1000 + Math.random() * 800,
            easing: 'cubic-bezier(0.1, 0.8, 0.4, 1)'
        });

        // Удаление после финиша
        animation.onfinish = () => particle.remove();
    }
}

/**
 * Проверка и лечение баланса (тот самый фикс)
 */
function checkUserBalance() {
    let userData = JSON.parse(localStorage.getItem('mc_users'));
    if (userData && isNaN(userData.balance)) {
        userData.balance = 500; // Восстанавливаем до 500, если там NaN
        localStorage.setItem('mc_users', JSON.stringify(userData));
        console.log("System: Balance recovered from NaN");
    }
}
