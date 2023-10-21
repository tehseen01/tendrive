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

export type TCreateFile = {
  name: string;
  fileId: string;
  userId: string;
  parentId: string | null;
  isDeleted: Boolean;
};

export type TFolder = {
  $id: string;
  name: string;
  userId: string;
  parentId: string | null;
  $databaseId: string;
  $collectionId: string;
  $createdAt: Date;
  $updatedAt: Date;
};

export type TFolders = {
  total: number;
  documents: TFolder[];
};

export type TFile = {
  $id: string;
  name: string;
  userId: string;
  parentId: string | null;
  $databaseId: string;
  $collectionId: string;
  $createdAt: Date;
  $updatedAt: Date;
  isDeleted: boolean;
};

export type TFiles = {
  total: number;
  documents: TFile[];
};

export type TFileInfoType = {
  $id: string;
  name: string;
  mimeType: string;
  sizeOriginal: number;
  $bucketId: string;
  $createdAt: Date;
  $updatedAt: Date;
};

export type BinType = "FOLDERS" | "NOTES" | "DOCS";
