const fileInput = document.getElementById('imageInput');
const fileLabel = document.querySelector('.custom_button');

fileInput.onchange = () => {
  /* Показываем название выбранного файла */
  fileLabel.textContent = fileInput.files.length ? fileInput.files[0].name : 'Выберите файл';
};

  function convertImageToText() {
    const image = document.getElementById('imageInput').files[0];
    if (image) {
      document.getElementById('loader').style.display = 'block'; // Показываем индикатор загрузки
      Tesseract.recognize(
        image,
        'eng+rus', // Выбор языка
        {
          logger: m => console.log(m)
        }
      ).then(({ data: { text } }) => {
        document.getElementById('loader').style.display = 'none'; // Скрываем индикатор загрузки
        document.getElementById('textOutput').textContent = text;
        saveTextAsDoc(text);
      });
    } else {
      alert('Пожалуйста, выберите изображение для конвертации.');
    }
  }

  function saveTextAsDoc(text) {
    const blob = new Blob([text], { type: 'application/msword' });
    const anchor = document.createElement('a');
    anchor.download = 'converted-text.doc';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.style.display = 'none'; // Скрываем ссылку, чтобы пользователь её не видел
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor); // Удаляем ссылку после сохранения файла
    window.URL.revokeObjectURL(anchor.href);
}