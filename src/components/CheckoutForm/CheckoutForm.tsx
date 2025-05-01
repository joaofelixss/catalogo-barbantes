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
  onEmptyCart,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [desejaEntrega, setDesejaEntrega] = useState(false);
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [frete] = useState(5.0); // Valor fixo do frete
  const whatsappNumber = "5569992784621";
  const navigate = useNavigate();

  const totalCompra = parseFloat(calculateTotal());
  const totalComFrete = desejaEntrega ? totalCompra + frete : totalCompra;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(""); // Limpa o erro ao digitar
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
    setPhoneError(""); // Limpa o erro ao digitar
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  const handleDesejaEntregaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDesejaEntrega(event.target.checked);
    // Limpar o endereço se a entrega não for desejada
    if (!event.target.checked) {
      setEnderecoEntrega("");
    }
  };

  const handleEnderecoEntregaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEnderecoEntrega(event.target.value);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Por favor, digite seu nome completo.");
      isValid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Por favor, digite seu telefone com DDD.");
      isValid = false;
    } else if (!/^\d{2}\d{8,9}$/.test(phone)) {
      setPhoneError(
        "Por favor, digite um telefone válido com DDD (ex: 69999999999)."
      );
      isValid = false;
    }

    if (desejaEntrega && !enderecoEntrega.trim()) {
      alert("Por favor, digite o endereço de entrega.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      if (cartItems.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens para fazer o pedido.");
        return;
      }

      let orderDetails = cartItems
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) {
            console.error(
              `Produto com ID ${item.id} não encontrado no array de produtos.`
            );
            return null;
          }
          const details = [`${product.color}`];
          if (product.num) {
            details.push(`Numeração ${product.num}`);
          }
          return `- ${item.quantity} x ${product.name} (${details.join(
            ", "
          )}) - R$ ${(product.price * item.quantity).toFixed(2)}`;
        })
        .filter(Boolean)
        .join("\n");

      const total = totalComFrete.toFixed(2);

      let message = `Olá! Gostaria de fazer o seguinte pedido:\n\n*Dados do Cliente:*\nNome: ${name}\nTelefone: ${phone}\n\n`;

      if (desejaEntrega) {
        message += `*Entrega:*\nSim\nEndereço: ${enderecoEntrega}\nFrete: R$ ${frete.toFixed(
          2
        )}\n\n`;
      } else {
        message += `*Entrega:*\nNão (Retirada no local)\n\n`;
      }

      message += `*Itens do Pedido:*\n${orderDetails}\n\n*Total do Pedido: R$ ${total}*\n\nObservações: ${notes}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
        "_blank"
      );

      toast.success("Pedido enviado para o WhatsApp!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onEmptyCart();
      navigate("/");
    }
  };

  return (
    <div className={styles.checkoutFormContainer}>
      <h1>Finalizar Pedido</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Informações de Contato</h2>
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
            {nameError && <p className={styles.errorMessage}>{nameError}</p>}
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
            {phoneError && <p className={styles.errorMessage}>{phoneError}</p>}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Opção de Entrega</h2>
          <div className={styles.formGroup}>
            <label
              className={styles.entregaEmCasaLabel}
              htmlFor="desejaEntrega"
            >
              <input
                type="checkbox"
                id="desejaEntrega"
                name="desejaEntrega"
                checked={desejaEntrega}
                onChange={handleDesejaEntregaChange}
                className={styles.entregaEmCasaInput}
              />
              <span className={styles.entregaEmCasaTexto}>
                Deseja que o produto seja entregue em sua casa?
              </span>
            </label>
          </div>
          {desejaEntrega && (
            <div className={styles.formGroup}>
              <label htmlFor="enderecoEntrega">Endereço de Entrega:</label>
              <textarea
                id="enderecoEntrega"
                name="enderecoEntrega"
                rows={3}
                value={enderecoEntrega}
                onChange={handleEnderecoEntregaChange}
                required
              />
            </div>
          )}
          {desejaEntrega && (
            <p className={styles.freteInfo}>Frete: R$ {frete.toFixed(2)}</p>
          )}
          <p className={styles.total}>
            Total: <strong>R$ {totalComFrete.toFixed(2)}</strong>
          </p>
        </div>

        <div className={styles.section}>
          <h2>Observações Adicionais</h2>
          <div className={styles.formGroup}>
            <label htmlFor="notes">Alguma observação sobre o seu pedido?</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={notes}
              onChange={handleNotesChange}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Enviar Pedido via WhatsApp
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
