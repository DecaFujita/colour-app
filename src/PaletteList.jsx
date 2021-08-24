import React from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';

class PaletteList extends React.Component {
    render() {
        const { palettes } = this.props;
        return (
            <div> 
                {palettes.map(palette =>
                    <MiniPalette  {...palette} />
                )}
            </div>
        )
    }
}

export default PaletteList;