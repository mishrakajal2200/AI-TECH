import React from "react";

export default function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}
