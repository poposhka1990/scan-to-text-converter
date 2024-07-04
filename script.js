const fileInput = document.getElementById('imageInput');
const fileLabel = document.querySelector('.custom_button');

fileInput.onchange = () => {
  /* Показываем название выбранного файла */
  fileLabel.textContent = fileInput.files.length ? fileInput.files[0].name : 'Выберите файл';
};

  function convertImageToText() {
    const image = document.getElementById('imageInput').files[0];
    if (image) {
        document.querySelector('.logo').classList.add('spin');
        Tesseract.recognize(
            image,
            'eng+rus', // Выбор языка
        {
          logger: m => console.log(m)
        }
      ).then(({ data: { text } }) => {
        document.querySelector('.logo').classList.remove('spin');
        saveTextAsFile(text);
      });
    } else {
      alert('Пожалуйста, выберите изображение для конвертации.');
    }
  }

  function saveTextAsFile(text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const anchor = document.createElement('a');
    anchor.download = 'converted-text.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.click();
    window.URL.revokeObjectURL(anchor.href);
}