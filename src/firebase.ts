import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB2EPQ8j-l-LYocQjJ5XBFB24ukzoSIY9w",
  authDomain: "wedding-guestbook-6c9e3.firebaseapp.com",
  databaseURL: "https://wedding-guestbook-6c9e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wedding-guestbook-6c9e3",
  storageBucket: "wedding-guestbook-6c9e3.firebasestorage.app",
  messagingSenderId: "650744159945",
  appId: "1:650744159945:web:5a775c10a24f0ee050f718"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
