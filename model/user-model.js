import mongoose from "mongoose";
var Schema = mongoose.Schema;
let UserModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"],
    },
});

export async function checkUserExists(params) {
    return UserModel.exists({ username: `${params.username}` });
}

export default mongoose.model("UserModel_C", UserModelSchema);
