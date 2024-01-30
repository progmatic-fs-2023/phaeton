import emailjs from '@emailjs/browser';
import dateFormatWithDots from '../../utils/dateFormatWithDots';
import numberWithSpaces from '../../utils/numberWithSpaces';
import getDaysBetweenDates from '../../utils/getDaysBetweenDates';

export default function BookingReceipt(serviceObject) {
  const { VITE_RECEIPT_MAIL_SERVICE_ID, VITE_RECEIPT_MAIL_TEMPLATE_ID, VITE_RECEIPT_PUBLIC_KEY } =
    import.meta.env;

  if (serviceObject.service === 'parking') {
    const { user, startDateValue, endDateValue, parkingDataValue, spots, price } = serviceObject;
    const { zone } = parkingDataValue[0];
    const formattedStartDate = dateFormatWithDots(startDateValue);
    const formattedEndDate = dateFormatWithDots(endDateValue);

    const emailParams = {
      to_name: `${user.firstName} ${user.lastName}`,
      user_email: user.email,
      message: `Dear ${user.firstName} ${user.lastName},

Thank you for choosing our parking service. We are pleased to confirm your reservation for the following details:
Number of parking spots: ${spots}
Zone: ${zone}
Start Date: ${formattedStartDate}
End Date: ${formattedEndDate}
The total cost of your reservation is ${price} HUF, payable upon pickup.

If you have any questions or need to make changes, feel free to contact us at info@phaeton.com.

We appreciate your business and look forward to serving you.

Best regards,

Chuck Norris,
Phaeton`,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      price,
    };
    emailjs
      .send(
        VITE_RECEIPT_MAIL_SERVICE_ID,
        VITE_RECEIPT_MAIL_TEMPLATE_ID,
        emailParams,
        VITE_RECEIPT_PUBLIC_KEY,
      )
      .then((response) => response)
      .catch((error) => error);
  }

  if (serviceObject.service === 'rental') {
    const { user, startDateValue, endDateValue, carData } = serviceObject;
    const { model, price } = carData;
    const calculatedPrice = numberWithSpaces(
      getDaysBetweenDates(startDateValue, endDateValue) * price,
    );
    const formattedStartDate = dateFormatWithDots(startDateValue);
    const formattedEndDate = dateFormatWithDots(endDateValue);
    const emailParams = {
      to_name: `${user.firstName} ${user.lastName}`,
      user_email: user.email,
      message: `Dear ${user.firstName} ${user.lastName},

Thank you for choosing our car rental service. We are pleased to confirm your reservation for the following details:

Car Type: ${model}
Pickup Date: ${formattedStartDate}
Return Date: ${formattedEndDate}
Please ensure to bring the necessary documents and adhere to the agreed-upon pickup and return times. The total cost of your reservation is ${calculatedPrice} HUF, payable upon pickup.

If you have any questions or need to make changes, feel free to contact us at info@phaeton.com.

We appreciate your business and look forward to serving you.

Best regards,

Chuck Norris,
Phaeton`,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      price: calculatedPrice,
    };
    emailjs
      .send(
        VITE_RECEIPT_MAIL_SERVICE_ID,
        VITE_RECEIPT_MAIL_TEMPLATE_ID,
        emailParams,
        VITE_RECEIPT_PUBLIC_KEY,
      )
      .then((response) => response)
      .catch((error) => error);
  }
}
