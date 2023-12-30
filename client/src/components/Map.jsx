import React from 'react';

const width400 = "300"
const height100 = "90"
function Map() {
return (
    <div className='map'>

    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 900 500">
    {/* Building */}
    <rect x="50" y="10" rx="5" ry="5" width="300" height="200" fill="#CCCCCC" />
    {/* Bus */}
    <rect x="50" y="230" rx="5" ry="5" width="100" height="150" fill="#14D32E" />

    {/* Zones A-F */}
    <a href="/">

    <rect className='zone-btn' x="370" y="10" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-A'/>
    </a>
    <a href="/">
        
    <rect className='zone-btn' x="370" y="120" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-B'/>
    </a>
    <a href="/">

    <rect className='zone-btn' x="170" y="230" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-C'/>
    </a>
    <a href="/">

    <rect className='zone-btn' x="490" y="230" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-D'/>
    </a>
    <a href="/">
        
    <rect className='zone-btn' x="170" y="340" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-E'/>
    </a>
    <a href="/">

    <rect className='zone-btn' x="490" y="340" rx="5" ry="5" width={width400} height={height100} aria-label='Zone-F'/>
    </a>

    {/* Text for areas */}
    <text x="85" y="305" fill="black">Bus</text>
    <text x="170" y="120" fill="black">Phaeton</text>
    <text x="470" y="60" fill="black">Zone A</text>
    <text x="470" y="170" fill="black">Zone B</text>
    <text x="220" y="275" fill="black">Zone C</text>
    <text x="540" y="275" fill="black">Zone D</text>
    <text x="220" y="380" fill="black">Zone E</text>
    <text x="540" y="380" fill="black">Zone F</text>
    
  </svg>
  
</div>
);
}

export default Map;
