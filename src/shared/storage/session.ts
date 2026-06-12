import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "hmp_session";

export interface SessionData {
  user: any;
  role: string;
}

export const saveSession = async (session: SessionData) => {
  try {
    await AsyncStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session)
    );
  } catch (error) {
    console.error("Failed to save session:", error);
  }
};

export const getSession = async (): Promise<SessionData | null> => {
  try {
    const session = await AsyncStorage.getItem(SESSION_KEY);

    if (!session) {
      return null;
    }

    return JSON.parse(session);
  } catch (error) {
    console.error("Failed to load session:", error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Failed to clear session:", error);
  }
};