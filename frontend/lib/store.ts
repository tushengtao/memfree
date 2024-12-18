import { create } from 'zustand';
import { User } from '@/lib/types';
import { GPT_4o_MIMI } from '@/lib/model';
import { persist } from 'zustand/middleware';

interface ProfileState {
    profile: string;
    setProfile: (content: string) => void;
}

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: '',
            setProfile: (content: string) => set({ profile: content }),
        }),
        {
            name: 'profile-storage',
        },
    ),
);

type UIState = {
    isSearch: boolean;
    isShadcnUI: boolean;
    showMindMap: boolean;
    setIsSearch: (isSearch: boolean) => void;
    setIsShadcnUI: (isShadcnUI: boolean) => void;
    setShowMindMap: (showMindMap: boolean) => void;
};

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            isSearch: true,
            isShadcnUI: true,
            showMindMap: false,
            setIsSearch: (search: boolean) => set({ isSearch: search }),
            setIsShadcnUI: (shadcnUI: boolean) => set({ isShadcnUI: shadcnUI }),
            setShowMindMap: (showMindMap: boolean) => set({ showMindMap }),
        }),
        {
            name: 'UI-config',
        },
    ),
);

type UserState = {
    user: User | null;
    setUser: (user: User) => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
}));

type ConfigState = {
    model: string;
    source: string;
    language: string;
    colorScheme: 'light' | 'dark';
    setModel: (model: string) => void;
    setSource: (source: string) => void;
    initModel: () => string;
    initSource: () => string;
};

export const configStore = create<ConfigState>()((set) => ({
    model: GPT_4o_MIMI,
    source: 'all',
    language: 'en',
    colorScheme: 'light',
    setModel: (model: string) => {
        set({ model });
        localStorage.setItem('model', model);
    },
    setSource: (source: string) => {
        set({ source });
        localStorage.setItem('source', source);
    },
    initModel: () => {
        const model = localStorage.getItem('model');
        if (model) {
            set({ model });
        }
        return model || GPT_4o_MIMI;
    },
    initSource() {
        const source = localStorage.getItem('source');
        if (source) {
            set({ source });
        }
        return source || 'all';
    },
}));

export const useModelStore = () =>
    configStore((state) => ({
        model: state.model,
        setModel: state.setModel,
        initModel: state.initModel,
    }));

export const useSourceStore = () =>
    configStore((state) => ({
        source: state.source,
        setSource: state.setSource,
        initSource: state.initSource,
    }));
