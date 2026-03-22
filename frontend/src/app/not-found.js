import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-display text-[120px] md:text-[180px] font-light text-cream-400/5 leading-none select-none">
          404
        </div>
        <div className="-mt-12 md:-mt-20">
          <h1 className="font-display text-3xl md:text-4xl font-light text-cream-50 mb-4">
            Page Not <span className="italic text-gold-400">Found</span>
          </h1>
          <p className="text-sm text-cream-400/40 mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/" className="btn-gold">
              Go Home
            </Link>
            <Link href="/chefs" className="btn-outline">
              Browse Chefs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
