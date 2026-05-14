import React from "react";

function Section() {
  return (
    <section className="w-full bg-black px-6 py-20 text-white md:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 md:flex-row">

        {/* Left Content */}
        <div className="flex-1">
          <h1 className="mb-8 text-5xl font-bold">
            Why KFintech?
          </h1>

          <h2 className="mb-8 text-3xl font-semibold text-cyan-400">
            Secure Hyperscale Platform
          </h2>

          <p className="max-w-2xl text-lg leading-10 text-gray-400">
            KFintech’s asset management platforms are leading investor and
            issuer servicing platforms. Our systems are secure, scalable, and
            cloud-ready, built with modern microservices architecture to support
            mutual funds, ETFs, pensions, and investor servicing solutions.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex flex-1 justify-center">
          <img
            src="https://www.kfintech.com/new-assets/images/logo-shape.svg"
            alt="KFintech"
            className="w-full max-w-md object-contain"
          />
        </div>

      </div>
    </section>
  );
}

export default Section;