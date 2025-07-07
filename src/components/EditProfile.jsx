import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uploadToCloudinary } from "../utils/Expenses";
import { updateProfile } from "firebase/auth";

const EditProfile = ({ onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpdate = async () => {
    try {
      setUploading(true);
      let photoURL = "";

      // 1. Upload to Cloudinary if a new file is selected
      if (file) {
        photoURL = await uploadToCloudinary(file);
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // 2. If the user doc exists, update it
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          name,
          ...(photoURL && { photoURL }),
        });
        await updateProfile(user, {
          displayName: name,
          ...(photoURL && { photoURL }),
        });
      } else {
        // 3. If not, create it
        await setDoc(userRef, {
          name,
          email: user.email,
          photoURL:
            photoURL || "/profile_image.png",
        });
      }

      onClose();
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#7e50e1] text-center">Edit Profile</h2>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-1 text-sm font-medium text-gray-700 ">
          Profile Photo
        </label>
        <input
          type="file"
          accept="image/*"
          className="w-full border px-3 py-2 rounded mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500 border-2 border-gray-300 px-4 py-2 rounded hover:bg-gray-100 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[#7e69ab] text-white px-4 py-2 rounded cursor-pointer"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
