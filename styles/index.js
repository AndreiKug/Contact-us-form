const form = document.querySelector('form');
const message = 'Обращение создано';

form.addEventListener('submit', (e) => {
    e.preventDefault();
        form.reset();

        console.log(message);
});  