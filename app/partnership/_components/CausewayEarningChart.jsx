"use client";
import React, { useState } from "react";

export const CausewayEarningsChart = () => {
  const [hoveredPoint, setHoveredPoint] = React.useState(null);
  // Data points for the curve
  const dataPoints = [
    { x: 2, y: 2000, cars: 1 },

    { x: 4, y: 3800, cars: 4 },

    { x: 6, y: 8100, cars: 6 },

    { x: 8, y: 12000, cars: 8 },

    { x: 10, y: 20000, cars: 10 },
  ];

  // Chart dimensions
  const chartWidth = 400;
  const chartHeight = 350;
  const padding = 20;

  // Scale functions
  const xScale = (value) => (value / 12) * chartWidth + padding;
  const yScale = (value) =>
    chartHeight - (value / 30000) * chartHeight + padding;

  // Generate path for the curve
  const generatePath = () => {
    // Use your actual data points to fit a parabola
    // We'll use the first, middle, and last points to define the parabola: y = ax² + bx + c

    const p1 = dataPoints[0]; // (2, 2800)
    const p2 = dataPoints[2]; // (6, 8100) - middle point
    const p3 = dataPoints[4]; // (10, 20000)

    // Solve for parabola coefficients using the three points
    const x1 = p1.x,
      y1 = p1.y;
    const x2 = p2.x,
      y2 = p2.y;
    const x3 = p3.x,
      y3 = p3.y;

    // System of equations to solve for a, b, c
    const denom = (x1 - x2) * (x1 - x3) * (x2 - x3);
    const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom;
    const b =
      (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom;
    const c =
      (x2 * x3 * (x2 - x3) * y1 +
        x3 * x1 * (x3 - x1) * y2 +
        x1 * x2 * (x1 - x2) * y3) /
      denom;

    // Generate smooth parabolic curve
    const points = [];
    const step = 0.1;

    for (let x = 2; x <= 10; x += step) {
      const y = a * x * x + b * x + c;
      points.push({ x, y });
    }

    // Create path
    let path = `M ${xScale(points[0].x)} ${yScale(points[0].y)}`;

    for (let i = 1; i < points.length; i++) {
      path += ` L ${xScale(points[i].x)} ${yScale(points[i].y)}`;
    }

    return path;
  };

  return (
    <div className="max-w-[1400px] mx-auto w-[90%] sm:w-[95%] mt-[30px]">
      <h2 className="text-2xl font-bold text-black mb-8">
        How much can you earn with Causeway?
      </h2>

      {/* Chart Container */}
      <div className="relative max-w-[540px] bg-white p-3 rounded-lg flex flex-col items-center">
        <div className="flex items-center">
          {/* Y-axis label */}
          <div className="w-[20px] mr-6 flex items-center justify-center h-[340px]">
            <span className="text-sm text-gray-600 font-medium -rotate-90 whitespace-nowrap">
              Monthly earnings (RM)
            </span>
          </div>
          <svg
            width={chartWidth + padding * 2}
            height={chartHeight + padding * 2}
            className="overflow-visible max-w-500px"
          >
            {/* Grid lines - vertical */}
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <line
                key={`v-${i}`}
                x1={xScale(i)}
                y1={padding}
                x2={xScale(i)}
                y2={chartHeight + padding}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Grid lines - horizontal */}
            {[0, 5000, 10000, 15000, 20000, 25000, 30000].map((value) => (
              <line
                key={`h-${value}`}
                x1={padding}
                y1={yScale(value)}
                x2={chartWidth + padding}
                y2={yScale(value)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {[0, 5000, 10000, 15000, 20000, 25000, 30000].map((value) => (
              <text
                key={`y-label-${value}`}
                x={padding - 10}
                y={yScale(value) + 4}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                {value === 0 ? "0" : `${value / 1000}K`}
              </text>
            ))}

            {/* X-axis labels */}
            {[0, 2, 4, 6, 8, 10, 12].map((value) => (
              <text
                key={`x-label-${value}`}
                x={xScale(value)}
                y={chartHeight + padding + 20}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {value}
              </text>
            ))}

            {/* Main curve */}
            <path
              d={generatePath()}
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />

            {/* Data points */}
            {dataPoints.map(
              (point, index) =>
                (index === 0 || index === dataPoints.length - 1) && (
                  <circle
                    key={index}
                    cx={xScale(point.x)}
                    cy={yScale(point.y)}
                    r="4"
                    fill="#10b981"
                    className="drop-shadow-sm"
                    onMouseEnter={() => setHoveredPoint(index)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                )
            )}
          </svg>
        </div>

        {/* X-axis label */}
        <div className="text-center mt-1">
          <span className="text-sm text-gray-600 font-medium">
            No. of vehicles
          </span>
        </div>

        {/* First callout - appears when hovering first point */}
        {hoveredPoint === 0 && (
          <div
            className="absolute"
            style={{
              left: `${xScale(dataPoints[0].x) + 5}px`,
              top: `${yScale(dataPoints[0].y) - 60}px`,
            }}
          >
            <div className="bg-black text-white px-3 py-2 rounded-lg text-sm font-medium relative">
              <div>RM 2,000/month</div>
              <div className="text-xs text-center opacity-80">1 car</div>
            </div>
          </div>
        )}

        {/* Second callout - appears when hovering last point */}
        {hoveredPoint === dataPoints.length - 1 && (
          <div
            className="absolute"
            style={{
              left: `${xScale(dataPoints[dataPoints.length - 1].x)}px`,
              top: `${yScale(dataPoints[dataPoints.length - 1].y) - 60}px`,
            }}
          >
            <div className="bg-black text-white px-3 py-2 rounded-lg text-sm font-medium relative">
              <div>RM 20,000/month</div>
              <div className="text-xs text-center opacity-80">10 cars</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
