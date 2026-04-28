import { useEffect, useRef, useState } from "react";

const DATA = [
  { x: 30, val: 594 }, { x: 55, val: 660 }, { x: 80, val: 548 },
  { x: 105, val: 480 }, { x: 130, val: 580 }, { x: 155, val: 544 },
  { x: 180, val: 650 }, { x: 205, val: 744 }, { x: 230, val: 767 },
  { x: 255, val: 870 }, { x: 280, val: 970 }, { x: 305, val: 920 },
  { x: 330, val: 1174 }, { x: 355, val: 1350 }, { x: 380, val: 1674 },
  { x: 405, val: 1470 }, { x: 430, val: 1790 }, { x: 455, val: 2100 },
  { x: 480, val: 2550 }, { x: 505, val: 2900 },
];

const MAX_VAL = 3200;
const CHART_TOP = 14;
const CHART_BOTTOM = 145;
const CHART_H = CHART_BOTTOM - CHART_TOP;
const BAR_W = 16;

function valToY(val: number) {
  return CHART_BOTTOM - (val / MAX_VAL) * CHART_H;
}

function buildCurvePath(data: typeof DATA) {
  const pts = data.map(d => ({ x: d.x + BAR_W / 2, y: valToY(d.val) }));
  if (pts.length < 2) return "";
  let path = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) * 0.4;
    const cp2x = pts[i + 1].x - (pts[i + 1].x - pts[i].x) * 0.4;
    path += ` C${cp1x},${pts[i].y} ${cp2x},${pts[i + 1].y} ${pts[i + 1].x},${pts[i + 1].y}`;
  }
  return path;
}

function buildAreaPath(data: typeof DATA) {
  const curve = buildCurvePath(data);
  const firstX = data[0].x + BAR_W / 2;
  const lastX = data[data.length - 1].x + BAR_W / 2;
  return `${curve} L${lastX},${CHART_BOTTOM} L${firstX},${CHART_BOTTOM} Z`;
}

const CURVE_PATH = buildCurvePath(DATA);
const AREA_PATH = buildAreaPath(DATA);
const X_LABELS = ["Dec 25", "Dec 29", "Jan 2", "Jan 6", "Jan 11", "Jan 15", "Jan 19"];
const LABEL_INDICES = new Set([0, 2, 5, 8, 10, 12, 14, 19]);

export default function DashboardChart({ isVisible }: { isVisible: boolean }) {
  const curveRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(700);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    if (curveRef.current) {
      setPathLength(curveRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="dash-chart rounded-lg bg-white/[0.02] border border-white/[0.06] p-3 relative">
      <svg viewBox="0 0 540 162" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="ag-barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="ag-barAccent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="ag-areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.25" />
            <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ag-lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="ag-dotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <text x="3" y="18" fill="rgba(148,163,184,0.55)" fontSize="7.5" fontFamily="monospace">$3k</text>
        <text x="3" y="50" fill="rgba(148,163,184,0.55)" fontSize="7.5" fontFamily="monospace">$2k</text>
        <text x="3" y="82" fill="rgba(148,163,184,0.55)" fontSize="7.5" fontFamily="monospace">$1.5k</text>
        <text x="3" y="114" fill="rgba(148,163,184,0.55)" fontSize="7.5" fontFamily="monospace">$750</text>

        {[18, 50, 82, 114, 145].map(y => (
          <line key={y} x1="30" y1={y} x2="530" y2={y} stroke="rgba(255,255,255,0.03)" strokeDasharray="3 4" />
        ))}

        {DATA.map((d, i) => {
          const barH = ((d.val / MAX_VAL) * CHART_H) * 0.7;
          return (
            <rect
              key={i}
              x={d.x} y={CHART_BOTTOM - barH} width={BAR_W} height={barH} rx="3"
              fill={i >= 18 ? "url(#ag-barAccent)" : "url(#ag-barGrad)"}
              className={`chart-bar${i >= 18 ? " chart-bar-cyan" : ""}`}
              style={isVisible ? {
                transformOrigin: `${d.x + BAR_W / 2}px ${CHART_BOTTOM}px`,
                animation: `barGrow 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.75 + i * 0.04}s both`,
              } : { transform: "scaleY(0)", transformOrigin: `${d.x + BAR_W / 2}px ${CHART_BOTTOM}px` }}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            />
          );
        })}

        <path d={AREA_PATH} fill="url(#ag-areaGrad)" style={isVisible ? { animation: "fade-in 0.8s ease-out 1.8s both" } : { opacity: 0 }} />

        <path
          ref={curveRef}
          d={CURVE_PATH}
          fill="none"
          stroke="url(#ag-lineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={isVisible ? {
            strokeDasharray: pathLength,
            strokeDashoffset: 0,
            animation: `drawLine 1.5s ease-out 1.1s both`,
          } : { opacity: 0 }}
        />

        {DATA.map((d, i) => {
          const cx = d.x + BAR_W / 2;
          const cy = valToY(d.val);
          const dotDelay = 1.1 + (i / DATA.length) * 1.5;
          return (
            <g key={i} style={isVisible ? {
              animation: `scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${dotDelay}s both`,
              transformOrigin: `${cx}px ${cy}px`,
            } : { opacity: 0 }}>
              <circle cx={cx} cy={cy} r="4" fill={i >= 18 ? "#22d3ee" : "#a78bfa"} opacity="0.15" />
              <circle cx={cx} cy={cy} r="2.2" fill={i >= 18 ? "#22d3ee" : "#c084fc"} opacity="0.9" className="trend-dot" filter="url(#ag-dotGlow)" />
              <circle cx={cx} cy={cy} r="1" fill="white" opacity="0.85" />
            </g>
          );
        })}

        {DATA.map((d, i) => {
          if (!LABEL_INDICES.has(i)) return null;
          const cx = d.x + BAR_W / 2;
          const cy = valToY(d.val);
          const label = d.val >= 1000 ? `$${(d.val / 1000).toFixed(1)}k` : `$${d.val}`;
          return (
            <text key={`label-${i}`} x={cx} y={cy - 8} textAnchor="middle" fill="rgba(203,213,225,0.7)" fontSize="6.5" fontFamily="monospace"
              style={isVisible ? { animation: `fade-in 0.4s ease ${1.5 + i * 0.05}s both` } : { opacity: 0 }}
            >{label}</text>
          );
        })}

        <text x="480" y={valToY(2900) - 12} fill="#22d3ee" fontSize="9" fontFamily="monospace" fontWeight="bold"
          style={isVisible ? { animation: "fade-in 0.5s ease 2.4s both" } : { opacity: 0 }}>$2,900</text>

        <line x1="30" y1={CHART_BOTTOM} x2="530" y2={CHART_BOTTOM} stroke="rgba(255,255,255,0.07)" />

        {X_LABELS.map((l, i) => (
          <text key={l} x={30 + i * 75} y={156} fill="rgba(148,163,184,0.55)" fontSize="7.5" fontFamily="monospace">{l}</text>
        ))}
      </svg>

      {hoveredBar !== null && DATA[hoveredBar] && (
        <div
          className="absolute pointer-events-none glass border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-white z-10 hidden md:block"
          style={{
            left: `${((DATA[hoveredBar].x + BAR_W / 2) / 540) * 100}%`,
            bottom: `${((CHART_BOTTOM - valToY(DATA[hoveredBar].val)) / 162) * 100 + 10}%`,
            transform: "translateX(-50%)",
          }}
        >
          <div className="text-white/90 font-semibold">${DATA[hoveredBar].val.toLocaleString()}</div>
          <div className="text-white/50 text-[8px]">{X_LABELS[Math.min(Math.floor(hoveredBar / 3), X_LABELS.length - 1)]}</div>
        </div>
      )}
    </div>
  );
}
