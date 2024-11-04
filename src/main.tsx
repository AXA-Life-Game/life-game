import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <RootRouter />,
//     },
// ]);

createRoot(document.getElementById('root')!).render(
    <App/>
)
