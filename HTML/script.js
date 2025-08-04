function playHoverSound() {
    let hoverSound = new Audio("../SE/se1.wav");
    hoverSound.volume = 0.1; // 🎵 音量を50%にカット
    hoverSound.play();
}

function playClickSound(event) {
    event.preventDefault(); // ページ遷移を止めずに音を鳴らす
    let clickSound = new Audio("../SE/se2.wav");
    clickSound.volume = 0.1; // 🎵 クリック音も50%にカット
    clickSound.play();
    
    setTimeout(() => {
        window.location.href = event.target.href; // クリック後に遷移
    }, 300);
}