import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './Redux/store';
import {
	ChakraProvider,
	extendTheme
} from "@chakra-ui/react";
import './index.css'
import 'firebase/compat/auth';
import 'firebase/compat/database';
import firebase from 'firebase/compat/app';

const theme = extendTheme({
	colors: {
		brand: {
			50: "#f0e4ff",
			100: "#cbb2ff",
			200: "#a480ff",
			300: "#7a4dff",
			400: "#641bfe",
			500: "#5a01e5",
			600: "#5200b3",
			700: "#430081",
			800: "#2d004f",
			900: "#14001f",
		},
	},
	fonts: {
		heading: `'Inter', sans-serif`,
		body: `'Inter', sans-serif`,
	},
});


const firebaseConfig = {
  apiKey: "AIzaSyAH68_lKlTOKeCDiAkTOYNxExeCVpHrCM8",
  authDomain: "instinct-cc4b5.firebaseapp.com",
  projectId: "instinct-cc4b5",
  storageBucket: "instinct-cc4b5.appspot.com",
  messagingSenderId: "761549601871",
  appId: "1:761549601871:web:c74f213e7af45f0f7ebe3a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
