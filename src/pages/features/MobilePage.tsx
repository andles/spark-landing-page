import { Smartphone } from 'lucide-react';
import { FeaturePage } from './FeaturePage';
import { MobileFloorFlow } from './featureVisuals';
import { MobileHeroScreen, MobileScreensGallery } from './mobileScreens';

const features = [
  {
    title: 'Scan-First Receiving',
    description: 'Open a purchase order, scan what arrived, and put it away to a bin. Short, over, and unlisted items are flagged on the line as you go.',
  },
  {
    title: 'Receive What the PO Missed',
    description: 'Scan a barcode the purchase order does not list and Spark looks it up, so the clerk can receive it without leaving the dock.',
  },
  {
    title: 'Pick Lists With Auto Pick',
    description: 'Assign a picker, scan by location, or let Auto Pick fill open lines by earliest expiry first. Finish partially when stock runs short.',
  },
  {
    title: 'Pack and Ship',
    description: 'Scan each item into its package with UPC verification, then finish packing and ship out from the same screen.',
  },
  {
    title: 'Move and Adjust Stock',
    description: 'Move stock between bins or set on-hand counts by location. Lot, expiry, and serial details are captured for tracked items.',
  },
  {
    title: 'Transfers and Returns',
    description: 'Create and receive transfer orders with actual quantities, and log customer returns into the right warehouse.',
  },
  {
    title: 'Rugged Scanner Support',
    description: 'Use the phone camera or keyboard-mode hardware scanners such as Zebra and Sunmi devices, with haptic and sound cues on every scan.',
  },
  {
    title: 'Item Health in Your Pocket',
    description: 'Look up any item to see stock by bin and lot, days of supply, its health score, and incoming purchase orders.',
  },
  {
    title: 'Reorder From the Floor',
    description: 'Review reorder alerts, adjust quantities per warehouse, and generate purchase orders from your phone.',
  },
  {
    title: 'Signals and Sparki on the Go',
    description: 'Approve or dismiss proposed actions from the Signal feed, and ask Sparki questions in plain language from any screen.',
  },
  {
    title: 'Pickup Monitor on a Docked iPad',
    description: 'Run in-store pickup from a live board with customer text threads, ready notifications, and pick tickets that print automatically.',
  },
  {
    title: 'Spark Pickup for Shopify',
    description: 'Shoppers choose a pickup store and time in your Shopify store, and those orders land on the Pickup Monitor ready to work.',
  },
  {
    title: '3D Warehouse View',
    description: 'See warehouses and bins in a 3D layout and tap into what each location holds.',
  },
];

export function MobilePage() {
  return (
    <FeaturePage
      title="Spark Inventory Mobile"
      heroOutcome="Warehouse Work From Your Phone"
      subtitle="iPhone, iPad, and Android"
      description="Receive, pick, pack, ship, count, and move stock with a scanner in hand. Every scan updates the same inventory your plan and purchase orders run on."
      capabilityLabel="warehouse work on mobile"
      icon={Smartphone}
      gradientFrom="from-sky-500"
      gradientTo="to-cyan-400"
      features={features}
      heroMedia={<MobileHeroScreen />}
      showcase={<><MobileScreensGallery /><MobileFloorFlow /></>}
      ctaSource="features-mobile"
      prevCategory={{ name: 'Warehousing', href: '/features/warehousing' }}
      nextCategory={{ name: 'Signals & Automation', href: '/features/signals-automation' }}
    />
  );
}
