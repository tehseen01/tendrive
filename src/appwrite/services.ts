import conf from "@/lib/conf";
import { TCreateDoc } from "@/lib/types";
import { Client, Databases, ID, Query } from "appwrite";

type TGetDocs = { userId: string; collectionId: string };
type TGetChildDocs = { parentId: string; userId: string; collectionId: string };
type TRenameDoc = { docId: string; name: string; collectionId: string };
type TDocAndCollectionId = { docId: string; collectionId: string };
type TSaveUser = { userId: string; name: string; email: string };
type CreateShareDoc = { docId: string; shareWithId: string };

class Services {
  client = new Client();
  database: Databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async saveUserInDatabase({ userId, name, email }: TSaveUser) {
    try {
      const checkUser = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        [Query.equal("email", email)]
      );

      if (checkUser.total === 0) {
        const user = await this.database.createDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUserCollectionId,
          userId,
          { name, email }
        );

        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  async searchUser(query: string) {
    try {
      const user = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        [Query.search("email", query)]
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createDoc({ userId, collectionId, docId, name, parentId }: TCreateDoc) {
    try {
      const doc = await this.database.createDocument(
        conf.appwriteDatabaseId,
        collectionId,
        docId,
        { name, userId, parentId }
      );

      return doc;
    } catch (error) {
      throw error;
    }
  }

  async getDocs({ userId, collectionId }: TGetDocs) {
    try {
      const docs = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        collectionId,
        [
          Query.isNull("parentId"),
          Query.equal("userId", userId),
          Query.orderDesc("$updatedAt"),
          Query.notEqual("isDeleted", true),
        ]
      );

      return docs;
    } catch (error) {
      throw error;
    }
  }

  async getChildDocs({ parentId, userId, collectionId }: TGetChildDocs) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        collectionId,
        [
          Query.equal("parentId", parentId),
          Query.notEqual("isDeleted", true),
          Query.equal("userId", userId),
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  async renameDoc({ docId, name, collectionId }: TRenameDoc) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        collectionId,
        docId,
        { name }
      );
    } catch (error) {
      throw error;
    }
  }

  async moveToBinDoc({ docId, collectionId }: TDocAndCollectionId) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        collectionId,
        docId,
        { isDeleted: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async restoreDoc({ docId, collectionId }: TDocAndCollectionId) {
    try {
      const restoredDoc = await this.database.updateDocument(
        conf.appwriteDatabaseId,
        collectionId,
        docId,
        { isDeleted: false }
      );

      return restoredDoc;
    } catch (error) {
      throw error;
    }
  }

  async getAllBinDocs({ userId, collectionId }: TGetDocs) {
    try {
      const binDocs = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        collectionId,
        [Query.equal("isDeleted", true), Query.equal("userId", userId)]
      );

      return binDocs;
    } catch (error) {
      throw error;
    }
  }

  async deleteDocForever({ docId, collectionId }: TDocAndCollectionId) {
    try {
      const deletedDoc = await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        collectionId,
        docId
      );

      return deletedDoc;
    } catch (error) {
      throw error;
    }
  }

  async createShareDoc({ docId, shareWithId }: CreateShareDoc) {
    try {
      const share = await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteShareCollectionId,
        `${docId}-${shareWithId.slice(0, 15)}`,
        { shareWithId, folders: docId, files: docId }
      );

      return share;
    } catch (error) {
      throw error;
    }
  }

  async getShareDocs(userId: string) {
    try {
      const docs = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteShareCollectionId,
        [Query.equal("shareWithId", userId)]
      );

      return docs;
    } catch (error) {
      throw error;
    }
  }

  async getSharedFolderOrFile(docId: string, collectionId: string) {
    try {
      const folderOrFile = await this.database.getDocument(
        conf.appwriteDatabaseId,
        collectionId,
        docId
      );
      return folderOrFile;
    } catch (error) {
      throw error;
    }
  }

  async deleteShareDoc({ userId, docId }: { userId: string; docId: string }) {
    try {
      const getDoc = await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteShareCollectionId,
        `${docId}-${userId.slice(0, 15)}`
      );

      return getDoc;
    } catch (error) {
      throw error;
    }
  }
}

const service = new Services();

export default service;
