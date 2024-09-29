import firebaseApp from "@/config/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const uploadFileToFirebaseAndGetUrl = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `media/${file.name}`);
    const uploadResponse = await uploadBytes(storageRef, file);
    const url = getDownloadURL(uploadResponse.ref);
    return url;
  } catch (error) {}
};
