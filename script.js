let currentCharacter = 1;
let currentCostume = 1;
let currency = 1000;
const SWITCH_PRICE = 500;

// 角色數據
const characters = {
    1: { name: "狗狗", costumes: ["costume1", "costume2", "costume3", "costume4"] },
    2: { name: "狐狸", costumes: ["costume1", "costume2", "costume3", "costume4"] },
    3: { name: "大熊", costumes: ["costume1", "costume2", "costume3", "costume4"] },
    4: { name: "貓咪", costumes: ["costume1", "costume2", "costume3", "costume4"] }
};

function updateCurrencyDisplay() {
    document.getElementById('currency-amount').textContent = currency;
}

function updateCharacterStatus() {
    // 更新所有角色的狀態顯示
    document.querySelectorAll('.character-item').forEach((item, index) => {
        const characterId = index + 1;
        const statusDiv = item.querySelector('.character-status');
        
        if (characterId === currentCharacter) {
            item.classList.remove('locked');
            item.classList.add('selected');
            statusDiv.innerHTML = '目前角色';
            statusDiv.classList.add('owned');
        } else {
            item.classList.add('locked');
            item.classList.remove('selected');
            statusDiv.innerHTML = `<i class="fas fa-coins"></i> ${SWITCH_PRICE}`;
            statusDiv.classList.remove('owned');
        }
    });
}

function attemptSwitch(newCharacterId) {
    if (newCharacterId === currentCharacter) {
        return;
    }

    if (currency >= SWITCH_PRICE) {
        const confirmSwitch = confirm(
            `確定要花費 ${SWITCH_PRICE} 金幣切換到 ${characters[newCharacterId].name} 嗎？\n` +
            `(當前角色 ${characters[currentCharacter].name} 將被替換)`
        );
        
        if (confirmSwitch) {
            currency -= SWITCH_PRICE;
            updateCurrencyDisplay();
            switchCharacter(newCharacterId);
        }
    } else {
        alert('金幣不足！');
    }
}

function switchCharacter(newCharacterId) {
    currentCharacter = newCharacterId;
    updateCharacterStatus();
    updateCharacterImage();
    updateCostumeImages();
}

function selectCharacter(characterId) {
    if (characterId === currentCharacter) {
        return;
    }
    attemptSwitch(characterId);
}

function selectCostume(costumeId) {
    // 移除之前選中的服裝的選中狀態
    document.querySelectorAll('.costume-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 添加新選中的服裝的選中狀態
    const selectedCostume = document.querySelector(`.costume-item:nth-child(${costumeId})`);
    selectedCostume.classList.add('selected');
    
    currentCostume = costumeId;
    updateCharacterImage();
}

function updateCharacterImage() {
    const characterImage = document.getElementById('character-image');
    characterImage.src = `images/character${currentCharacter}-costume${currentCostume}.png`;
}

function updateCostumeImages() {
    // 更新服裝選擇區的圖片
    document.querySelectorAll('.costume-item img').forEach((img, index) => {
        img.src = `images/character${currentCharacter}-costume${index + 1}.png`;
    });
}

// 初始化
window.onload = function() {
    updateCurrencyDisplay();
    updateCharacterStatus();
    selectCostume(1);
}; 