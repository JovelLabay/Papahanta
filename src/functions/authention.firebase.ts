import {
  auth,
  photoStorage,
  realtimeDatabase,
  storage,
} from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { set, ref } from "firebase/database";

async function signin(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function signup(email: string, confirmPassword: string) {
  return await createUserWithEmailAndPassword(auth, email, confirmPassword);
}

async function signout() {
  return await auth.signOut();
}

// CREATE ACCOUNT DATABASE ONCE LOGIN
async function createAccountDb(uid: string | undefined) {
  const uniqueId = uid !== undefined ? uid : JSON.stringify(Math.random());
  try {
    const response = await addDoc(collection(storage, uniqueId), {
      name: "sample",
      age: 45,
    });

    return response;
  } catch (error) {
    return error;
  }
}

// VERFIY YOUR AACOUNT
async function verifyEmail() {
  if (auth.currentUser) return await sendEmailVerification(auth?.currentUser);
}

// CREATE YOUR FIRETORE AND STOREAGE
async function createFirestoreStorage(
  uid: string,
  firstName: string,
  lastName: string,
  gender: string,
  phone: string,
  availability: string,
  country: string,
  municipality_city: string,
  photoUri: string,
  about: string,
  theImages: string[]
) {
  const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  const m_c =
    municipality_city.charAt(0).toUpperCase() + municipality_city.slice(1);

  const usersList = new Promise((resolve, reject) => {
    set(ref(realtimeDatabase, "users/" + uid), {
      userId: uid,
      firstName: fName,
      lastName: lName,
      gender: gender,
      phone: phone,
      availability: availability,
      country: country,
      municipality_city: m_c,
      photoUri: photoUri,
      about: about,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const displayImages = new Promise((resolve, reject) => {
    set(ref(realtimeDatabase, "displayImages/" + uid), {
      theImages: theImages,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  Promise.all([usersList, displayImages])
    .then((res) => res)
    .catch((err) => err);
}

export {
  signin,
  signup,
  signout,
  createAccountDb,
  verifyEmail,
  createFirestoreStorage,
};
