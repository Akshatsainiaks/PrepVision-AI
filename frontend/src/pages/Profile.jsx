// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { API } from "../api/api";
// import React from "react";
// export default function Profile() {
//   const [data, setData] = useState(null);

//   useEffect(()=> {
//     (async ()=> {
//       try {
//         const res = await API.get("/credits/me");
//         setData(res.data);
//       } catch (err) { console.error(err); }
//     })();
//   },[]);

//   if (!data) return (<><Navbar /><div className="p-6">Loading...</div></>);

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold">Profile</h2>
//         <div className="mt-3 bg-white p-4 rounded shadow">
//           <div className="font-semibold">{data.user.name}</div>
//           <div className="text-sm">{data.user.email}</div>
//           <div className="mt-2 text-lg font-bold">{data.user.credits} credits</div>
//         </div>

//         <div className="mt-6">
//           <h3 className="font-semibold">Credit History</h3>
//           <div className="mt-2 space-y-2">
//             {data.logs.map(log => (
//               <div key={log._id} className="p-3 border rounded bg-white">
//                 <div className="text-sm">{log.source}</div>
//                 <div className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</div>
//                 <div className="font-semibold">{log.value} credits</div>
//                 {log.meta && <pre className="text-xs mt-1">{JSON.stringify(log.meta)}</pre>}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { API } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import React from "react";

export default function Profile() {
  const [data, setData] = useState(null);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/credits/me");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!data)
    return (
      <>
        <Navbar />
        <div className="p-6 text-white">Loading...</div>
      </>
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">

        {/* Page Title */}
        <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r 
           from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Profile
        </h2>

        {/* Profile Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 
            rounded-2xl p-6 shadow-[0_0_20px_rgba(120,64,255,0.2)]">

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r 
                from-purple-500 to-blue-500 flex items-center justify-center 
                text-3xl font-bold">
              {data.user.name.charAt(0)}
            </div>

            <div>
              <div className="text-xl font-semibold">{data.user.name}</div>
              <div className="text-gray-300 text-sm">{data.user.email}</div>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-gray-300 text-sm">Credits Available</div>
            <div className="text-3xl font-bold text-purple-400">
              {data.user.credits}
            </div>
          </div>

          {/* Profile Actions */}
          <div className="flex gap-4 mt-6">
            <Link
              to="/settings"
              className="px-4 py-2 rounded-lg bg-gradient-to-r 
                from-purple-500 to-blue-500 shadow hover:scale-105 transition"
            >
              Settings
            </Link>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r 
                from-red-500 to-pink-600 shadow hover:scale-105 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Credit History */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Credit History</h3>

          <div className="space-y-4">
            {data.logs.length === 0 && (
              <p className="text-gray-500">No transactions yet.</p>
            )}

            {data.logs.map((log) => (
              <div
                key={log._id}
                className="backdrop-blur-xl bg-white/10 border border-white/20 
                  p-4 rounded-xl shadow"
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{log.source}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="text-purple-400 text-lg font-bold">
                    {log.value} credits
                  </div>
                </div>

                {log.meta && (
                  <pre className="text-xs mt-2 bg-black/20 p-2 rounded">
                    {JSON.stringify(log.meta, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
