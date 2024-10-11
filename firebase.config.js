import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVucf7YVr03CKFFFEPy2aS42ZXg9ZNGDo",
  authDomain: "user-management-system-298a9.firebaseapp.com",
  projectId: "user-management-system-298a9",
  storageBucket: "user-management-system-298a9.appspot.com",
  messagingSenderId: "564280653892",
  appId: "1:564280653892:web:d266a38301f16765396411"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;