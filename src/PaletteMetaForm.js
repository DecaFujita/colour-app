import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

class PaletteMetaForm extends React.Component {
  state = {
      stage: 'form',
      newPaletteName: ''
    };
  
  componentDidMount() {
      ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
          this.props.palettes.every(
              ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
          ) 
      );
  }

  handleChange = evt => {
      this.setState({
        [evt.target.name]: evt.target.value
      });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };    

  showEmojiPicker = () => {
    this.setState({stage: 'emoji'})
  };

  savePalette = (emoji) => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: ''});
  }

  render() {
    const { hideForm } = this.props;
    const { newPaletteName, stage } = this.state;
    return (
      <div>
        <Dialog
          open={stage === 'emoji'}
          onClose={hideForm}
        >
          <DialogTitle id="form-dialog-title">Choose a palette emoji</DialogTitle>
          <Picker 
            onSelect={this.savePalette}
            title='Pick a palette emoji'
          />
        </Dialog>
        <Dialog
          open={stage === 'form'}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
        <DialogTitle id="form-dialog-title">Choose a palette name</DialogTitle>
        <ValidatorForm onSubmit={this.showEmojiPicker}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your patelle. Make sure it's unique!
          </DialogContentText>
          <TextValidator
            label='Palette name'
            value={newPaletteName}
            name='newPaletteName'
            fullWidth
            margin = 'normal'
            onChange={this.handleChange}
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={[
                'Enter a palette name',
                'Palette name must be unique']}
          />
        </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button
              variant='contained'
              type='submit'
              color='primary'
            >
                Save palette
            </Button>
          </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;