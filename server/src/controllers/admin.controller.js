import { cancelServiceById, serviceQuery } from '../services/admin.service';

// export functions individually when there's more function in it

export async function endService(req, res) {
  try {
    const result = await cancelServiceById(req.params.userID, req.body.id);
    res.json({
      message: 'Service cancelled successfully',
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
}

export async function getServices(__, res) {
  try {
    const result = await serviceQuery();
    res.status(200).json({
      message: 'Service request successful',
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: `Internal server error code: 400`,
      message: err.message,
    });
  }
}
