// stores/buyer-store.ts
import { create } from 'zustand';

interface BuyerStore {
  orgName: string;
  orgAvatar: string;
  comName: string;
  userName: string;
  walletBalance: number;
  gbAvailable: string;
  setWalletBalance: (balance: number) => void;
  addToBalance: (amount: number) => void;
  setGbAvailable: (gb: string) => void;
}

export const useBuyerStore = create<BuyerStore>((set) => ({
  orgName: 'Browza',
  orgAvatar: '/avatars/user.png',
  comName: 'TechCorp Solutions',
  userName: 'Rahul Sharma',
  walletBalance: 2500,
  gbAvailable: '178',
  setWalletBalance: (balance) => set({ walletBalance: balance }),
  addToBalance: (amount) => set((state) => ({ 
    walletBalance: state.walletBalance + amount 
  })),
  setGbAvailable: (gb) => set({ gbAvailable: gb }),
}));
