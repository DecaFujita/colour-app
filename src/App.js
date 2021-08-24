import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';

import './App.css';
 

class App extends React.Component {

  findPalette = id => seedColors.find(palette => palette.id === id)

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={() => <PaletteList palettes={seedColors}/>}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => 
            <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.id) 
            )}
          />}
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[5])} />
      // </div>
    );
  }
}

export default App;
