export type TUser = {
  $id: string;
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

export type TCreateDoc = {
  docId: string;
  name: string;
  userId: string;
  parentId: string | null;
  collectionId: string;
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

export type TShareDocs = {
  total: number;
  documents: TShareDoc[];
};

export type TShareDoc = {
  $id: string;
  shareWithId: string;
  accessType: string;
  $databaseId: string;
  $collectionId: string;
  files: TFile | null;
  folders: TFolder | null;
  $createdAt: Date;
  $updatedAt: Date;
};
