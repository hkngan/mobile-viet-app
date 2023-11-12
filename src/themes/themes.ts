interface Spacing {
    space_2: number;
    space_4: number;
    space_8: number;
    space_10: number;
    space_12: number;
    space_15: number;
    space_16: number;
    space_18: number;
    space_20: number;
    space_24: number;
    space_28: number;
    space_32: number;
    space_36: number;
    space_40: number;
  }
  
  export const SPACING: Spacing = {
    space_2: 2,
    space_4: 4,
    space_8: 8,
    space_10: 10,
    space_12: 12,
    space_15: 15,
    space_16: 16,
    space_18: 18,
    space_20: 20,
    space_24: 24,
    space_28: 28,
    space_32: 32,
    space_36: 36,
    space_40: 40,
  };
  
  interface Color {
    Black: string;
    BlackRGB10: string;
    LightBlack: string,
    Red: string;
    Red2: string;
    RedRGBA0: string;
    Brown: string;
    DarkGrey: string;
    Blue: string;
    DarkBlue: string
    LightBlue: string;
    LightBlue1: string;
    Yellow: string;
    Yellow1: string;
    Yellow2: string;
    Yellow3:string;
    PinkRGBA75: string,
    White: string;
    WhiteRGBA75: string;
    WhiteRGBA50: string;
    WhiteRGBA32: string;
    WhiteRGBA15: string;
    Beige: string;
    Green: string;
    Green1: string;
    Green2: string
  }
  
  export const COLORS: Color = {
    Black: '#000000',
    BlackRGB10: 'rgba(0,0,0,0.6)',
    LightBlack: '#526D82',
    Red: '#FE0000',
    Red2: '#C10000',
    RedRGBA0: 'rgba(208, 21, 34, 0.8)',
    Brown: '#EBE3D5',
    DarkGrey: '#0b0b0b',
    Blue: '#39A7FF',
    DarkBlue: '#0C356A',
    LightBlue: '#E0F4FF',
    LightBlue1: '#AEDEFC',
    Yellow: 'rgba(255, 162, 0, 0.2)',
    Yellow1: '#F6BA6F',
    Yellow2: 'rgba(255, 162, 0, 0.9)',
    Yellow3: '#F0DE36',
    PinkRGBA75: '#FF9B9B',
    White: '#FFFFFF',
    WhiteRGBA75: 'rgba(255,255,255,0.75)',
    WhiteRGBA50: 'rgba(255,255,255,0.50)',
    WhiteRGBA32: 'rgba(255,255,255,0.32)',
    WhiteRGBA15: 'rgba(255,255,255,0.49)',
    Beige: '#EEEDED',
    Green: '#ADE4DB',
    Green1: '#64CCC5',
    Green2: '#96C291'
  };
  
  interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_24: number;
    size_30: number;
  }
  
  export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_24: 24,
    size_30: 30,
  };
  
  interface BorderRadius {
    radius_4: number;
    radius_8: number;
    radius_10: number;
    radius_15: number;
    radius_20: number;
    radius_25: number;
  }
  
  export const BORDER_RADIUS: BorderRadius = {
    radius_4: 4,
    radius_8: 8,
    radius_10: 10,
    radius_15: 15,
    radius_20: 20,
    radius_25: 25,
  };