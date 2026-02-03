async function onSubmit(e) {
  e.preventDefault();
  const params = location.pathname;
  const form = e.target;
  const formData = new FormData(form);
  const cardNumber = formData.get('cardNumber');

  const messageDiv = document.getElementById('message');
  
  try {
    const response = await fetch(`${params}`, {
      method: 'POST',
      body: JSON.stringify({ cardNumber }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      messageDiv.textContent = 'Данные успешно отправлены!';
      messageDiv.className = 'message success';
    } else if (response.status === 400) {
      messageDiv.textContent = 'Неверный номер карты. Для покупки воспользуйтесь другой картой!';
      messageDiv.className = 'message error';
    }
  } catch (error) {
    console.error('Error:', error);
    messageDiv.textContent = 'Произошла ошибка при отправке данных';
    messageDiv.className = 'message error';
  }
}
