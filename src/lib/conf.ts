const conf = {
  appwriteURL: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
  appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
  appwriteBucketId: String(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID),
  appwriteUserCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID
  ),
  appwriteFolderCollectionId: String(
    process.env.NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID
  ),
};

export default conf;
