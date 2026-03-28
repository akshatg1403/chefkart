export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          {/* Outer ring */}
          <div className="absolute inset-0 border-2 border-neon-cyan/20 rotate-45 animate-spin" style={{ animationDuration: '3s' }} />
          {/* Inner ring */}
          <div className="absolute inset-3 border-2 border-neon-pink/20 rotate-45 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
          {/* Center dot */}
          <div className="absolute inset-[26px] bg-neon-cyan rounded-full animate-pulse" style={{ boxShadow: '0 0 15px rgba(0,255,245,0.5)' }} />
        </div>
        <p className="text-xs font-display tracking-[0.25em] uppercase text-neon-cyan/50">Loading</p>
      </div>
    </div>
  );
}
