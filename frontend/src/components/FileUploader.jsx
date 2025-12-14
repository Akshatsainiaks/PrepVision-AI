// src/components/FileUploader.jsx
import React, { useRef, useState } from "react";
import { API } from "../api/api";

export default function FileUploader({ onUploaded }) {
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  const pick = () => ref.current.click();

  const handle = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("file", f);
    try {
      const res = await API.post("/uploads", fd, { headers: { "Content-Type": "multipart/form-data" } });
      onUploaded(res.data);
    } catch (err) {
      console.error("upload err", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  return (
    <>
      <input ref={ref} type="file" className="hidden" onChange={handle} />
      <button onClick={pick} className="px-3 py-1 border rounded">
        {loading ? "Uploading..." : "Attach"}
      </button>
    </>
  );
}
