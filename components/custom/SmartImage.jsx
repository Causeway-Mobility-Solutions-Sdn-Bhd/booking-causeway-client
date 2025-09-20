"use client";
import React, { useState } from "react";
import Image from "next/image";
import Spinner from "./Spinner";

const SmartImage = ({
  src,
  width,
  height,
  alt = "image",
  className = "",
  fit = "cover",
  priority = false,
  lazy = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{ width, height }}
        className="flex items-center justify-center text-sm text-gray-400"
      >
        Image not available
      </div>
    );
  }

  const commonProps = {
    src,
    alt,
    onLoad: () => setLoaded(true),
    onError: () => setError(true),
    priority,
    loading: lazy ? "lazy" : "eager",
    className: `transition-opacity duration-300 ${
      loaded ? "opacity-100" : "opacity-0"
    } object-${fit} ${className}`,
  };

  return (
    <div
      className="flex justify-center items-center relative"
      style={{ width, height }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size={30} color="#2dbdb6" thickness={4} />
        </div>
      )}

      {width && height ? (
        // ✅ intrinsic size mode
        <Image {...commonProps} width={width} height={height} />
      ) : (
        // ✅ fill mode (scales with parent div)
        <Image {...commonProps} fill />
      )}
    </div>
  );
};

export default SmartImage;
