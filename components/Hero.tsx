'use client';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-stone-50 to-teal-50 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Jaago Outdoor
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 font-medium leading-relaxed">
          Where Faith Meets Fellowship
        </p>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-loose">
          Join us for a series of inspiring events designed to strengthen your
          faith, build community, and deepen your connection with God and fellow
          believers.
        </p>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  );
}

