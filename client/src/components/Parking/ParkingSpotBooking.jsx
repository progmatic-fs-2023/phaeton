function ParkingSpotBooking(){
// user needs to be checked if signed in or wants to be a guest user
const isGuestUser = false
return(
    <div className="parkingBooking-container">
        {isGuestUser?
    <div className="guestuser-form">
        <form action="POST">
            <div>
                <input type="text" placeholder="First name" />
                <input type="text" placeholder="Last name" />
                <input type="email" name="email" placeholder="Enter e-mail" />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div> :
        <form action="POST">

    <div>
        <p>first name</p>
        <p>last name</p>
        <p>email</p>
    </div>
    <button type="submit">Submit</button>
        </form>
}
    </div>
)
}
export default ParkingSpotBooking