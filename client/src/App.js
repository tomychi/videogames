import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Home } from './components/Home';
import { Detail } from './components/Detail';
import { GameCreated } from './components/GameCreated';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/home' component={Home} />
                    <Route path='/videogames/:id' component={Detail} />
                    <Route path='/videogame' component={GameCreated} />

                    {/* cualquier otra ruta al LandingPage */}
                    <Route path='*' component={LandingPage} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
