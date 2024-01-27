import emailjs from '@emailjs/browser';
import dateFormatWithDots from '../../utils/dateFormatWithDots';

export default function BookingReceipt(serviceObject) {
  const { VITE_RECEIPT_MAIL_SERVICE_ID, VITE_RECEIPT_MAIL_TEMPLATE_ID } = import.meta.env;
  const { user, startDateValue, endDateValue, parkingDataValue, spots, price } = serviceObject;
  const { zone } = parkingDataValue[0];
  const formattedStartDate = dateFormatWithDots(startDateValue);
  const formattedEndDate = dateFormatWithDots(endDateValue);

  const emailParams = {
    to_name: `${user.firstName} ${user.lastName}`,
    user_email: user.email,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    zone,
    spots,
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
