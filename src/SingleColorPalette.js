import React from 'react';
// import { withStyles } from '@material-ui/styles';

// const styles = {
//     root: {
//     }
// };

class SingleColorPalette extends React.Component {
    render() {
        const { palettes } = this.props;
        return (
            <div> 
                <h1>Single Color Palette</h1>
            </div>
        )
    }
}

export default SingleColorPalette;
// export default withStyles(styles)(MiniPalette);