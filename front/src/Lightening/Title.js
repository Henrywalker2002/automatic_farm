import React from 'react';
// import { Icon } from '@iconify/react';
import { MdOutlineLightMode } from "react-icons/md";
import '../Nhi.css';

function Title() {
    const Style = { color: "#229F27"};
    return(
        <div class="header">
            <h1><MdOutlineLightMode style={Style}/>LIGHTENING</h1>
        </div>
    );
}

export default Title;