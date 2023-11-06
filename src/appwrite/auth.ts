import { Account, Client, Databases, ID } from "appwrite";
import conf from "@/lib/conf";
import { TCreateAccount, TLogin } from "@/lib/types";

export class AuthService {
  client = new Client();
  account: Account;
  database: Databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
  }

  async createAccount({ email, password, name }: TCreateAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.logIn({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async logIn({ email, password }: TLogin) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  async testUserLogIn() {
    try {
      return await this.account.createEmailSession(
        "testuser@mail.com",
        "password"
      );
    } catch (error) {
      throw error;
    }
  }

  async currentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession("current");
    } catch (error) {
      throw error;
    }
  }

  async createProfile({ userId }: { userId: string }) {
    try {
      await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUserCollectionId,
        userId,
        { profile: null }
      );
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
