import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward, FiLoader, FiArrowLeft, FiTrendingUp, FiTrendingDown,
  FiCheckCircle, FiAlertCircle, FiZap, FiRepeat, FiBarChart2,
} from "react-icons/fi";

const scoreColor  = (s) => s >= 8 ? "#10b981" : s >= 5 ? "#f59e0b" : "#f43f5e";
const scoreLabel  = (s) => s >= 8 ? "Excellent" : s >= 6 ? "Good" : s >= 4 ? "Average" : "Needs Work";
const scoreBg     = (s) => s >= 8 ? "rgba(16,185,129,0.1)" : s >= 5 ? "rgba(245,158,11,0.1)" : "rgba(244,63,94,0.1)";
const scoreBorder = (s) => s >= 8 ? "rgba(16,185,129,0.25)" : s >= 5 ? "rgba(245,158,11,0.25)" : "rgba(244,63,94,0.25)";

const diffStyle = {
  Easy:   { color: "#10b981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.2)" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)" },
  Hard:   { color: "#f43f5e", bg: "rgba(244,63,94,0.1)",   border: "rgba(244,63,94,0.2)"  },
};

export default function LiveInterviewReport() {
  const { sessionId } = useParams();
  const navigate      = useNavigate();
  const location      = useLocation();

  const [summary, setSummary]     = useState(null);
  const [session, setSession]     = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [activeQ, setActiveQ]     = useState(null);

  // violation passed via nav state
  const violation = location.state?.violation || null;

  useEffect(() => {
    if (!sessionId) return navigate("/mock");

    // If came from violation screen — summary already generated (finish was called)
    // If came normally — fetch session to build report
    const summaryFromState = location.state?.summary;
    if (summaryFromState) {
      setSummary(summaryFromState);
      setSession({
        role: location.state?.role,
        topic: location.state?.topic,
        difficulty: location.state?.difficulty,
      });
      setLoading(false);
      return;
    }

    // Fetch from session API
    API.get(`/live-interview/session/${sessionId}`)
      .then(res => {
        const s = res.data;
        setSession(s);
        // Build summary from session data
        const answered = s.questions || [];
        const avg = answered.length
          ? Math.round((answered.reduce((t, q) => t + (q.aiScore || 0), 0) / answered.length) * 10) / 10
          : 0;
        setSummary({
          avgScore:        avg,
          totalQuestions:  answered.length,
          overallFeedback: s.overallFeedback || "",
          hintsUsed:       s.hintsUsed || 0,
          questions:       answered,
        });
        setLoading(false);
      })
      .catch(() => {
        // Try calling finish to generate report
        API.post("/live-interview/finish", { sessionId })
          .then(res => {
            setSummary(res.data.summary);
            setLoading(false);
          })
          .catch(() => { setError("Could not load report."); setLoading(false); });
      });
  }, [sessionId]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
         style={{ backgroundColor: "var(--bg-primary)" }}>
      <FiLoader className="w-10 h-10 animate-spin" style={{ color: "var(--accent)" }} />
      <p className="font-bold text-sm" style={{ color: "var(--text-secondary)" }}>Generating your report...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="text-center">
        <FiAlertCircle size={40} className="mx-auto mb-4" style={{ color: "#f43f5e" }} />
        <p className="font-black mb-4" style={{ color: "var(--text-primary)" }}>{error}</p>
        <button onClick={() => navigate("/mock")} className="px-6 py-3 rounded-2xl text-white font-black" style={{ backgroundColor: "var(--accent)" }}>
          Back to Mock Interview
        </button>
      </div>
    </div>
  );

  const avg       = summary?.avgScore ?? 0;
  const questions = summary?.questions ?? [];
  const passed    = avg >= 6;

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

      {/* Header */}
      <div className="sticky top-0 z-40 border-b px-6 py-3 flex items-center justify-between"
           style={{ backgroundColor: "var(--bg-primary)", borderColor: "var(--border-color)" }}>
        <button onClick={() => navigate("/mock")}
          className="flex items-center gap-2 font-bold text-sm hover:opacity-70 transition-opacity"
          style={{ color: "var(--text-secondary)" }}>
          <FiArrowLeft size={16} /> Mock Interview
        </button>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--accent)" }}>
          Interview Report
        </span>
        <button onClick={() => navigate("/history")}
          className="text-xs font-black px-3 py-1.5 rounded-xl border"
          style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
          History
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8 space-y-6">

        {/* ── VIOLATION BANNER ── */}
        <AnimatePresence>
          {violation && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border" style={{ backgroundColor: "rgba(244,63,94,0.06)", borderColor: "rgba(244,63,94,0.35)" }}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-black text-sm mb-1" style={{ color: "#f43f5e" }}>Interview Integrity Violation</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {violation === "camera_off" && "Camera was turned off during the interview."}
                    {violation === "mic_off"    && "Microphone was turned off during the interview."}
                    {violation === "tab_switch" && "Tab was switched away during the interview."}
                    {" "}This attempt has been flagged and terminated early. All devices must remain active throughout.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SCORE CARD ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="card p-8 rounded-[2.5rem] text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center text-[20rem] font-black leading-none pointer-events-none select-none"
               style={{ color: scoreColor(avg) }}>
            {Math.round(avg)}
          </div>
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
                 style={{ backgroundColor: scoreBg(avg), border: `2px solid ${scoreBorder(avg)}` }}>
              <FiAward size={36} style={{ color: scoreColor(avg) }} />
            </div>
            <h1 className="text-3xl font-black mb-1" style={{ color: "var(--text-primary)" }}>
              {violation ? "Terminated Interview" : "Interview Complete"}
            </h1>
            {session && (
              <p className="text-sm font-medium mb-6" style={{ color: "var(--text-secondary)" }}>
                {session.role} · {session.topic} · {session.difficulty}
              </p>
            )}
            {/* Score */}
            <div className="text-8xl font-black tracking-tighter mb-1" style={{ color: scoreColor(avg) }}>
              {avg}<span className="text-3xl opacity-40">/10</span>
            </div>
            <p className="font-black text-lg mb-1" style={{ color: scoreColor(avg) }}>{scoreLabel(avg)}</p>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              {questions.length} question{questions.length !== 1 ? "s" : ""} answered · {summary?.hintsUsed ?? 0} hints used
            </p>
            {/* Progress bar */}
            <div className="h-3 rounded-full max-w-xs mx-auto mb-6" style={{ backgroundColor: "var(--border-color)" }}>
              <motion.div className="h-full rounded-full" initial={{ width: 0 }}
                animate={{ width: `${avg * 10}%` }} transition={{ duration: 1, delay: 0.3 }}
                style={{ backgroundColor: scoreColor(avg) }} />
            </div>
            {/* Pass/Fail badge */}
            {!violation && (
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-black text-sm"
                   style={{ backgroundColor: passed ? "rgba(16,185,129,0.1)" : "rgba(244,63,94,0.1)", color: passed ? "#10b981" : "#f43f5e", border: `1px solid ${passed ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.3)"}` }}>
                {passed ? <FiCheckCircle size={14} /> : <FiAlertCircle size={14} />}
                {passed ? "Round Passed" : "Needs Improvement"}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3">
          {[
            { label: "Avg Score",  value: `${avg}/10`,             icon: FiBarChart2,   color: scoreColor(avg) },
            { label: "Answered",   value: `${questions.length}Q`,  icon: FiCheckCircle, color: "var(--accent)" },
            { label: "Hints Used", value: summary?.hintsUsed ?? 0, icon: FiZap,         color: "#f59e0b" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-4 rounded-2xl text-center">
              <Icon size={18} className="mx-auto mb-2" style={{ color }} />
              <p className="text-xl font-black" style={{ color }}>{value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "var(--text-secondary)" }}>{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── OVERALL FEEDBACK ── */}
        {summary?.overallFeedback && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="card p-6 rounded-[2rem] border-l-4" style={{ borderLeftColor: "var(--accent)" }}>
            <div className="flex items-center gap-2 mb-3">
              <FiTrendingUp size={15} style={{ color: "var(--accent)" }} />
              <span className="font-black text-sm uppercase tracking-widest" style={{ color: "var(--accent)" }}>
                Alex's Overall Assessment
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>
              {summary.overallFeedback}
            </p>
          </motion.div>
        )}

        {/* ── QUESTION BREAKDOWN ── */}
        {questions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-black text-base mb-3 px-1" style={{ color: "var(--text-primary)" }}>
              Question Breakdown
            </h2>
            <div className="space-y-3">
              {questions.map((q, i) => {
                const s   = q.aiScore ?? 0;
                const ds  = diffStyle[q.difficulty] || diffStyle.Medium;
                const open = activeQ === i;
                return (
                  <motion.div key={i} layout
                    className="card rounded-2xl overflow-hidden border cursor-pointer"
                    style={{ borderColor: open ? `${scoreColor(s)}40` : "var(--border-color)" }}
                    onClick={() => setActiveQ(open ? null : i)}>
                    {/* Row */}
                    <div className="p-4 flex items-center gap-3">
                      {/* Score badge */}
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                           style={{ backgroundColor: scoreBg(s), color: scoreColor(s) }}>
                        {s}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--accent)" }}>Q{i + 1}</span>
                          {q.difficulty && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded border uppercase"
                                  style={{ backgroundColor: ds.bg, borderColor: ds.border, color: ds.color }}>{q.difficulty}</span>
                          )}
                        </div>
                        <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>{q.question}</p>
                      </div>
                      {/* Score bar */}
                      <div className="w-16 shrink-0">
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: "var(--border-color)" }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${s * 10}%`, backgroundColor: scoreColor(s) }} />
                        </div>
                        <p className="text-[10px] font-black text-right mt-0.5" style={{ color: scoreColor(s) }}>{scoreLabel(s)}</p>
                      </div>
                    </div>
                    {/* Expanded */}
                    <AnimatePresence>
                      {open && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                          className="border-t px-4 pb-4 pt-3 space-y-3" style={{ borderColor: "var(--border-color)" }}>
                          {/* Your answer */}
                          {q.answer && (
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>Your Answer</p>
                              <p className="text-sm leading-relaxed p-3 rounded-xl" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
                                {q.answer}
                              </p>
                            </div>
                          )}
                          {/* Feedback */}
                          {q.aiFeedback && (
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: "var(--text-secondary)" }}>AI Feedback</p>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--text-primary)" }}>{q.aiFeedback}</p>
                            </div>
                          )}
                          {/* Strength + Improve */}
                          <div className="grid grid-cols-2 gap-2">
                            {q.aiStrengths && (
                              <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}>
                                <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">✓ Strength</p>
                                <p className="text-xs" style={{ color: "var(--text-primary)" }}>{q.aiStrengths}</p>
                              </div>
                            )}
                            {q.aiImprovement && (
                              <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}>
                                <p className="text-[9px] font-black uppercase tracking-widest text-amber-400 mb-1">↑ Improve</p>
                                <p className="text-xs" style={{ color: "var(--text-primary)" }}>{q.aiImprovement}</p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── ACTIONS ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="flex gap-3 pt-2">
          <button onClick={() => navigate("/mock")}
            className="flex-1 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border hover:bg-white/5 transition-all"
            style={{ borderColor: "var(--border-color)", color: "var(--text-primary)" }}>
            <FiRepeat size={16} /> New Interview
          </button>
          <button onClick={() => navigate("/history")}
            className="flex-1 py-4 rounded-2xl text-white font-black flex items-center justify-center gap-2 active:scale-95"
            style={{ backgroundColor: "var(--accent)" }}>
            <FiBarChart2 size={16} /> View History
          </button>
        </motion.div>

      </div>
    </div>
  );
}