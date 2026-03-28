import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 relative">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center max-w-lg relative">
        <div className="font-display text-[120px] md:text-[180px] font-bold text-neon-cyan/5 leading-none select-none"
          style={{ textShadow: '0 0 80px rgba(0,255,245,0.1)' }}>
          404
        </div>
        <div className="-mt-12 md:-mt-20">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            PAGE <span className="text-glow-pink">NOT FOUND</span>
          </h1>
          <p className="text-sm text-dark-300 mb-8 max-w-sm mx-auto font-body">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="btn-neon-filled">Go Home</Link>
            <Link href="/chefs" className="btn-neon">Browse Chefs</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
