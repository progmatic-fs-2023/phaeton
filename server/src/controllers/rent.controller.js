import { getAllCars, getCarById, rentCarById } from '../services/rent.service';

export const list = async (_, res) => {
  const result = await getAllCars();
  res.json(result);
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
    const { userId, RentStartDate, RentEndDate } = req.body;
    const result = await rentCarById(req.params.id, userId, RentStartDate, RentEndDate);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
};
