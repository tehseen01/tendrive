import conf from "@/lib/conf";
import { TCreateDoc } from "@/lib/types";
import { Client, Databases, Query } from "appwrite";

type TGetDocs = { userId: string; collectionId: string };
type TGetChildDocs = { parentId: string; userId: string; collectionId: string };
type TRenameDoc = { docId: string; name: string; collectionId: string };
type TDocAndCollectionId = { docId: string; collectionId: string };

class Services {
  client = new Client();
  database: Databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
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
}

const service = new Services();

export default service;
