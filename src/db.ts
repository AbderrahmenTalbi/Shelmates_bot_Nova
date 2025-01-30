import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";


let DB: any = null;




async function initDB() {
    if (DB != null) return DB;
    console.log("[INFO] Connecting to DB");

    mongoose.connect(process.env.URI as string, { dbName: "ShellMatesBot" }).catch((error) => {
        console.error('[ERROR]:', error);
    }).then(() => {
        console.log("[INFO] Connected to DB");
    });



    return DB;

}





export default initDB;