const texts = [" Yazılım Mühendisiyim,", " Mobil Geliştiriciyim,", " Web Geliştiriciyim,"];
let count = 0;
let index = 0;
let currentText = texts[count];
let letter = '';
let isDeleting = false;
const typingSpeed = 150; // Yazma hızı
const deletingSpeed = 10; // Silme hızı

function type() {
  if (!isDeleting && index < currentText.length) {
    // Yazma işlemi
    letter = currentText.slice(0, ++index);
    document.getElementById('changing-text').textContent = letter;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && index > 0) {
    // Silme işlemi
    letter = currentText.slice(0, --index);
    document.getElementById('changing-text').textContent = letter;
    setTimeout(type, deletingSpeed);
  } else if (!isDeleting && index === currentText.length) {
    // Yazma tamamlandıktan sonra duraklama
    setTimeout(() => {
      isDeleting = true;
      type();
    }, 1000);
  } else if (isDeleting && index === 0) {
    // Silme tamamlandıktan sonra duraklama ve yeni metne geçiş
    isDeleting = false;
    count = (count + 1) % texts.length;
    currentText = texts[count];
    setTimeout(type, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  currentText = texts[count];
  type();
});


