export type TypeFilterType =
  | 'criminal'
  | 'domestic'
  | 'civil'
  | 'administration';

export type PrecedentType = TypeFilterType | 'unclassified';

export interface Tweet {
  id: string;
  name: string;
  content: string;
  uploadedAt: null | Date;
}

export interface TweetResponse extends Tweet {
  precedentContent: string[];
  type: PrecedentType;
}

export interface Precedent {
  id: string;
  name: string;
  content: string;
  type: PrecedentType;
}

export interface AppInfo {
  tweets: number;
  precedents: number;
}
