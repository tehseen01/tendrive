# TenDrive - A Google Drive-like web app 🚀

TenDrive is a Google Drive-like web app where users can create folders, upload files, preview, rename, move to bin, search file or folder, share file or folder, and download file.

## Demo

You can try out the live demo of the app here: [ten-drive](https://ten-drive.vercel.app)

## Features

- User authentication using Appwrite
- Folder creation and navigation
- File upload and preview
- File and folder rename and delete
- File and folder search and share
- File download
- Responsive design

## Technologies

The app is built using the following technologies:

- [Next.js](https://nextjs.org/) - A React framework for building hybrid applications
- [TypeScript](https://www.typescriptlang.org/) - A superset of JavaScript that adds static types
- [ui.shadcn.com](https://ui.shadcn.com/) - A UI component library for React
- [Redux Toolkit](https://redux-toolkit.js.org/) - A toolkit for managing application state
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Appwrite](https://appwrite.io/) - An open-source, self-hosted backend as a service

## Installation

To run the app locally, you need to have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/installation) installed on your machine.

1. Clone this repository:

```bash
git clone https://github.com/tehseen01/tendrive.git
```

2. Install the dependencies:

```bash
cd tendrive
pnpm install
```

3. Create a `.env.local` file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_APPWRITE_URL= # Your Appwrite endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID= # Your Appwrite project ID
NEXT_PUBLIC_APPWRITE_DATABASE_ID= # Your Appwrite database ID
NEXT_PUBLIC_APPWRITE_FOLDER_COLLECTION_ID= # Your Appwrite collection ID for folders
NEXT_PUBLIC_APPWRITE_BUCKET_ID= # Your Appwrite bucket ID for storing files
NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID= # Your Appwrite collection ID for users
NEXT_PUBLIC_APPWRITE_FILE_COLLECTION_ID= # Your Appwrite collection ID for files
NEXT_PUBLIC_APPWRITE_SHARE_COLLECTION_ID= # Your Appwrite collection ID for shares 
```

4. Start the development server:

```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Acknowledgements

I would like to thank [Hitesh Choudhary](https://www.youtube.com/channel/UCXgGY0wkgOzynnHvSEVmE3A) for his amazing tutorials on Appwrite. He helped me to learn how to use Appwrite and integrate it with Next.js.

## Feedback
We'd love to hear your feedback and suggestions on how we can enhance TenDrive. Please feel free to reach out with any questions or comments.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---