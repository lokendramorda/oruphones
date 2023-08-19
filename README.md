## Internship Assignment For ORU Phones
I developed the comprehensive Internship Assignment from Oruphones by utilizing the capabilities of Next.js and Tailwind as a sophisticated front-end client, seamlessly integrated with a dynamic Node.js backend using Typescript. The assignment's data persistence is fortified by the MongoDB, ensuring efficient and secure storage of vital information.

## Data Management
To safeguard user credentials, a encryption technique known as bcrypt is employed. User passwords are transformed into irreversible, hashed representations before being stored in the database.
The user signup process is designed with validation mechanisms using yup. Each field of the signup form is subject to rigorous scrutiny, ensuring that only valid and properly formatted data is accepted.
Innovatively, the architecture also addresses the storage of images within MongoDB. Images are encoded into the Base64 format before being stored as documents in the database. this method allows for easier synchronization between front-end and back-end systems.
Upstash, a cloud-based platform designed specifically for Redis hosting and management.Upstash offers a user-friendly and scalable platform that simplifies the setup, monitoring, and maintenance of the Redis cache.
When a user initiates changes to their profile information, such as updating their username, profile picture, or other details, the modified data is intelligently stored or updated in the Upstash cache memory layer. 


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

