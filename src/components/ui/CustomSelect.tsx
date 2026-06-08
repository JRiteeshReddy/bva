"use client";

import React, { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  required?: boolean;
  className?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  id = "custom-select",
  name,
  className = "",
  ariaDescribedBy,
  ariaInvalid,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(() => {
    const idx = options.indexOf(value);
    return idx >= 0 ? idx : 0;
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const idx = options.indexOf(value);
    setHighlighted(idx >= 0 ? idx : 0);
  }, [value, options]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.querySelector<HTMLElement>(`[data-index=\"${highlighted}\"]`);
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [open, highlighted]);

  function toggleOpen() {
    setOpen((v) => !v);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlighted((h) => (h + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setHighlighted((h) => (h - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) {
        onChange(options[highlighted]);
        setOpen(false);
      } else {
        setOpen(true);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlighted(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlighted(options.length - 1);
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        ref={buttonRef}
        className="input w-full flex items-center justify-between"
      >
        <span className="truncate">{value}</span>
        <svg className="w-4 h-4 ml-2 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.586l3.71-3.4a.75.75 0 111.02 1.1l-4.25 3.9a.75.75 0 01-1.02 0l-4.25-3.9a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={id}
          tabIndex={-1}
          className="absolute z-50 mt-2 w-full bg-[#050505] border border-white/10 rounded-md shadow-lg max-h-56 overflow-auto"
        >
          {options.map((opt, i) => {
            const isSelected = opt === value;
            const isHighlighted = i === highlighted;
            return (
              <div
                key={opt}
                role="option"
                id={`${id}-option-${i}`}
                data-index={i}
                aria-selected={isSelected}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={`cursor-pointer select-none px-4 py-2 ${isHighlighted ? "bg-blue-600 text-white" : "text-neutral-300"} ${isSelected ? "font-semibold" : ""}`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}

      {name && <input type="hidden" name={name} value={value} aria-hidden />}
    </div>
  );
}
