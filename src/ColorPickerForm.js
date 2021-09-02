import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends React.Component {
    state = {
        currentColor: 'teal',
        newColorName: [],
    }

    
    updateCurrentColor = newColor => {
        this.setState({currentColor:newColor.hex})
    }    

    handleChange = evt => {
        this.setState({
          [evt.target.name]: evt.target.value
        });
    }

    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return(
            <div className={classes.root}>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        value={newColorName}
                        name='newColorName'
                        placeholder='Color name'
                        variant='filled'
                        margin= 'normal'
                        className={classes.colorNameInput}
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={[
                            'Enter a color name',
                            'Color name must be unique', 
                            'Color already used'
                        ]}
                    />
                    <Button
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
                    >
                        {paletteIsFull ? 'Palette full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);