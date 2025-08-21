import clientPromise from "../lib/mongoClient";
import 'dotenv/config'
(async () => {
    console.log(process.env.MONGODB_URI)
    console.log(process.env.NEXTAUTH_URL)
  const db=(await clientPromise).db('muniquiz')

  await db.collection("participate").createIndex(
    { expired_at: 1 },
    { expireAfterSeconds: 0 }
  );

  console.log("Indexes initialized");
  process.exit(0);
})();
