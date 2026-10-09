"use client";

import { useMemo, useState } from "react";
import type { PriceTrendPoint } from "@/lib/data/localities";

const WIDTH = 600;
const HEIGHT = 200;
const PADDING_X = 36;
const PADDING_Y = 20;

type HoveredPoint = {
  x: number;
  y: number;
  point: PriceTrendPoint;
};

function formatPrice(price: number) {
  return `₹${price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}/sq.ft`;
}

/**
 * Data-driven SVG line chart with an interactive nearest-point tooltip.
 * Moving or dragging across the chart selects the closest trend point and
 * shows the exact price per square foot entered for that period.
 */
export default function PriceTrendChart({ trends }: { trends: PriceTrendPoint[] }) {
  const [hovered, setHovered] = useState<HoveredPoint | null>(null);

  const chart = useMemo(() => {
    if (!trends || trends.length === 0) return null;

    const prices = trends.map((t) => t.pricePerSqft);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const points = trends.map((point, idx) => {
      const x =
        PADDING_X + (idx / Math.max(trends.length - 1, 1)) * (WIDTH - PADDING_X * 2);
      const y =
        HEIGHT -
        PADDING_Y -
        ((point.pricePerSqft - minPrice) / priceRange) * (HEIGHT - PADDING_Y * 2);
      return { x, y, point };
    });

    return { minPrice, maxPrice, priceRange, points };
  }, [trends]);

  if (!chart) {
    return (
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-black/[0.08] bg-offwhite px-6 text-center">
        <p className="text-sm text-gray-400">Price trend data is not available for this locality yet.</p>
      </div>
    );
  }

  const { minPrice, maxPrice, priceRange, points } = chart;
  const linePath = points
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${HEIGHT - PADDING_Y} L ${points[0].x.toFixed(1)} ${HEIGHT - PADDING_Y} Z`;

  const selectNearestPoint = (clientX: number, currentTarget: SVGSVGElement) => {
    const rect = currentTarget.getBoundingClientRect();
    if (!rect.width) return;

    const svgX = ((clientX - rect.left) / rect.width) * WIDTH;
    const nearest = points.reduce((closest, point) =>
      Math.abs(point.x - svgX) < Math.abs(closest.x - svgX) ? point : closest,
    );

    setHovered(nearest);
  };

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT + 24}`}
        className="h-auto w-full touch-none"
        role="img"
        aria-label="Price per square foot trend over time. Move across the chart to see the exact price for each period."
        onPointerMove={(event) => selectNearestPoint(event.clientX, event.currentTarget)}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          selectNearestPoint(event.clientX, event.currentTarget);
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerLeave={() => setHovered(null)}
      >
        {/* Gridlines */}
        {[0, 0.5, 1].map((fraction) => {
          const y = PADDING_Y + fraction * (HEIGHT - PADDING_Y * 2);
          const value = Math.round(maxPrice - fraction * priceRange);
          return (
            <g key={fraction}>
              <line
                x1={PADDING_X}
                y1={y}
                x2={WIDTH - 8}
                y2={y}
                stroke="#1A2744"
                strokeOpacity={0.06}
                strokeWidth={1}
              />
              <text x={0} y={y + 3} fontSize={9} fill="#9CA3AF">
                {value >= 1000 ? `${Math.round(value / 100) / 10}k` : value}
              </text>
            </g>
          );
        })}

        {/* Area under the line */}
        <path d={areaPath} fill="#C9A04B" fillOpacity={0.08} stroke="none" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#C9A04B"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pointerEvents="none"
        />

        {/* Points */}
        {points.map(({ x, y, point }, index) => (
          <circle
            key={`${point.year}-${index}`}
            cx={x}
            cy={y}
            r={hovered?.point === point ? 5 : 3.5}
            fill="#1A2744"
            stroke="#fff"
            strokeWidth={1.5}
            pointerEvents="none"
          />
        ))}

        {/* Year labels */}
        {points.map(({ x, point }, index) => (
          <text
            key={`${point.year}-${index}`}
            x={x}
            y={HEIGHT + 16}
            fontSize={10}
            textAnchor="middle"
            fill="#9CA3AF"
            pointerEvents="none"
          >
            {point.year}
          </text>
        ))}
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-gold/20 bg-white px-3 py-2 shadow-[0_6px_20px_rgba(26,39,68,0.12)]"
          style={{
            left: `${(hovered.x / WIDTH) * 100}%`,
            top: `${Math.max(4, (hovered.y / HEIGHT) * 100 - 18)}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="whitespace-nowrap text-[11px] font-semibold text-gray-400">
            {hovered.point.year}
          </p>
          <p className="whitespace-nowrap font-serif text-base font-bold text-navy">
            {formatPrice(hovered.point.pricePerSqft)}
          </p>
        </div>
      )}
    </div>
  );
}
