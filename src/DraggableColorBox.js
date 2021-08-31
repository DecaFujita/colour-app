// import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0',
        bottom: '0',
        padding: '10px',
        color: 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    deleteIcon: {
         color: 'black'
    }
}

const DraggableColorBox = SortableElement(props => {
    const { classes, color, name, handleClick } = props;
    
    return (
        <div 
            className={classes.root}
            style={{ backgroundColor: color }}>
            
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    onClick={handleClick} />
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);