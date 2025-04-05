function sendToWhatsApp() {
  // Получаем значения из формы
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  // Проверка обязательных полей
  if (!name) {
    alert('Пожалуйста, введите ваше имя');
    return;
  }

  if (!phone) {
    alert('Пожалуйста, введите ваш телефон');
    return;
  }

  if (!service) {
    alert('Пожалуйста, выберите услугу');
    return;
  }

  // Очищаем номер телефона от лишних символов
  const cleanPhone = phone.replace(/\D/g, '');

  // Формируем сообщение
  let whatsappMessage = `Новая заявка от ${name}%0A%0A`;
  whatsappMessage += `Телефон: ${phone}%0A`;
  
  if (email) {
    whatsappMessage += `Email: ${email}%0A`;
  }
  
  whatsappMessage += `Услуга: ${service}%0A%0A`;
  
  if (message) {
    whatsappMessage += `Дополнительная информация:%0A${message}`;
  }

  // Номер телефона Радомира (замените на реальный)
  const whatsappNumber = '79679146156'.replace(/\D/g, '');
  
  // Формируем URL для WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  // Открываем WhatsApp в новом окне
  window.open(whatsappUrl, '_blank');
  
  // Очищаем форму (опционально)
  document.getElementById('applicationForm').reset();
  
  // Показываем уведомление
  alert('Вы будете перенаправлены в WhatsApp для завершения отправки.');
}

// Маска для телефона
document.getElementById('phone').addEventListener('input', function(e) {
  let value = this.value.replace(/\D/g, '');
  
  if (value.length > 0) {
    let formattedValue = '+7';
    
    if (value.length > 1) {
      formattedValue += ' (' + value.substring(1, 4);
    }
    
    if (value.length > 4) {
      formattedValue += ') ' + value.substring(4, 7);
    }
    
    if (value.length > 7) {
      formattedValue += '-' + value.substring(7, 9);
    }
    
    if (value.length > 9) {
      formattedValue += '-' + value.substring(9, 11);
    }
    
    this.value = formattedValue;
  }
});
