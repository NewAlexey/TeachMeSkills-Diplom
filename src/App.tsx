import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { SideMenu } from './components/Main/SideMenu';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <SideMenu />
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
