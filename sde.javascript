document.addEventListener('DOMContentLoaded', () => {
    const linkContainer = document.getElementById('link-container');
    const resultsBody = document.getElementById('results-body');
    const clearResultsBtn = document.getElementById('clear-results-btn');

    const localStorageKey = 'linkClicksResults';
    let results = [];

    // Функция для загрузки результатов из localStorage
    const loadResults = () => {
        const storedResults = localStorage.getItem(localStorageKey);
        if (storedResults) {
            results = JSON.parse(storedResults);
            results.forEach(addResultToTable);
        }
    };

    // Функция для сохранения результатов в localStorage
    const saveResults = () => {
        localStorage.setItem(localStorageKey, JSON.stringify(results));
    };

    // Функция для добавления одной записи в таблицу
    const addResultToTable = (result) => {
        const row = resultsBody.insertRow(); // Создаем новую строку
        const nameCell = row.insertCell(0); // Первая ячейка для имени
        const timeCell = row.insertCell(1); // Вторая ячейка для времени

        nameCell.textContent = result.name;
        timeCell.textContent = result.timestamp;
    };

    // Обработчик клика по контейнеру ссылок
    linkContainer.addEventListener('click', (event) => {
        // Проверяем, был ли клик именно по тегу <a> или его дочерним элементам внутри link-box
        const link = event.target.closest('.link-box a');

        if (link) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки (переход)

            const linkName = link.dataset.linkName || 'Неизвестная ссылка';
            const linkUrl = link.dataset.linkUrl;
            const timestamp = new Date().toLocaleString('ru-RU');

            const newResult = {
                name: linkName,
                timestamp: timestamp
            };

            results.push(newResult);
            addResultToTable(newResult);
            saveResults();

            // Если есть URL, открываем его в новой вкладке после записи в журнал
            if (linkUrl) {
                window.open(linkUrl, '_blank');
            }
        }
    });

    // Обработчик клика по кнопке очистки
    clearResultsBtn.addEventListener('click', () => {
        if (confirm('Вы уверены, что хотите очистить все результаты?')) {
            results = []; // Очищаем массив результатов
            resultsBody.innerHTML = ''; // Очищаем таблицу на странице
            localStorage.removeItem(localStorageKey); // Удаляем из localStorage
            alert('Результаты очищены!');
        }
    });

    // Загружаем результаты при загрузке страницы
    loadResults();
});
