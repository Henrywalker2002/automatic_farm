import React from 'react';
// import { Icon } from '@iconify/react';
import { GiPlantWatering } from "react-icons/gi";
import '../Nhi.css';

function Title() {
    const PlantWateringStyle = { color: "#229F27"};
    return(
        <div class="header">
            <h1><GiPlantWatering style={PlantWateringStyle}/>WATERING</h1>
        </div>
    );
}

export default Title;