'use server';

import { NotificationType, EmailProductInfo, EmailContent } from '@/types';
import nodemailer from 'nodemailer';

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
};

export async function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType
) {
  const THRESHOLD_PERCENTAGE = 40;

  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = '';
  let body = '';

  switch (type) {
    case Notification.WELCOME:
      subject = `Bienvenido al tracking de precio para: ${shortenedTitle}`;
      body = `
        <div>
          <h2>Bienvenido a PriceTracker! 📉</h2>
          <p>Ahora estás siguiendo el precio de ${product.title}.</p>
          <p>Acá hay un ejemplo de como vas a recibir nuestros correos:</p>
          <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
            <h3>${product.title} está de nuevo en stock!</h3>
            <p>Estamos contentos de avisarte que ${product.title} está de nuevo en stock.</p>
            <p>No te lo pierdas - <a href="${product.url}" target="_blank" rel="noopener noreferrer">compralo ahora</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
          </div>
          <p>Estate atento a ${product.title} para ver si cambia el precio de nuevo!</p>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} está de nuevo en stock!`;
      body = `
        <div>
          <h4>Hola!, ${product.title} está de nuevo en stock! Compralo antes de que se termine!</h4>
          <p>Mirá el producto <a href="${product.url}" target="_blank" rel="noopener noreferrer">acá</a>.</p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Alerta de precio bajo para ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hola!, ${product.title} tiene el precio mas bajo desde que lo empezamos a seguir!!</h4>
          <p>Comprá el producto <a href="${product.url}" target="_blank" rel="noopener noreferrer">acá</a> ahora!!</p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Alerta de descuento para ${shortenedTitle}`;
      body = `
        <div>
          <h4>Hola, ${product.title} tiene una rebaja de hasta ${THRESHOLD_PERCENTAGE}%!</h4>
          <p>Compralo ahora mismo desde <a href="${product.url}" target="_blank" rel="noopener noreferrer">acá. No te lo pierdas!</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error('Invalid notification type.');
  }
  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: 'trackdeprecios@hotmail.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1,
});

export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {
  const mailOptions = {
    from: 'trackdeprecios@hotmail.com',
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      console.log(error);
    }
    console.log('Email sent: ', info);
  });
};
