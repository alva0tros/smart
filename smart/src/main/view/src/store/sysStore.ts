import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
    user_id: number;
    username: string;
    user_nm: string;
}

interface Menu {
    menu_id: number;
    menu_cd: string;
    menu_url: string;
    menu_icon: string;
}

interface Code {
    code_id: number;
    code: string;
    code_nm: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
    clearUser: () => void;
}

interface MenuState {
    menu: Menu | null;
    setMenu: (menu: Menu | null) => void;
    clearMenu: () => void;
}

interface CodeState {
    code: Code | null;
    setCode: (code: Code | null) => void;
    clearCode: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => {
                set({ user: null }), localStorage.removeItem("user-storage");
            },
        }),
        {
            name: "user-storage", // 로컬 스토리지에 저장될 키 이름
            storage: createJSONStorage(() => localStorage), // 사용할 스토리지 (localStorage 사용)
        }
    )
);

export const useMenuStore = create<MenuState>()((set) => ({
    menu: null,
    setMenu: (menu) => set({ menu }),
    clearMenu: () => set({ menu: null }),
}));

export const useCodeStore = create<CodeState>()((set) => ({
    code: null,
    setCode: (code) => set({ code }),
    clearCode: () => set({ code: null }),
}));
