import { useEffect, useState, useContext, useRef } from "react";
import Navbar from "../components/Navbar";
import { API } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import React from "react";

export default function Profile() {
  const [data, setData] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [showAvatarPreview, setShowAvatarPreview] = useState(false);

  const fileInputRef = useRef(null);
  const avatarMenuRef = useRef(null);

  const { logout } = useContext(AuthContext);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await API.get("/credits/me");
        if (mounted) setData(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    })();

    return () => (mounted = false);
  }, []);

  /* ================= CLOSE AVATAR MENU ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(e.target)
      ) {
        setShowAvatarMenu(false);
      }
    };

    if (showAvatarMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [showAvatarMenu]);

  if (!data || !data.user) return <ProfileSkeleton />;

  /* ================= AVATAR UPLOAD ================= */
  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);
      const res = await API.post("/users/avatar", formData);
      setData((prev) => ({
        ...prev,
        user: { ...prev.user, avatar: res.data.avatar },
      }));
    } catch {
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8 space-y-12">
        {/* ================= HEADER ================= */}
        <div>
          <h2 className="text-4xl font-extrabold text-[var(--accent)]">
            Profile
          </h2>
          <p className="text-secondary mt-1">
            Manage your personal information and account preferences
          </p>
        </div>

        {/* ================= PROFILE OVERVIEW ================= */}
        <div className="card rounded-3xl p-8">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative" ref={avatarMenuRef}>
              <div
                onClick={() => setShowAvatarMenu((p) => !p)}
                className="w-20 h-20 rounded-full overflow-hidden
                bg-gradient-to-r from-purple-500 to-blue-500
                flex items-center justify-center
                text-4xl font-bold cursor-pointer"
              >
                {data.user.avatar ? (
                  <img
                    src={data.user.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  data.user.name?.charAt(0)
                )}
              </div>

              {showAvatarMenu && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-40
                  rounded-xl shadow-lg z-50"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <button
                    className="menu-btn"
                    onClick={() => {
                      setShowAvatarPreview(true);
                      setShowAvatarMenu(false);
                    }}
                  >
                    👁 View avatar
                  </button>
                  <button
                    className="menu-btn"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowAvatarMenu(false);
                    }}
                  >
                    ⬆ Change avatar
                  </button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </div>

            {/* User info */}
            <div>
              <h3 className="text-2xl font-semibold">{data.user.name}</h3>
              <p className="text-secondary">{data.user.email}</p>
              {uploading && (
                <p className="text-xs text-[var(--accent)] mt-1">
                  Uploading avatar…
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Account Settings"
            desc="Manage password and security"
            link="/settings"
          />
          <ActionCard
            title="Credit History"
            desc="View usage and transactions"
            link="/credit-history"
          />
          <ActionCard
            title="Edit Profile"
            desc="Update name & personal details"
            link="/settings"
          />
        </div>

        {/* ================= ACCOUNT INFO ================= */}
        <div className="card rounded-3xl p-6">
          <h3 className="text-xl font-semibold mb-4">
            Account Information
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <p>
              <span className="text-secondary">Role:</span>{" "}
              <strong>User</strong>
            </p>
            <p>
              <span className="text-secondary">Email notifications:</span>{" "}
              Enabled
            </p>
          </div>
        </div>

        {/* ================= SECURITY ================= */}
        <div className="border border-red-500/30 bg-red-500/10 rounded-3xl p-6">
          <h3 className="text-red-400 font-semibold mb-3">
            Security
          </h3>
          <button
            onClick={logout}
            className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= AVATAR PREVIEW ================= */}
      {showAvatarPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative animate-fadeIn">
            <img
              src={data.user.avatar}
              alt="avatar preview"
              className="max-w-sm rounded-2xl"
            />
            <button
              onClick={() => setShowAvatarPreview(false)}
              className="absolute -top-3 -right-3 bg-red-600 rounded-full px-3 py-1 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= SUB COMPONENT ================= */
function ActionCard({ title, desc, link }) {
  return (
    <Link
      to={link}
      className="card rounded-2xl p-6 hover:border-[var(--accent)] transition"
    >
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-secondary">{desc}</p>
    </Link>
  );
}
