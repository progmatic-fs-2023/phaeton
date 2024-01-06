import {
  getAllCars,
  getCarsAndServicesByDate,
  getCarById,
  rentCarById,
} from '../services/rent.service';

export const list = async (_, res) => {
  const result = await getAllCars();
  res.json(result);
};

export const listByDate = async (req, res) => {
  try {
    const { ServiceStartDate, ServiceEndDate } = req.body;
    if (new Date(ServiceStartDate) > new Date(ServiceEndDate)) {
      throw new Error('The Start date is greater than the End Date');
    } else if (ServiceStartDate === ServiceEndDate) {
      throw new Error('The minimum rent time is 24 hours');
    } else {
      const result = await getCarsAndServicesByDate(ServiceStartDate, ServiceEndDate);
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
    const result = await getCarById(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        error: 404,
        message: 'ID not found',
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
};

export const rent = async (req, res) => {
  try {
    const { userID, ServiceStartDate, ServiceEndDate } = req.body;
    const result = await rentCarById(req.params.id, userID, ServiceStartDate, ServiceEndDate);
    res.json({
      message: 'Car rented successfully',
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
};
