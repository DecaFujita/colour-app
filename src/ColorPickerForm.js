import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
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
        const { paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return(
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}/>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        value={newColorName}
                        name='newColorName'
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
                        style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
                    >
                        {paletteIsFull ? 'Palette full' : 'Add color'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default ColorPickerForm;