"use client";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import axiosInstance from "@/lib/api/axiosInstance";
import { API } from "@/lib/api/endpoint";

interface ProfileData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  profileImage: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    profileImage: "",
  });
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(API.AUTH.ME);
        const user = res.data?.data || res.data;
        const userProfile: ProfileData = {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          username: user.username || "",
          email: user.email || "",
          phone: user.phone || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "",
        };
        setProfile(userProfile);
        setEditedProfile(userProfile);
        if (user.profileImage) {
          setImagePreview(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profileImage}`
          );
        }
      } catch (err: any) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image (JPG, PNG, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const form = new FormData();
      form.append("firstName", editedProfile.firstName);
      form.append("lastName", editedProfile.lastName);
      form.append("email", editedProfile.email);
      form.append("phone", editedProfile.phone);
      form.append("bio", editedProfile.bio);
      if (selectedFile) form.append("image", selectedFile);

      await axiosInstance.put(API.PROFILE.UPDATE, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfile(editedProfile);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setSelectedFile(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    setSelectedFile(null);
    setError("");
    if (profile.profileImage) {
      setImagePreview(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${profile.profileImage}`
      );
    } else {
      setImagePreview("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400" />
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-12 min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl px-4 pb-12">
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

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {success && <p className="text-sm text-green-600 mb-4">{success}</p>}

          {/* Profile Image */}
          <div className="mb-6 flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-200 bg-gray-100 flex items-center justify-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-semibold text-pink-600">
                    {profile.firstName?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-medium text-sm"
                >
                  📷 Change Photo
                </button>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.firstName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                ) : (
                  <p className="text-gray-800">{profile.firstName || "—"}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.lastName}
                    onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                    className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                  />
                ) : (
                  <p className="text-gray-800">{profile.lastName || "—"}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <p className="text-gray-800">@{profile.username || "—"}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              ) : (
                <p className="text-gray-800">{profile.email || "—"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              ) : (
                <p className="text-gray-800">{profile.phone || "—"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
                />
              ) : (
                <p className="text-gray-800">{profile.bio || "—"}</p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 px-6 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition font-semibold disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
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