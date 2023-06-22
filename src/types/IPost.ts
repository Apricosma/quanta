export interface IUser {
  id: string;
  name: string | null | undefined;
  photoURL: string | null | undefined;
}

export interface IPost extends IUser {
  [x: string]: unknown;
  post: string;
  user: IUser;
  localTimeStamp: number;
  serverTimestamp: {
    seconds: number;
    nanoseconds: number;
  };
  imageUrl?: string | null;
}