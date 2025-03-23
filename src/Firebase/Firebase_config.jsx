// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCnnoBmEYJAwY8Sf2CM0YIRf0lRaZAvaRc",

    authDomain: "portfolio-79555.firebaseapp.com",

    projectId: "portfolio-79555",

    storageBucket: "portfolio-79555.firebasestorage.app",

    messagingSenderId: "638252856255",

    appId: "1:638252856255:web:c1b80280d34a776f92e70a",

    measurementId: "G-S8W4KQ3HW0"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth(app);

export { analytics, database, auth };




// const GetFireDatabase = async () => {
//   const db = database;

//   try {
//     const refer = ref(db, "addCart/cartItems");
//     const getuser = get(refer);
//     if ((await getuser).exists()) {
//       const forFilter = Object.values((await getuser).val());
//       const filteringData = forFilter.find(
//         (filterer) => filterer.id === formData.phone
//       );

//       if (filteringData) {
//         const newDoc = ref(database, "addCart/cartItems")
//         localStorage.setItem("acNumber", JSON.stringify(acNumber));

//         set(newDoc, {
//           Ac_number: acNumber,

//           balance: Number(bal.toFixed(2)),
//           ...formData,
//           phone: Number(formData.phone),
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };