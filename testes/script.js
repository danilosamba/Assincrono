const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const resultText = document.getElementById('result');
const spinButton = document.getElementById('spin');

// Emojis de frutas
const fruits = ['🍉', '🍋', '🍒', '🍊', '🍇', '🍓', '🍍'];

// Função para rodar a roleta
function spinSlot(slot) {
    return new Promise((resolve) => {
        slot.classList.add('spin-animation'); // Adiciona animação
        setTimeout(() => {
            slot.classList.remove('spin-animation'); // Remove animação
            const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
            slot.textContent = randomFruit;
            resolve(randomFruit);
        }, 1000); // 1 segundo de animação
    });
}

// Função principal para girar as roletas
async function spin() {
    resultText.textContent = 'Girando...';

    // Gira cada slot e espera a conclusão
    const fruit1 = await spinSlot(slot1);
    const fruit2 = await spinSlot(slot2);
    const fruit3 = await spinSlot(slot3);

    // Verifica se todos os três slots são iguais
    if (fruit1 === fruit2 && fruit2 === fruit3) {
        resultText.textContent = 'Você ganhou! 🎉';
    } else {
        resultText.textContent = 'Tente novamente!';
    }
}

// Ação do botão de girar
spinButton.addEventListener('click', spin);

