import { create } from 'zustand';
import { pb } from "../Auth/pocket";

// Store types interface
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  verified: boolean;
  created: string;
  updated: string;
}

interface AuthState {
  user: User | null;
  verify: () => void;
  login: (username: string, password: string) => Promise<{ success: boolean, error: string | null }>;
  logout: () => void;
  signUp: (
    email: string,
    username: string,
    password: string,
    passwordConfirm: string
  ) => Promise<{ success: boolean, error: string | null }>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,

  verify: () => {
    try {
      const storedAuth = localStorage.getItem("pocketbase_auth");
      if (storedAuth) {
        const auth = JSON.parse(storedAuth);
        if (auth?.model?.username) {
          set({
            user: {
              id: auth.model.id,
              username: auth.model.username,
              email: auth.model.email,
              avatar: auth.model.avatar,
              verified: auth.model.verified,
              created: auth.model.created,
              updated: auth.model.updated,
            }
          });
        } else {
          set({ user: null });
        }
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      set({ user: null });
    }
  },

  login: async (username, password) => {
    try {
      const authData = await pb.collection("users").authWithPassword(username, password);
      if (authData.token) {
        set({
          user: {
            id: authData.record.id,
            username: authData.record.username,
            email: authData.record.email,
            avatar: authData.record.avatar,
            verified: authData.record.verified,
            created: authData.record.created,
            updated: authData.record.updated,
          }
        });
        return { success: true, error: null };
      }
      return { success: false, error: "Invalid credentials." };
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err.response?.data?.message || "Email or password is incorrect.";
      return { success: false, error: errorMessage };
    }
  },

  logout: () => {
    try {
      pb.authStore.clear();
      localStorage.removeItem("jwt_token"); // Clear token on logout
      set({ user: null });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  signUp: async (email, username, password, passwordConfirm) => {
    try {
      const newUser = await pb.collection("users").create({ email, username, password, passwordConfirm });
      if (newUser.id) {
        return { success: true, error: null };
      }
      return { success: false, error: "Registration failed." };
    } catch (err) {
      console.error("Sign-up error:", err);
      const errorMessage = err.response?.data?.message || "Registration failed.";
      return { success: false, error: errorMessage };
    }
  }
}));


const useNotifications = create((set) => ({
  notifications: [],

  addNotification: (id) => set((state) => ({
    notifications: [...state.notifications, id]
  })),

  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(itm => itm !== id)
  }))
}));









export default useAuthStore; useNotifications;
