
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import {toast, ToastContainer} from 'react-toastify';
function App() {
  return (
    <div >
     <BrowserRouter>
     <ToastContainer position="bottom-center" limit={1} />
     <Routes>
     <Route path="/" element={<SignupScreen/>} />
     <Route path="/homescreen/:id" element={<HomeScreen/>} />
     <Route path="/signinscreen" element={<SigninScreen/>} />
     </Routes>
    
     </BrowserRouter>
     
    
      
    </div>
  );
}

export default App;
