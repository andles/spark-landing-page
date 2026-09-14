import { Container } from '../components';
import { useTheme } from '../context/theme';

const claims = [
  { value: 'See demand', label: 'Explore your forecast and seasonal patterns' },
  { value: 'Plan the buy', label: 'Review stock, supply, and suggested quantities' },
  { value: 'Stay in control', label: 'Review the draft before you commit' },
];

function OutcomeClaimsClassic() {
  return (
    <section className="pt-2 pb-8 lg:pt-4 lg:pb-10 bg-white">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 max-w-4xl mx-auto text-center">
          {claims.map((claim, i) => (
            <div key={i}>
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                {claim.value}
              </div>
              <p className="text-slate-600 text-sm lg:text-base leading-snug">
                {claim.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function OutcomeClaimsNextGen() {
  return (
    <section className="pt-2 pb-8 lg:pt-4 lg:pb-10 bg-black relative">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 max-w-4xl mx-auto text-center">
          {claims.map((claim, i) => (
            <div key={i}>
              <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                {claim.value}
              </div>
              <p className="text-white/50 text-sm lg:text-base leading-snug">
                {claim.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function OutcomeClaims() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <OutcomeClaimsNextGen /> : <OutcomeClaimsClassic />;
}
