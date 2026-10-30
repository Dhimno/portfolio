"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import { useTheme } from "../../lib/theme";

export interface RippleGridProps {
  size?: number;
  cellSize?: number;
  className?: string;
  children?: ReactNode;
}

export function RippleGrid({
  size = 24,
  cellSize = 52,
  className = "",
  children,
}: RippleGridProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gridRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ rows: number; cols: number }>({
    rows: 30,
    cols: 42,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        const cols = Math.ceil(window.innerWidth / cellSize) + 2;
        const rows = Math.ceil((window.innerHeight + 400) / cellSize) + 4;
        setDimensions({
          rows: Math.max(rows, size),
          cols: Math.max(cols, size),
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [cellSize, size]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const gridContainer = gridRef.current;
    if (!gridContainer) return;

    const handleWindowClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.closest('[data-disable-ripple="true"]') ||
        target.closest(".no-ripple") ||
        target.closest("header") ||
        target.closest("footer") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("button") ||
        target.closest("a")
      ) {
        return;
      }

      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        return;
      }

      const rect = gridContainer.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      if (clickX < 0 || clickY < 0 || clickX > rect.width || clickY > rect.height) {
        return;
      }

      const clickedCol = Math.floor(clickX / cellSize);
      const clickedRow = Math.floor(clickY / cellSize);

      const cells = gridContainer.querySelectorAll(".ripple-cell");

      cells.forEach((cell) => {
        const htmlCell = cell as HTMLElement;
        const row = Number.parseInt(htmlCell.dataset.row || "0", 10);
        const col = Number.parseInt(htmlCell.dataset.col || "0", 10);

        const distance = Math.abs(row - clickedRow) + Math.abs(col - clickedCol);

        setTimeout(() => {
          requestAnimationFrame(() => {
            htmlCell.classList.remove("pulse");
            requestAnimationFrame(() => {
              htmlCell.classList.add("pulse");
            });
          });

          setTimeout(() => {
            htmlCell.classList.remove("pulse");
          }, 360);
        }, distance * 55);
      });
    };

    window.addEventListener("click", handleWindowClick);
    return () => window.removeEventListener("click", handleWindowClick);
  }, [cellSize]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const gridContainer = gridRef.current;
    if (!gridContainer) return;

    const interval = setInterval(() => {
      const cells = gridContainer.querySelectorAll(".ripple-cell");
      if (cells.length === 0) return;

      const randomCount = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < randomCount; i++) {
        const randomIndex = Math.floor(Math.random() * cells.length);
        const cell = cells[randomIndex] as HTMLElement;

        if (!cell.classList.contains("pulse")) {
          cell.classList.add("ambient-glow");
          setTimeout(() => {
            cell.classList.remove("ambient-glow");
          }, 600);
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Interactive Ripple Grid - 100% full screen coverage */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-auto select-none overflow-hidden"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${dimensions.cols}, minmax(${cellSize}px, 1fr))`,
          gridTemplateRows: `repeat(${dimensions.rows}, ${cellSize}px)`,
          opacity: isDark ? 0.38 : 0.6,
        }}
      >
        {Array.from({ length: dimensions.rows }).map((_, r) =>
          Array.from({ length: dimensions.cols }).map((_, c) => (
            <div
              key={`${r}-${c}`}
              data-row={r}
              data-col={c}
              className="ripple-cell"
            />
          ))
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 pointer-events-auto w-full">{children}</div>
    </div>
  );
}
