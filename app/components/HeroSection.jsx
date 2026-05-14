import React from "react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-between gap-10 px-6 text-white md:flex-row">

        {/* Left Section */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[4px] text-orange-400">
            Welcome
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Build Modern Hero Sections
          </h1>

          <p className="mb-8 text-lg text-gray-200">
            Create beautiful landing pages with Next.js and Tailwind CSS using
            background videos and responsive layouts.
          </p>

          <button className="rounded-lg bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600">
            Get Started
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-64 md:w-80"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;