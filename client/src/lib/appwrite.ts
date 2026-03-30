import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('https://sgp.cloud.appwrite.io/v1')
    .setProject('69ca87b1001c4b971aeb');

export const account = new Account(client);
export const databases = new Databases(client);
export { client };
