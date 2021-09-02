import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button'
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20
  }
  state = {
      open: true,
      newPaletteName: '',
      colors: this.props.palettes[0].colors
  };

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
      this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', (value) => 
      this.state.colors.every(
          ({color}) => color !== this.state.currentColor
      ) 
    );
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
      this.props.palettes.every(
          ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      ) 
    );
  }
    
  handleDrawerOpen = () => {
      this.setState({ open: true });
  };
  
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = (newColor) => {
    this.setState({ colors: [...this.state.colors, newColor], newColorName:''});
  }

  clearColors = () => { this.setState({colors: []});}

  addRandomColor = () => {
      const allColors = this.props.palettes.map(p => p.colors).flat();
      let rand = Math.floor(Math.random() * allColors.length);
      const randomColor = allColors[rand];
      this.setState({ colors: [...this.state.colors, randomColor]})
  }

  handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors

    this.props.savePalette(newPalette)
    this.props.history.push('/');
  }

  removeColor = (colorName) => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName) // filtering out where colour == colour
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, theme, maxColors, palettes } = this.props;
    const { open, colors} = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
          />
       
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography 
              variant='h4'
              gutterBottom
            >
                Design your palette
            </Typography>
            <div className={classes.buttons}>
                <Button 
                  variant='contained'
                  color='secondary'
                  className={classes.button}
                  onClick={this.clearColors}>
                    Clear Palette
                </Button>
                <Button 
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  disabled={paletteIsFull}
                  onClick={this.addRandomColor}> 
                    Random Color
                </Button>
            </div>
            <ColorPickerForm
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
            distance={2}
            // pressDelay={100} //for the trash button to work properly
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
