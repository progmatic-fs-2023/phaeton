function ParkingBookingDetails({ props }) {
  const { parkingSpotID, fromDate, toDate } = props; // destructuring object, needed for eslint to shut up
  const { zone } = parkingSpotID; // only necessary data needed etc.
  console.log(zone);
  return (
    <>
      <h2>Confirm your booking:</h2>
      <div>Car model or whatever</div>
      <div>{`From ${fromDate} to ${toDate}`}</div>
    </>
  );
}
export default ParkingBookingDetails;
