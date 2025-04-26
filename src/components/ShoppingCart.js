import React from 'react';

const ShoppingCart = ({ cartItems, onQuantityChange }) => {
  const generateWhatsAppLink = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return '';
    }

    const messageLines = cartItems.map(item => `${item.name} (${item.color}): ${item.quantity} unidade(s)`);
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n${messageLines.join('\n')}`;
    const encodedMessage = encodeURIComponent(message);
    // Substitua pelo número de WhatsApp da sua mãe
    const whatsappNumber = '5563985136087';
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              {item.name} ({item.color}) - Quantidade:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(event) => onQuantityChange(item.id, event.target.value)}
                style={{ width: '50px', marginLeft: '10px' }}
              />
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => window.open(generateWhatsAppLink(), '_blank')}>
        Enviar Pedido pelo WhatsApp
      </button>
    </div>
  );
};

export default ShoppingCart;