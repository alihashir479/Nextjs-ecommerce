
export default function HeroSection() {
  return (
    <section className="relative w-full h-[400px] flex items-center justify-center text-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      <div className="relative z-10 px-6 md:px-12">
        <p className="text-sm uppercase tracking-wide">
          <span className="text-gray-500">Home</span> &gt; <span className="ml-3">Shop</span>
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-2 text-black">Shop Page</h1>

        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Let’s design the place you always imagined.
        </p>
      </div>
    </section>
  )
}
