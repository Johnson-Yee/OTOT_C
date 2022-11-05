
import {
    createUser,
    checkIfUserExists,
    findUser,
    deleteUser,
    updateUser
} from "./repository.js";

export async function ormCreateUser(username, password, role) {
    try {
        const newUser = await createUser({ username, password, role });
        newUser.save();
        return true;
    } catch (err) {
        console.log("<USER-ORM> ERROR: Could not create new user");
        return { err };
    }
}

export const ormFindUserByUsername = async (username) => {
    try {
        const desiredUser = await findUser({ username });
        return desiredUser;
    } catch (err) {
        console.log("<USER-ORM> ERROR: Could not find user in database ");
        return { err };
    }
};

export const ormUserExists = async (username) => {
    try {
        const userFound = await checkIfUserExists({ username });
        return userFound;
    } catch (err) {
        console.log("<USER-ORM> ERROR: User Existence Check Failure");
        return { err };
    }
};


export const ormDeleteUser = async (username) => {
    try {
        return await deleteUser({ username });
    } catch (err) {
        console.log("<USER-ORM> ERROR: User Deletion Failure");
        return { err };
    }
};

export const ormUpdateUser = async (id, params) => {
    try {
        return await updateUser(id, params);
    } catch (err) {
        console.log("<USER-ORM> ERROR: User Update Failure");
        return { err };
    }
};