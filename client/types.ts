export type PrecedentType =
  | 'criminal'
  | 'domestic'
  | 'civil'
  | 'administration'
  | 'unclassified';

export interface Tweet {
  id: string;
  url: string;
  name: string;
  uploadedAt: null | Date;
  content: string;
  type: PrecedentType;
}

export interface AppInfo {
  tweets: number;
  precedents: number;
}
