import { createRoot } from 'react-dom/client';
import App from './src/App';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById("app"));

root.render(
    <Provider>
        <App />
    </Provider>
);