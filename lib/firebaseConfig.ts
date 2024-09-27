// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAuNsBGvPXldqyCRoHgGtSpHxudcH5_oI",
  authDomain: "taskweb-9d6fe.firebaseapp.com",
  projectId: "taskweb-9d6fe",
  storageBucket: "taskweb-9d6fe.appspot.com",
  messagingSenderId: "32980870744",
  appId: "1:32980870744:web:e2ef263338f4a242bacc2d",
  measurementId: "G-NB1MNNBG64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
