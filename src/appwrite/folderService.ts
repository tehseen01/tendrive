import conf from "@/lib/conf";
import { TCreateFolder } from "@/lib/types";
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
        [Query.isNull("parentId"), Query.equal("userId", userId)]
      );

      return folders;
    } catch (error) {
      throw error;
    }
  }
}

const folderService = new FolderService();
export default folderService;
