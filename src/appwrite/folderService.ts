import conf from "@/lib/conf";
import { TCreateFolder, TFolder } from "@/lib/types";
import { Client, Databases, ID, Query } from "appwrite";

class FolderService {
  client = new Client();
  database: Databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createNewFolder({ name, userId, parentId }: TCreateFolder) {
    try {
      const newFolder = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        ID.unique(),
        { name, userId, parentId }
      );

      return newFolder;
    } catch (error) {
      throw error;
    }
  }

  async getHomeFolders({ userId }: { userId: string }) {
    try {
      const folders = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        [
          Query.isNull("parentId"),
          Query.equal("userId", userId),
          Query.orderDesc("$updatedAt"),
          Query.notEqual("isDeleted", true),
        ]
      );

      return folders;
    } catch (error) {
      throw error;
    }
  }

  async getChildFolder({ parentId }: { parentId: string }) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        [Query.equal("parentId", parentId), Query.notEqual("isDeleted", true)]
      );
    } catch (error) {
      throw error;
    }
  }

  async renameFolder({ id, name }: { id: string; name: string }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        id,
        { name }
      );
    } catch (error) {
      throw error;
    }
  }

  async moveToBinFolder({ folderId }: { folderId: string }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        folderId,
        { isDeleted: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllBinFolders({ userId }: { userId: string }) {
    try {
      const binFolders = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        [Query.equal("isDeleted", true), Query.equal("userId", userId)]
      );

      return binFolders;
    } catch (error) {
      throw error;
    }
  }

  async restoreFolder({ folderId }: { folderId: string }) {
    try {
      const restoredFolder = await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        folderId,
        { isDeleted: false }
      );

      return restoredFolder;
    } catch (error) {
      throw error;
    }
  }

  async deleteFolderForever({ folderId }: { folderId: string }) {
    try {
      const deletedFolder = await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFolderCollectionId,
        folderId
      );

      return deletedFolder;
    } catch (error) {
      throw error;
    }
  }
}

const folderService = new FolderService();
export default folderService;
