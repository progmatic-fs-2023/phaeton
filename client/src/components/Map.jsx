import React from 'react';

function Map() {
const width400 = "210"
const height100 = "170"
// window resize event

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


return (
    <div className='map'>

    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 900 800">
    {/* Office */}
    <rect x="120" y="1" rx="5" ry="5" width="400" height="55" fill="#CCCCCC" />
    {/* Shuttle */}
    <rect x="10" y="330" rx="5" ry="5" width="80" height="290" fill="#14D32E" />

    {/* Zones A-F */}
    <a href="/" className={`${zoneStatus  } zone-btn`}>
  
    <rect   x="110" y="90" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-A' />
    <text x="190" y="180" fill="black">Zone A</text>

    </a>
    <a href="/" className={`${zoneStatus  } zone-btn`}>
        
    <rect x="380" y="90" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-B'/>
    <text x="460" y="180" fill="black">Zone B</text>

    </a>
    <a href="/" className={`${zoneStatus  } zone-btn`}>

    <rect x="110" y="285" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-C'/>
    <text x="190" y="375" fill="black">Zone C</text>

    </a>
    <a href="/" className={`${zoneStatus  } zone-btn`}>

    <rect  x="380" y="285" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-D'/>
    <text x="460" y="375" fill="black">Zone D</text>

    </a>
    <a href="/" className={`${zoneStatus  } zone-btn`}>
        
    <rect  x="110" y="480" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-E'/>
    <text x="190" y="570" fill="black">Zone E</text>

    </a>
    <a href="/" className={`${zoneStatus  } zone-btn`}>

    <rect  x="380" y="480" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-F'/>
    <text x="460" y="570" fill="black">Zone F</text>

    </a>

    {/* Text for areas */}
    <text x="22" y="470" fill="black">Shuttle</text>
    <text x="280" y="30" fill="black">Office</text>
    
  </svg>
  
</div>
);
}

export default Map;
