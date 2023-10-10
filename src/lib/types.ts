export type TUser = {
  $id: string;
  accountId: string;
  name: string;
  email: string;
  profile: null | string;
  $createdAt: Date;
  $updatedAt: Date;
};

export type TCreateAccount = {
  email: string;
  password: string;
  name: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TCreateFolder = {
  name: string;
  userId: string;
  parentId: string | null;
};

export type TFolder = {
  $id: string;
  name: string;
  userId: string;
  parentId: string | null;
  $createdAt: Date;
  $updatedAt: Date;
};

export type TFolders = {
  total: number;
  documents: TFolder[];
};
