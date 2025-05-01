// src/components/CheckoutForm/CheckoutForm.tsx
import React, { useState } from "react";
import styles from "./CheckoutForm.module.css";
import { useNavigate } from "react-router-dom";
import { CartItem as CartItemType, Product } from "../../types/product";
import { toast } from "react-toastify";

interface CheckoutFormProps {
  cartItems: CartItemType[];
  products: Product[];
  calculateTotal: () => string;
  onEmptyCart: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  products,
  calculateTotal,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const whatsappNumber = "5569992784621";
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio. Adicione itens para fazer o pedido.");
      return;
    }

    const orderDetails = cartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        if (!product) {
          console.error(
            `Produto com ID ${item.id} não encontrado no array de produtos.`
          );
          return null;
        }
        return `- ${item.quantity} x ${product.name} - R$ ${(
          product.price * item.quantity
        ).toFixed(2)}`;
      })
      .filter(Boolean)
      .join("\n");

    const total = calculateTotal();

    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n*Dados do Cliente:*\nNome: ${name}\nTelefone: ${phone}\n\n*Itens do Pedido:*\n${orderDetails}\n\n*Total do Pedido: R$ ${total}*\n\nObservações: ${notes}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );

    toast.success("Pedido enviado para o WhatsApp!", {
      // Exibe a mensagem de sucesso
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Opcional: Redirecionar para uma página de agradecimento ou limpar o carrinho
    // navigate('/pedido-enviado');
  };

  return (
    <div className={styles.checkoutFormContainer}>
      <h1>Finalizar Pedido</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome Completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Telefone (com DDD):</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="notes">Observações (opcional):</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            value={notes}
            onChange={handleNotesChange}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Enviar Pedido via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
