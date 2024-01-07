import React from "react"
import './styles/SortBy.css'

function SortBy( {handleSortingFunction} ) {
    return(
        <label htmlFor="sortby" className="sortby">
        <div><span className="material-symbols-outlined">sort</span> Sort by</div>
        <select name="sortby" id="sortby" onChange={handleSortingFunction}>
        <optgroup label="Name">
            <option value="name-a-z">Name A-Z</option>
            <option value="name-z-a">Name Z-A</option>
          </optgroup>
          <optgroup label="Price">
            <option value="cheapest">Price lowest first</option>
            <option value="most-expensive">Price highest first</option>
          </optgroup>
          <optgroup label="Seat quantity">
            <option value="least-seats">Seat quantity lowest first</option>
            <option value="most-seats">Seat quantity highest first</option>
          </optgroup>
          <optgroup label="Trunk capacity">
            <option value="least-luaggage">Trunk capacity Lowest first</option>
            <option value="most-luaggage">Trunk capacity highest first</option>
          </optgroup>
          <optgroup label="Engine Power">
            <option value="least-power">Engine Power Lowest first</option>
            <option value="most-power">Engine Power highest first</option>
          </optgroup>
        </select>
      </label>
    )
}

export default SortBy