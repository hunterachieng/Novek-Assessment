import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout';
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider } from '@elastic/eui';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <EuiProvider colorMode='light'>
    <div>
     <Layout header={'Dashboard'}>
      <Dashboard/>
     </Layout>
    </div>
    </EuiProvider>
  );
}

export default App;
