import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define a type for the user data (you can expand this based on the actual user data structure)
interface UserData {
    id: string;
    name: string;
    email: string;
    type: string;
    contactNumber: string;
    address: string;
}

// Define a type for the Zustand store state
interface UserStore {
    userData: UserData | null | undefined; 
    setUserData: (userData: UserData) => void; 
    clearUserData: () => void; 
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userData: null, 

            // Action to set user data
            setUserData: (userData) => set({ userData }),

            // Action to clear user data
            clearUserData: () => set({ userData: null }),
        }),
        {
            name: "user-data-admin", // Key in localStorage
            partialize: (state) => ({ userData: state.userData }), // Persist only userData
        }
    )
);

export default useUserStore;
