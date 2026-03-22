export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-6">
          <div className="absolute inset-0 border border-gold-400/30 rotate-45 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 border border-gold-400/15 rotate-45 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
        </div>
        <p className="text-xs font-body tracking-[0.2em] uppercase text-cream-400/30">Loading</p>
      </div>
    </div>
  );
}
