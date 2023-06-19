import { useState, useEffect, createContext } from 'react';
import type firebase from 'firebase/compat/app';
import { auth, signInWithGoogle } from './firebaseConfig';

interface UserContextState {
  user: firebase.User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<UserContextState>({
  user: null,
  loading: true,
  signInWithGoogle: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogleAuth = async () => {
    try {
      // TODO: Figure out the correct typing for this lmfao
      const result: any = await signInWithGoogle()
      setUser(result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle: signInWithGoogleAuth, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
