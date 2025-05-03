// src/features/checkout/pages/PedidoEnviadoPage.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PedidoEnviadoPage.module.css' // Crie este arquivo CSS

const PedidoEnviadoPage: React.FC = () => {
  return (
    <div className={styles.pedidoEnviadoContainer}>
      <h1>Pedido Enviado com Sucesso!</h1>
      <p>Agradecemos por sua compra em nossa loja de barbantes!</p>
      <p>
        Seu pedido foi enviado para o nosso WhatsApp e entraremos em contato em breve para confirmar
        os detalhes de pagamento e entrega.
      </p>
      <p>Caso tenha alguma dúvida, você pode nos contatar diretamente pelo WhatsApp.</p>
      <Link to="/" className={styles.voltarParaHome}>
        Voltar para a Página Inicial
      </Link>
    </div>
  )
}

export default PedidoEnviadoPage
