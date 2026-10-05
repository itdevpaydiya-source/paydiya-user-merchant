import React from 'react';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';
import { colors } from '@/design-system';

export type IconName =
  | 'home'
  | 'transactions'
  | 'settlements'
  | 'more'
  | 'qr'
  | 'payment-link'
  | 'pos'
  | 'reports'
  | 'store'
  | 'bell'
  | 'arrow-right'
  | 'arrow-left'
  | 'check'
  | 'copy'
  | 'share'
  | 'download'
  | 'bank'
  | 'shield'
  | 'search'
  | 'filter'
  | 'calendar'
  | 'refund'
  | 'user'
  | 'lock'
  | 'phone'
  | 'mail'
  | 'eye'
  | 'eye-off'
  | 'chevron-down'
  | 'chevron-right'
  | 'users'
  | 'help-circle'
  | 'speaker'
  | 'credit-card'
  | 'file-text'
  | 'close'
  | 'trending-up'
  | 'wifi-off'
  | 'refresh';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 22,
  color = colors.charcoal,
  strokeWidth = 2,
}: IconProps) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'home':
      return (
        <Svg {...commonProps}>
          <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <Path d="M9 22V12h6v10" />
        </Svg>
      );
    case 'transactions':
      return (
        <Svg {...commonProps}>
          <Path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
        </Svg>
      );
    case 'settlements':
      return (
        <Svg {...commonProps}>
          <Rect x="2" y="5" width="20" height="14" rx="2" />
          <Line x1="2" y1="10" x2="22" y2="10" />
          <Circle cx="6" cy="15" r="1" fill={color} />
          <Circle cx="10" cy="15" r="1" fill={color} />
        </Svg>
      );
    case 'more':
      return (
        <Svg {...commonProps}>
          <Circle cx="12" cy="12" r="1" fill={color} />
          <Circle cx="19" cy="12" r="1" fill={color} />
          <Circle cx="5" cy="12" r="1" fill={color} />
        </Svg>
      );
    case 'qr':
      return (
        <Svg {...commonProps}>
          <Rect x="3" y="3" width="7" height="7" />
          <Rect x="14" y="3" width="7" height="7" />
          <Rect x="14" y="14" width="7" height="7" />
          <Rect x="3" y="14" width="7" height="7" />
        </Svg>
      );
    case 'payment-link':
      return (
        <Svg {...commonProps}>
          <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </Svg>
      );
    case 'pos':
      return (
        <Svg {...commonProps}>
          <Rect x="4" y="2" width="16" height="20" rx="2" />
          <Line x1="8" y1="6" x2="16" y2="6" />
          <Line x1="16" y1="14" x2="16" y2="14.01" />
          <Line x1="12" y1="14" x2="12" y2="14.01" />
          <Line x1="8" y1="14" x2="8" y2="14.01" />
          <Line x1="16" y1="18" x2="16" y2="18.01" />
          <Line x1="12" y1="18" x2="12" y2="18.01" />
          <Line x1="8" y1="18" x2="8" y2="18.01" />
        </Svg>
      );
    case 'reports':
      return (
        <Svg {...commonProps}>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <Path d="M14 2v6h6" />
          <Line x1="16" y1="13" x2="8" y2="13" />
          <Line x1="16" y1="17" x2="8" y2="17" />
          <Line x1="10" y1="9" x2="8" y2="9" />
        </Svg>
      );
    case 'store':
      return (
        <Svg {...commonProps}>
          <Path d="M3 9l2-5h14l2 5" />
          <Path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
          <Path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
        </Svg>
      );
    case 'bell':
      return (
        <Svg {...commonProps}>
          <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </Svg>
      );
    case 'arrow-right':
      return (
        <Svg {...commonProps}>
          <Line x1="5" y1="12" x2="19" y2="12" />
          <Path d="M12 5l7 7-7 7" />
        </Svg>
      );
    case 'arrow-left':
      return (
        <Svg {...commonProps}>
          <Line x1="19" y1="12" x2="5" y2="12" />
          <Path d="M12 19l-7-7 7-7" />
        </Svg>
      );
    case 'check':
      return (
        <Svg {...commonProps}>
          <Path d="M20 6L9 17l-5-5" />
        </Svg>
      );
    case 'copy':
      return (
        <Svg {...commonProps}>
          <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </Svg>
      );
    case 'share':
      return (
        <Svg {...commonProps}>
          <Circle cx="18" cy="5" r="3" />
          <Circle cx="6" cy="12" r="3" />
          <Circle cx="18" cy="19" r="3" />
          <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </Svg>
      );
    case 'download':
      return (
        <Svg {...commonProps}>
          <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <Path d="M7 10l5 5 5-5" />
          <Line x1="12" y1="15" x2="12" y2="3" />
        </Svg>
      );
    case 'bank':
      return (
        <Svg {...commonProps}>
          <Path d="M3 21h18M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M12 3l9 4H3l9-4z" />
        </Svg>
      );
    case 'shield':
      return (
        <Svg {...commonProps}>
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </Svg>
      );
    case 'search':
      return (
        <Svg {...commonProps}>
          <Circle cx="11" cy="11" r="8" />
          <Line x1="21" y1="21" x2="16.65" y2="16.65" />
        </Svg>
      );
    case 'filter':
      return (
        <Svg {...commonProps}>
          <Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg {...commonProps}>
          <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <Line x1="16" y1="2" x2="16" y2="6" />
          <Line x1="8" y1="2" x2="8" y2="6" />
          <Line x1="3" y1="10" x2="21" y2="10" />
        </Svg>
      );
    case 'refund':
      return (
        <Svg {...commonProps}>
          <Path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <Path d="M3 3v5h5" />
        </Svg>
      );
    case 'user':
      return (
        <Svg {...commonProps}>
          <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <Circle cx="12" cy="7" r="4" />
        </Svg>
      );
    case 'lock':
      return (
        <Svg {...commonProps}>
          <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </Svg>
      );
    case 'phone':
      return (
        <Svg {...commonProps}>
          <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </Svg>
      );
    case 'mail':
      return (
        <Svg {...commonProps}>
          <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <Path d="M22 6l-10 7L2 6" />
        </Svg>
      );
    case 'eye':
      return (
        <Svg {...commonProps}>
          <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <Circle cx="12" cy="12" r="3" />
        </Svg>
      );
    case 'eye-off':
      return (
        <Svg {...commonProps}>
          <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <Line x1="1" y1="1" x2="23" y2="23" />
        </Svg>
      );
    case 'chevron-down':
      return (
        <Svg {...commonProps}>
          <Path d="M6 9l6 6 6-6" />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg {...commonProps}>
          <Path d="M9 18l6-6-6-6" />
        </Svg>
      );
    case 'users':
      return (
        <Svg {...commonProps}>
          <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <Circle cx="9" cy="7" r="4" />
          <Path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </Svg>
      );
    case 'help-circle':
      return (
        <Svg {...commonProps}>
          <Circle cx="12" cy="12" r="10" />
          <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <Line x1="12" y1="17" x2="12.01" y2="17" />
        </Svg>
      );
    case 'speaker':
      return (
        <Svg {...commonProps}>
          <Rect x="4" y="2" width="16" height="20" rx="2" />
          <Circle cx="12" cy="14" r="4" />
          <Line x1="12" y1="6" x2="12.01" y2="6" />
        </Svg>
      );
    case 'credit-card':
      return (
        <Svg {...commonProps}>
          <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <Line x1="1" y1="10" x2="23" y2="10" />
        </Svg>
      );
    case 'file-text':
      return (
        <Svg {...commonProps}>
          <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <Path d="M14 2v6h6" />
          <Line x1="16" y1="13" x2="8" y2="13" />
          <Line x1="16" y1="17" x2="8" y2="17" />
          <Line x1="10" y1="9" x2="8" y2="9" />
        </Svg>
      );
    case 'close':
      return (
        <Svg {...commonProps}>
          <Line x1="18" y1="6" x2="6" y2="18" />
          <Line x1="6" y1="6" x2="18" y2="18" />
        </Svg>
      );
    case 'trending-up':
      return (
        <Svg {...commonProps}>
          <Path d="M23 6l-9.5 9.5-5-5L1 18" />
          <Path d="M17 6h6v6" />
        </Svg>
      );
    case 'wifi-off':
      return (
        <Svg {...commonProps}>
          <Line x1="1" y1="1" x2="23" y2="23" />
          <Path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <Path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <Path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
          <Path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <Path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <Line x1="12" y1="20" x2="12.01" y2="20" />
        </Svg>
      );
    case 'refresh':
      return (
        <Svg {...commonProps}>
          <Path d="M23 4v6h-6" />
          <Path d="M1 20v-6h6" />
          <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </Svg>
      );
    default:
      return null;
  }
}
