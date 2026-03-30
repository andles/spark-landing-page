import { Container } from '../components';
import { useTheme } from '../context/ThemeContext';

function DemoVideoClassic() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <video
            src="/spark-demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full rounded-2xl shadow-2xl"
          />
        </div>
      </Container>
    </section>
  );
}

function DemoVideoNextGen() {
  return (
    <section className="py-12 lg:py-16 bg-black relative">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.15)]">
            <video
              src="/spark-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function DemoVideo() {
  const { theme } = useTheme();
  return theme === 'nextgen' ? <DemoVideoNextGen /> : <DemoVideoClassic />;
}
