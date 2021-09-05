import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';
import { render } from '@testing-library/react';


class MiniPalette extends React.Component {
    constructor(props) {
        super(props);
    }

    deletePalette = evt => {
        evt.stopPropagation();
        this.props.handleDelete(this.props.id);
    }

    render() {
        const { classes, paletteName, emoji, colors, handleClick } = this.props;
        const miniColorBoxes = colors.map(color => (
            <div
                className={classes.miniColor}
                style={{backgroundColor: color.color}}
                key={color.name}
            />
        ));
        return (
            <div className={classes.root} onClick={handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    style={{transition: 'all .3s ease-in-out' }}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName}<span className='classes.emoji'>{emoji}</span></h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);