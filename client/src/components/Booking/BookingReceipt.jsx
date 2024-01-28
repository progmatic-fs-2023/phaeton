import emailjs from '@emailjs/browser';
import dateFormatWithDots from '../../utils/dateFormatWithDots';
import numberWithSpaces from '../../utils/numberWithSpaces';
import getDaysBetweenDates from '../../utils/getDaysBetweenDates';

export default function BookingReceipt(serviceObject) {
  const { VITE_RECEIPT_MAIL_SERVICE_ID, VITE_RECEIPT_MAIL_TEMPLATE_ID } = import.meta.env;

  if (serviceObject.service === 'parking') {
    const { user, startDateValue, endDateValue, parkingDataValue, spots, price } = serviceObject;
    const { zone } = parkingDataValue[0];
    const formattedStartDate = dateFormatWithDots(startDateValue);
    const formattedEndDate = dateFormatWithDots(endDateValue);

    const emailParams = {
      to_name: `${user.firstName} ${user.lastName}`,
      user_email: user.email,
      message: `
      Thank you for reserving in zone ${zone} ${spots} spots,
      `,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      price,
    };
    emailjs
      .send(
        VITE_RECEIPT_MAIL_SERVICE_ID,
        VITE_RECEIPT_MAIL_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_API_PUBLIC_KEY,
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
      message: `Thank you for renting ${model}`,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      price: calculatedPrice,
    };
    emailjs
      .send(
        VITE_RECEIPT_MAIL_SERVICE_ID,
        VITE_RECEIPT_MAIL_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_API_PUBLIC_KEY,
      )
      .then((response) => response)
      .catch((error) => error);
  }
}
