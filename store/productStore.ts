import { create } from "zustand";

// Define a type for the product data (you can expand this based on the actual product data structure)

interface ProductData {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

// Define the Zustand store state

interface ProductStore {
    product: ProductData | undefined;
    setProduct: (product: ProductData) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}



// Create the Zustand store

const productStore = create<ProductStore>((set) => ({
    product: undefined,
    setProduct: (product) => set({ product: product }),
    activeTab: 'all-products',
    setActiveTab: (tab) => set({ activeTab: tab }),

}));


export default productStore;
