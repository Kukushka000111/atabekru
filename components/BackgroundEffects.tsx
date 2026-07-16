export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050507]" />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212, 175, 55, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212, 175, 55, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/8 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/8 to-transparent" />

      <div
        className="animate-light-beam absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(212, 175, 55, 0.09) 0%, rgba(212, 175, 55, 0.03) 35%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 0, 0, 0.5) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
