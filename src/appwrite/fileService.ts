import conf from "@/lib/conf";
import { TCreateFile } from "@/lib/types";
import { Client, Databases, ID, Query } from "appwrite";

class FileService {
  client = new Client();
  database: Databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createFile({ fileId, userId, parentId, isDeleted, name }: TCreateFile) {
    try {
      const file = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteFileCollectionId,
        fileId,
        { userId, parentId, isDeleted, name }
      );

      return file;
    } catch (error) {
      throw error;
    }
  }

  async getFiles({ userId }: { userId: string }) {
    try {
      const files = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteFileCollectionId,
        [Query.equal("userId", userId)]
      );

      return files;
    } catch (error) {
      throw error;
    }
  }
}

const fileService = new FileService();

export default fileService;
