import conf from "@/lib/conf";
import { Client, ID, Storage } from "appwrite";

class StorageService {
  client = new Client();
  storage: Storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile({ file }: { file: any }) {
    try {
      const uploadedFile = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      return uploadedFile;
    } catch (error) {
      throw error;
    }
  }

  async getFileInfo({ fileId }: { fileId: string }) {
    try {
      const fileInfo = await this.storage.getFile(
        conf.appwriteBucketId,
        fileId
      );
      return fileInfo;
    } catch (error) {
      throw error;
    }
  }

  getFilePreview({ fileId }: { fileId: string }) {
    const preview = this.storage.getFilePreview(conf.appwriteBucketId, fileId);
    return preview;
  }
}

const storageService = new StorageService();

export default storageService;
