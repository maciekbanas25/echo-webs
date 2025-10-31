const DotGridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, hsl(217 91% 60% / 0.15) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        animation: 'dotMove 20s linear infinite'
      }} />
      <style>{`
        @keyframes dotMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 50px 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default DotGridBackground;
