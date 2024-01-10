function ParkingBookingDetails({ props }) {
  const { parkingSpotID, fromDate, toDate } = props;
  const { zone } = parkingSpotID;
  console.log(zone);
  return (
    <>
      <h2>Confirm your booking:</h2>
      <div>{`One spot in zone: ${zone}`}</div>
      <div>{`From ${fromDate} to ${toDate}`}</div>
    </>
  );
}
export default ParkingBookingDetails;
