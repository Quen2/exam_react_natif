import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '@/type/user/userType';
import { userData } from '@/mock/user/fakeData';

const USERS_KEY = 'users';

async function readUsers(): Promise<UserType[]> {
    const stored = await AsyncStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(userData));
    return userData;
}

async function saveUsers(users: UserType[]): Promise<void> {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function getAllUsers(): Promise<UserType[]> {
    return readUsers();
}

export async function createUser(
    username: string,
    email: string,
    password: string
): Promise<UserType> {
    const users = await readUsers();

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('EMAIL_TAKEN');
    }

    const newUser: UserType = { username, email, password, role: 'user' };
    await saveUsers([...users, newUser]);
    return newUser;
}

export async function getUser(email: string, password: string): Promise<UserType | undefined> {
    const users = await readUsers();
    return users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
}

export async function updateStoredUser(email: string, changes: Partial<UserType>): Promise<void> {
    const users = await readUsers();
    await saveUsers(users.map((user) => (user.email === email ? {...user, ...changes} : user)));
}
