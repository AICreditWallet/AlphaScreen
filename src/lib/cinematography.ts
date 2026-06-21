/**
 * AlphaScreen Cinematography Logic Engine
 * 
 * This library defines the technical parameters for "Hollywood-Grade" 
 * visual generation. It is used by the AI Director to inject 
 * professional cinematography constraints into the generation prompts.
 */

export const CAMERA_PROFILES = {
  ANAMORPHIC: {
    lens: "Anamorphic 35mm",
    aspectRatio: "2.39:1",
    characteristics: "Horizontal blue lens flares, oval bokeh, shallow depth of field",
    promptSuffix: "shot on anamorphic 35mm lens, 2.39:1 aspect ratio, cinematic bokeh, cinematic lens flare"
  },
  VINTAGE_70S: {
    lens: "Panavision C-Series",
    aspectRatio: "2.35:1",
    characteristics: "Warm tones, slight film grain, soft edges",
    promptSuffix: "70s cinema aesthetic, vintage film stock, soft grain, warm color grading"
  },
  IMAX: {
    lens: "15/70mm Large Format",
    aspectRatio: "1.43:1",
    characteristics: "Ultra-high detail, expansive field of view, crisp textures",
    promptSuffix: "shot on IMAX 70mm, 15/70 format, ultra-high resolution, extreme detail, sharp textures"
  }
};

export const LIGHTING_SETUPS = {
  REMBRANDT: "Rembrandt lighting, 45-degree key light, dramatic triangle of light on cheek, moody shadows",
  NOIR: "High contrast Chiaroscuro lighting, deep blacks, sharp highlights, dramatic silhouettes",
  GOLDEN_HOUR: "Volumetric natural sunlight, long shadows, warm 3200k color temperature, hazy atmosphere",
  CYBERPUNK: "Bioluminescent neon lighting, teal and orange contrast, wet reflections, foggy environment"
};

export const COLOR_SCIENCE = {
  BLOCKBUSTER: "Teal and orange color grade, high dynamic range, deep saturated shadows",
  INDIE_FILM: "Muted color palette, desaturated greens, filmic contrast, natural skin tones",
  DREAM_SEQUENCE: "Soft pastel hues, ethereal glow, low contrast, diffused highlights"
};

/**
 * Orchestrates a master cinematic prompt based on professional presets
 */
export function composeCinematicPrompt(
  subject: string, 
  profile: keyof typeof CAMERA_PROFILES = "ANAMORPHIC",
  lighting: keyof typeof LIGHTING_SETUPS = "REMBRANDT",
  color: keyof typeof COLOR_SCIENCE = "BLOCKBUSTER"
): string {
  return `${subject}. ${CAMERA_PROFILES[profile].promptSuffix}. ${LIGHTING_SETUPS[lighting]}. ${COLOR_SCIENCE[color]}. Hyper-realistic, 8k resolution, raw photo quality, masterwork.`;
}
