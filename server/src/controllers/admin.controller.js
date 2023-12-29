import cancelServiceById from '../services/admin.service';

// export functions individually when there's more function in it

async function endService(req, res) {
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

export default endService;
