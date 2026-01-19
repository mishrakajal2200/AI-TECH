import React, { useState } from "react";
import { Send } from "lucide-react";

export default function AIChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>

      <div className="bg-white/5 rounded-xl p-6 border border-white/10 h-[70vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">Chat messages...</div>

        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none"
            placeholder="Ask something about your code..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
