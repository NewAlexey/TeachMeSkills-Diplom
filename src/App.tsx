import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import { AppRouter } from './components/AppRouter';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header';
import { ModalOrder } from './components/Modal';
import { SideMenu } from './components/SideMenu';
import { IStore } from './redux/constants';

function App() {
  const isOpenModalOrder = useSelector((store: IStore) => store.appReducer.isOpenModalOrder);
  return (
    <div className="App">
      <BrowserRouter>
        {isOpenModalOrder && <ModalOrder />}
        <Header />
        <SideMenu />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
