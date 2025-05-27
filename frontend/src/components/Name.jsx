import React from "react";

const Name = ({ name, handleChange }) => {
  return (
    <div>
      <label className="input validator min-w-full" htmlFor="name">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </g>
        </svg>
        <input
          type="input"
          required
          name="name"
          autoFocus
          placeholder="Username"
          minLength="3"
          maxLength="30"
          title="Only letters, numbers or dash"
          value={name}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default Name;
