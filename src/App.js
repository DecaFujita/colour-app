import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';
import { TransitionGroup, CSSTransition, Transition } from 'react-transition-group';
import Page from './Page'
import './App.css';
 

class App extends React.Component {
  constructor(props){
    super();
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    }
  }
  findPalette = id => this.state.palettes.find(palette => palette.id === id)

  
  deletePalette = id => {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }), this.syncLocalStorage)
  }

  savePalette = newPalette => {
    this.setState({palettes: [...this.state.palettes, newPalette]},
    this.syncLocalStorage
    );
  }
  
  syncLocalStorage() {
    //save palettes to local storage
    window.localStorage.setItem(
      'palettes',
       JSON.stringify(this.state.palettes)
    )
  }

  render() {
    return (
      <Route
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route
                  exact path='/palette/new'
                  render={(routeProps) => 
                    <Page>
                      <NewPaletteForm 
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Page>
                  }
                />
                <Route 
                  exact
                  path='/palette/:paletteId/:colorId'
                  render={routeProps => 
                    <Page>
                      <SingleColorPalette 
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId) 
                        )}
                      />
                    </Page>
                  }
                />
                <Route
                  exact
                  path='/'
                  render={(routeProps) => 
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </Page>
                  }
                />
                <Route
                  exact
                  path='/palette/:id'
                  render={routeProps => 
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id) 
                        )}
                      />
                    </Page>
                  }
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
     
      // <div>
      //   <Palette palette={generatePalette(seedColors[5])} />
      // </div>
    );
  }
}

export default App;
