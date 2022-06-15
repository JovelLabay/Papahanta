import { auth } from "../../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

async function signin(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

async function signup(email: string, confirmPassword: string) {
  return await createUserWithEmailAndPassword(auth, email, confirmPassword);
}

async function signout() {
  return await auth.signOut();
}

export { signin, signup, signout };
