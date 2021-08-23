import React from 'react';
import Palette from './Palette';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';

import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedColors[5])} />
      </div>
    );
  }
}

export default App;
