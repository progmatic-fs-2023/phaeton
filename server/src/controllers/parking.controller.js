import {
  getAllParkingLot,
  getParkingLotById,
  bookParkingLotById,
  getParkingAndServicesByDate,
} from '../services/parking.services';

import dateFormatter from '../middlewares/dateFormatter.middleware';

export const list = async (req, res) => {
  try {
    const parkingLots = await getAllParkingLot();
    res.json(parkingLots);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: 'Internal server error code: 400',
    });
  }
};

export const listByDate = async (req, res) => {
  try {
    const { ServiceStartDate, ServiceEndDate } = req.body;
    const formattedServiceStartDate = dateFormatter(ServiceStartDate);
    const formattedServiceEndDate = dateFormatter(ServiceEndDate);
    if (new Date(ServiceStartDate) > new Date(ServiceEndDate)) {
      throw new Error('The Start date is greater than the End Date');
    } else if (ServiceStartDate === ServiceEndDate) {
      throw new Error('The minimum book time is 1 day');
    } else {
      const result = await getParkingAndServicesByDate(
        formattedServiceStartDate,
        formattedServiceEndDate,
      );
      res.json(result);
    }
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
};

export const listById = async (req, res) => {
  try {
    const parkingLot = await getParkingLotById(req.params.id);
    if (parkingLot) {
      res.status(200).json(parkingLot);
    } else {
      res.status(404).json({
        message: 'Internal server error code 404',
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
};

export const book = async (req, res) => {
  try {
    const { userID, ServiceStartDate, ServiceEndDate } = req.body;
    const formattedServiceStartDate = dateFormatter(ServiceStartDate);
    const formattedServiceEndDate = dateFormatter(ServiceEndDate);
    const booked = await bookParkingLotById(
      req.params.id,
      userID,
      formattedServiceStartDate,
      formattedServiceEndDate,
    );
    res.json({ message: 'Parking lot rented successfully', booked });
  } catch (err) {
    res.status(400).json({ error: 'Internal server error code: 400', message: err.message });
  }
};
