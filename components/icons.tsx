import React from 'react';

// This file is a substitute for an icon library like lucide-react.
// It contains SVG definitions for icons used in the application.

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  />
);

export const UtensilsCrossed: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
    <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
    <path d="m2.1 2.1 6.4 6.4" />
    <path d="M3 21l6-6" />
  </Icon>
);

export const PartyPopper: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="M4 14.12A2.4 2.4 0 0 1 6.5 12H8" />
    <path d="m18 2-1.5 4-4-1.5.5-3.5L18 2z" />
    <path d="M12.5 5.5 14 7" />
    <path d="m15 9-.5 2.5" />
    <path d="m20 3-1 2" />
    <path d="m19 8.5 2 1" />
  </Icon>
);

export const Users: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

export const Baby: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M9 12.5a5 5 0 0 0 5 5" />
    <path d="M14 17.5c0-2.5-2-5-5-5" />
    <path d="M12 10a2 2 0 0 0-2-2" />
    <path d="M12 14a2 2 0 0 0-2-2" />
    <path d="M12 2a4 4 0 0 0-4 4c0 1.3.4 2.5 1 3.5" />
    <path d="M15.5 2.5a4 4 0 0 1 3 3" />
    <path d="M9.5 20c.5 1 1.5 2 3 2" />
    <path d="M6.5 20c-.5 1-1.5 2-3 2" />
  </Icon>
);

export const Beef: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <circle cx="12.5" cy="8.5" r="2.5" />
    <path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 2.99-.73 6.83.98 9.4" />
    <path d="M12.5 2a6.5 6.5 0 0 1 6.22 4.6c1.1 2.99.73 6.83-.98 9.4" />
    <path d="M18.72 16c-2.3-1.42-4.48-3.26-5.92-5.4" />
    <path d="M10.2 16c-2.42-1.54-4.67-3.53-6-6" />
    <path d="M12.5 16.14a13.2 13.2 0 0 0 3.3-3.4" />
    <path d="M12.5 16.14a13.2 13.2 0 0 1-3.3-3.4" />
    <path d="M11.5 22c-5.11-1.26-8.5-4.78-9.5-9" />
    <path d="M13.5 22c5.11-1.26 8.5-4.78 9.5-9" />
  </Icon>
);

export const Fish: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="m11.6 16.7-1.1-2.3" />
    <path d="m14 19.5.7-1.3" />
    <path d="m17.4 14-.5-1.6" />
    <path d="M16 8s-1.4-2-3.5-2C9.5 6 7 8 7 8" />
    <path d="m18 11 .5-1.7" />
    <path d="m16.5 18.5 1-1.8" />
    <path d="M12 6.5 12.5 8" />
    <path d="M4.4 11.2A10 10 0 0 0 12 21a10 10 0 0 0 7.8-4.2 1 1 0 0 0 .2-1.3l-3.3-4a1 1 0 0 0-1.4-.2l-1.8 1.1a1 1 0 0 1-1.4-.2l-3.3-4a1 1 0 0 0-1.4-.2L5.1 10a1 1 0 0 0 .2 1.3l-1.2 1.3a1 1 0 0 0-.2 1.4Z" />
    <path d="M14 6.5c-1-.5-2-.5-3 0" />
    <path d="M11 3.5A1.5 1.5 0 0 1 9.5 2 1.5 1.5 0 0 1 11 3.5Z" />
  </Icon>
);

export const MessageSquarePlus: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>
        <line x1="12" x2="18" y1="9" y2="9"/>
        <line x1="15" x2="15" y1="6" y2="12"/>
    </Icon>
);

export const Sparkles: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="m12 3-1.9 1.9-1 .8-1.9-1.9L3 3l1.9 1.9.8 1-1.9 1.9L3 12l1.9-1.9 1-.8 1.9 1.9L12 9l-1.9-1.9-.8-1zM9 12l1.9 1.9.8 1 1.9-1.9L21 12l-1.9-1.9-1-.8-1.9 1.9L12 15l1.9 1.9.8 1z"/>
    </Icon>
);

export const Trash2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </Icon>
);

export const PlusCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </Icon>
);

export const Check: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const Copy: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </Icon>
);

export const RotateCcw: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </Icon>
);

export const Save: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M15.2 3a2 2 0 0 1 2.8 2.8L7 19H4v-3L15.2 3z"/>
        <path d="m14 4-2 2"/>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    </Icon>
);

export const X: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </Icon>
);

export const CircleDollarSign: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4h-6" />
        <path d="M12 18V6" />
    </Icon>
);

export const Ban: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="m4.9 4.9 14.2 14.2" />
    </Icon>
);

// Fix: Corrected a typo in the closing tag for the Pencil icon component.
export const Pencil: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
    </Icon>
);
