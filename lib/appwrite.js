import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
} from 'react-native-appwrite'

export const appWriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.bech.aora',
    projectId: '6628c6910ff3f3eebc0d',
    databaseId: '6628c889997210e711d7',
    userCollectionId: '6628c8afacfb73e111e3',
    videoCollectionId: '6628c8d6247168df61dc',
    storageId: '6628ca2b84fa04d12a95',
}

// Init  react-native SDK
const client = new Client()

client
    .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appWriteConfig.projectId) // Your project ID
    .setPlatform(appWriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)
        const newUser = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            { accountId: newAccount.$id, email, avatar: avatarUrl, username }
        )
        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    console.log(email, password)
    try {
        const session = await account.createEmailSession(email, password)

        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error
        const getCurrentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!getCurrentUser) throw Error

        return getCurrentUser.documents[0]
    } catch (error) {
        throw error
    }
}
