import React from "react"
import "./styles/ParkingZones.css"
function ParkingZones (){
    const parkingLot = [
        {id:"123abc", zone: "A", serviceID: null},
        {id:"122abc", zone: "A", serviceID: null},
        {id:"124abc", zone: "A", serviceID: null},
        {id:"125abc", zone: "A", serviceID: null},
        {id:"126abc", zone: "A", serviceID: "321"},
        {id:"127abc", zone: "B", serviceID: null},
        {id:"128Bbc", zone: "B", serviceID: null},
        {id:"129Bbc", zone: "B", serviceID: null},
        {id:"121Bbc", zone: "B", serviceID: null},
        {id:"122Bbc", zone: "B", serviceID: "321"},
        {id:"123abc", zone: "C", serviceID: null},
        {id:"124Cbc", zone: "C", serviceID: null},
        {id:"125Cbc", zone: "C", serviceID: null},
        {id:"126Cbc", zone: "C", serviceID: null},
        {id:"127Cbc", zone: "C", serviceID: "321"},
      ]
      
      const zoneA = parkingLot.filter(e => e.zone === "A")
      function checkStatus(zone){
        
        if (zone.length === 0){
          return "noSpace"
        }if(zone.length > 0 && zone.length <= 2 ){
          return "quarterSpace"
        }
          return "freeSpace"
        
      }
const zoneStatus = checkStatus(zoneA)


    return(<>
    <div className="zones-grid">
        <div className="office"><span>Office</span></div>
        <div className="shuttle-div"><span>Shuttle</span></div>
        <a href="/" className="zone-A">

        <div className={`${zoneStatus  } zone-btn`}><span>Zone A</span></div>
        </a>
        <a href="/" className="zone-B">

        <div className={`${zoneStatus  } zone-btn`}><span>Zone B</span></div>
        </a>
        <a href="/" className="zone-C">

        <div className={`${zoneStatus  } zone-btn`}><span>Zone C</span></div>
        </a>
        <a href="/" className="zone-D">

        <div className={`${zoneStatus  } zone-btn`}><span>Zone D</span></div>
        </a>
        <a href="/" className="zone-E">

        <div className={`${zoneStatus  } zone-btn`}><span>Zone E</span></div>
        </a>
        <a href="/" className="zone-F">

        <div className={`${zoneStatus  } zone-btn`}><span>Zone F</span></div>
        </a>
    </div>
    
    </>)
}
export default ParkingZones