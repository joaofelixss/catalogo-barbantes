import React from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, onQuantityChange, products }) => {
  const generateWhatsAppLink = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio! Que tal adicionar uns novelinhos lindos?');
      return '';
    }

    let totalPrice = 0;
    const messageLines = cartItems.map(item => {
      const product = products.find(p => p.id === item.id);
      let productText = '';
      let itemPrice = 0;

      if (product) {
        productText = `\uD83E\uDDF5 ${product.name} (${product.color})`;
        itemPrice = product.price * item.quantity;
        totalPrice += itemPrice;
        return `${productText}: ${item.quantity} novelo(s) (R$ ${product.price.toFixed(2)} cada) = R$ ${itemPrice.toFixed(2)}`;
      } else {
        return `\uD83E\uDDF5  Produto não encontrado (ID: ${item.id}): ${item.quantity} novelo(s)`;
      }
    });

    const formattedTotalPrice = totalPrice.toFixed(2).replace('.', ',');
    const message = `Olá! Vim conferir meus novelinhos fofos:\n${messageLines.join('\n')}\n\nValor total do carrinho: R$ ${formattedTotalPrice}\n\nQual o valor total e como podemos combinar o pagamento e a entrega? \uD83E\uDDF5 `;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '5569992784621'; // Substitua pelo seu número!
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="shopping-cart-container">
      <h2 className="shopping-cart-title">Seu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">O carrinho está vazio. Que tal dar uma olhada nos nossos produtos?</p>
      ) : (
        <ul className="cart-items-list">
          {cartItems.map(item => {
            // Encontra o produto correspondente usando o ID do item no carrinho
            const product = products.find(p => p.id === item.id);
            return (
              <li key={item.id} className="cart-item">
                {product && ( // Verifica se o produto foi encontrado
                  <span className="cart-item-name">{product.name} ({product.color}) - Quantidade:</span>
                )}
                {!product && (
                  <span className="cart-item-name">Produto não encontrado - Quantidade:</span>
                )}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) => onQuantityChange(item.id, event.target.value)}
                  className="cart-quantity-input"
                />
              </li>
            );
          })}
        </ul>
      )}
      <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
        Enviar Pedido pelo WhatsApp
      </a>
    </div>
  );
};

export default ShoppingCart;