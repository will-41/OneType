import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  score: number;
  streak: number;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  accuracy: number;
  speed: number;
}

interface AppState {
  user: User | null;
  lessons: Lesson[];
  currentLesson: Lesson | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LESSONS'; payload: Lesson[] }
  | { type: 'SET_CURRENT_LESSON'; payload: Lesson | null }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_LESSON_PROGRESS'; payload: { lessonId: string; accuracy: number; speed: number } }
  | { type: 'UPDATE_USER_STATS'; payload: { score: number; level: number; streak: number } }
  | { type: 'LOGOUT' };

const initialState: AppState = {
  user: null,
  lessons: [],
  currentLesson: null,
  isAuthenticated: false,
  theme: 'light',
  isLoading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LESSONS':
      return { ...state, lessons: action.payload };
    case 'SET_CURRENT_LESSON':
      return { ...state, currentLesson: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_LESSON_PROGRESS':
      return {
        ...state,
        lessons: state.lessons.map(lesson =>
          lesson.id === action.payload.lessonId
            ? {
                ...lesson,
                completed: true,
                accuracy: action.payload.accuracy,
                speed: action.payload.speed,
              }
            : lesson
        ),
      };
    case 'UPDATE_USER_STATS':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          score: action.payload.score,
          level: action.payload.level,
          streak: action.payload.streak,
        } : null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        currentLesson: null,
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function useAppState() {
  const { state } = useAppContext();
  return state;
}

export function useAppDispatch() {
  const { dispatch } = useAppContext();
  return dispatch;
}