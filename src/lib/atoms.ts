import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<any>(() => AsyncStorage);
export const hideValuesAtom = atomWithStorage<boolean>(
  "hideValues",
  false,
  storage
);
