import { Color } from './types';

export const BACKGROUND_COLORS: Color[] = [
  { name: 'Deep Teal', hex: '#008080', twClass: 'bg-[#008080]' },
  { name: 'Sea Green', hex: '#2E8B57', twClass: 'bg-[#2E8B57]' },
  { name: 'Cadet Blue', hex: '#5F9EA0', twClass: 'bg-[#5F9EA0]' },
  { name: 'Plum', hex: '#5D3A9B', twClass: 'bg-[#5D3A9B]' },
  { name: 'Mauve', hex: '#6F42C1', twClass: 'bg-[#6F42C1]' },
  { name: 'Lavender', hex: '#9B88B2', twClass: 'bg-[#9B88B2]' },
];

export const VIEW_ANGLES: string[] = [
  'a direct front-on portrait, looking at the camera',
  'looking out to the side, at a three-quarter angle away from the camera',
  'a medium shot with arms folded, looking confident',
  'a candid moment, with hands touching the face in a thoughtful expression',
  'a close-up shot focusing on a hand gesture, such as a hand on the back of the neck',
  'sitting on a simple studio stool, as a three-quarter body shot',
];

export const LIFESTYLE_ANGLES: string[] = [
  'candidly working on a laptop in a bright, modern office with plants in the background, soft natural light',
  'a close-up shot, looking thoughtfully away from the camera, with a shallow depth of field blurring the background of a modern office kitchen or breakout area with coffee-making facilities',
  'sitting relaxed on a stylish sofa in a bright, modern office lounge, smiling gently, as if in conversation',
  'an over-the-shoulder shot showing them interacting with a tablet, with creative office decor in the background',
  'a medium portrait, leaning against a textured wall outdoors, with natural afternoon sunlight creating a warm glow',
  'walking through a stylish, open-plan office, captured in mid-motion, looking confident and engaged',
];

export const ASPECT_RATIOS: string[] = ['1:1', '3:4', '4:3', '9:16', '16:9'];