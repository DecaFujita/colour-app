import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';

import './App.css';
 

class App extends React.Component {
  state = {
    palettes: seedColors
  }
  findPalette = id => this.state.palettes.find(palette => palette.id === id)

  savePalette = (newPalette) =>{
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }

  render() {
    return (
      <Switch>
        <Route
          exact path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette}{...routeProps}/>}
        />
        <Route 
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => 
            <SingleColorPalette 
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId) 
            )}/>}
        />
        <Route
          exact
          path='/'
          render={(routeProps) => 
            <PaletteList palettes={this.state.palettes} {...routeProps}
          />}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => 
            <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.id) 
            )}/>}
        />
      
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[5])} />
      // </div>
    );
  }
}

export default App;
