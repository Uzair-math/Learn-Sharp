// TODO
const sendPaymentNotificationEmail = async (payment) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ssl-payment/payment-email-confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      }
    );

    if (response.ok) {
      return "Email sent successfully!";
    } else {
      return "Email sending failed!";
    }
  } catch (error) {
    return `Error sending email: ${error}`;
  }
};

export default sendPaymentNotificationEmail;
