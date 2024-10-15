import './App.css';
import Greeting from './components/main-page';
import Header from './components/header';
function App() {
  return (
    <div >
      <div>
        <Header headerMessage="This is header message!"/>
      </div>
      <div>
        <Greeting name='Joe' />
      </div>
      </div>
  );
}

export default App;
