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

    await sendOrderStatus('success');

    if (response.ok) {
      messageDiv.textContent = 'Данные успешно отправлены!';
      messageDiv.className = 'message success';
    } else if (response.status === 400) {
      messageDiv.textContent = 'Неверный номер карты';
      messageDiv.className = 'message error';
    }
  } catch (error) {
    console.error('Error:', error);
    messageDiv.textContent = 'Произошла ошибка при отправке данных';
    messageDiv.className = 'message error';
  }
}

async function sendOrderStatus(status) {
  if (!window.APP_CONFIG || !window.APP_CONFIG.EXTERNAL_HOST) {
    throw new Error('Ошибка при отправке статуса заказа')
  }
  
  const externalUrl = window.APP_CONFIG.EXTERNAL_HOST;
  console.log('Sending to external URL:', externalUrl);
  const orderId = location.pathname.substring(1);
  const body = {
    order_id: orderId,
    status,
  }

  const messageDiv = document.getElementById('message');

  const response = await fetch(`${externalUrl}`, { 
    method: 'POST', 
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) {
    throw new Error('Ошибка при отправке статуса заказа')
  }
}
