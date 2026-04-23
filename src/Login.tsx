import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Task Manager</h1>
      <p>Sign in to continue</p>
      <button
        onClick={handleGoogleLogin}
        style={{ padding: "12px 24px", fontSize: "16px", cursor: "pointer" }}
      >
        Sign in with Google
      </button>
    </div>
  );
}