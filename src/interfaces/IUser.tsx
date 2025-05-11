import type { ReactNode } from "react";

export interface IComment {
  id: string;
  comment: string;
  rating: number;
}

export interface UserContextValue {
  favoriteIds: string[];
  setFavIds: (id: string[]) => void;
  watchedIds: string[];
  setWatchedIds: (id: string[]) => void;
  comments: IComment[];
  setComments: (comment: IComment[]) => void;
}

export interface UserProviderProps {
  children: ReactNode;
}
