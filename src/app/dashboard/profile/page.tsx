"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);
  const [loading, setLoading] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = localStorage.getItem('user');

        if (userData) {
          const user = JSON.parse(userData);
          const userProfile: ProfileData = {
            name: user.name || user.fullName || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
          };
          setProfile(userProfile);
          setEditedProfile(userProfile);

          const userId = user.id || user._id;
          if (userId) {
            try {
              const response = await fetch(`http://localhost:8000/api/upload/profile-image/${userId}`);
              if (response.ok) {
                const imageData = await response.json();
                if (imageData.data && imageData.data.imageUrl) {
                  const fullImageUrl = `http://localhost:8000${imageData.data.imageUrl}`;
                  setProfilePhoto(fullImageUrl);
                  localStorage.setItem('profilePhoto', fullImageUrl);
                }
              }
            } catch (error) {
              console.error("Error fetching profile image:", error);
            }
          }
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (result && typeof result === 'string') {
          setProfilePhoto(result);
        }
      };
      reader.readAsDataURL(file);

      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          alert('User not logged in');
          return;
        }

        const user = JSON.parse(userData);
        const userId = user.id || user._id;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', userId);

        const response = await fetch('http://localhost:8000/api/upload/profile-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload photo');
        }

        const data = await response.json();
        console.log('Photo uploaded successfully:', data);

        if (data.data && data.data.imageUrl) {
          const fullImageUrl = `http://localhost:8000${data.data.imageUrl}`;
          setProfilePhoto(fullImageUrl);
          localStorage.setItem('profilePhoto', fullImageUrl);
        }

        alert('Photo uploaded successfully!');

      } catch (error) {
        console.error('Error uploading photo:', error);
        alert('Failed to upload photo to server');
      }
    }
  };

  const handleDeletePhoto = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('User not logged in');
        return;
      }

      const user = JSON.parse(userData);
      const userId = user.id || user._id;

      const response = await fetch(`http://localhost:8000/api/upload/profile-image/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete photo');
      }

      setProfilePhoto(null);
      localStorage.removeItem('profilePhoto');
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo from server');
    }
  };

  const handleSave = async () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = { ...user, ...editedProfile };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      setProfile(editedProfile);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-12 min-h-screen">
      <div className="w-full max-w-2xl px-4">
        <div className="bg-white rounded-xl p-8 border border-pink-100 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 border border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition"
              >
                ✏️ Edit Profile
              </button>
            )}
          </div>

          <div className="mb-6 flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-pink-200 bg-gray-100 flex items-center justify-center">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition cursor-pointer font-medium text-sm"
                >
                  📷 Upload Photo
                </label>
                {profilePhoto && (
                  <button
                    onClick={handleDeletePhoto}
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition font-medium text-sm"
                  >
                    🗑️ Delete Photo
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              ) : (
                <p className="text-gray-800 text-lg">{profile.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              ) : (
                <p className="text-gray-800 text-lg">{profile.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              ) : (
                <p className="text-gray-800 text-lg">{profile.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.address}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, address: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                />
              ) : (
                <p className="text-gray-800 text-lg">{profile.address}</p>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-6 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-semibold"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-6 border border-pink-300 text-pink-600 rounded-full hover:bg-pink-50 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}