// Ключ для локального сховища
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт для зберігання даних форми
const formData = { email: '', message: '' };

// Посилання на елементи форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Ініціалізація даних форми при завантаженні сторінки
populateFormData();

// Відстеження події input і збереження даних у локальне сховище
form.addEventListener('input', onInput);
form.addEventListener('submit', onSubmit);

// Функція для обробки події input
function onInput(event) {
  // Отримуємо ім'я поля (email або message)
  const field = event.target.name;
  
  // Видаляємо пробіли по краях та оновлюємо значення в об'єкті formData
  formData[field] = event.target.value.trim();

  // Зберігаємо об'єкт formData у локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функція для заповнення форми при завантаженні сторінки
function populateFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    // Якщо є дані у сховищі, парсимо їх і заповнюємо поля форми
    const savedFormData = JSON.parse(savedData);
    
    formData.email = savedFormData.email || '';
    formData.message = savedFormData.message || '';
    
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
}

function onSubmit(event) {
  event.preventDefault();
  
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form Data:', formData);

  formData.email = '';
  formData.message = '';
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}
