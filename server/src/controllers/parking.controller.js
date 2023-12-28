import { getAllParkingLot, getParkingLotById } from '../services/parking.services';

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

export const listById = async (req, res) => {
  try {
    const parkingLot = await getParkingLotById(req.params.id);
    if (parkingLot) {
      res.status(200).json(parkingLot);
    } else {
      res.status(404).json({
        error: 'Internal server error code 404',
        message: err.message,
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
  const {} = req.body;
  const booked = await bookParkingLotById();
};
