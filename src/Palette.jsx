import React from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends React.Component {
    render() {
        const colorBoxes = this.props.palette.colors[300].map(color => (
            <ColorBox background={color.hex} name={color.name}/>
        )); 
        return(
            <div className='Palette'>
                <div className='Palette-colors'>
                {colorBoxes}
                </div>
            </div>
        )
    }
}

export default Palette;