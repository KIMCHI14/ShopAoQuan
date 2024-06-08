import React from 'react';
import './index.css';
import App from './App';
import { store } from './app/store';
import { createRoot } from 'react-dom/client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Provider } from 'react-redux';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<Provider store={store}><App /></Provider>);
