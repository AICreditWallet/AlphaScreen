export interface CharacterProfile {
  id: string;
  name: string;
  role: string;
  physicalDescription: string;
  faceReferenceUrl?: string; // URL to the canonical face image
  loraTrigger?: string; // The specific keyword for the trained LoRA
  voiceId?: string; // ElevenLabs Voice ID
}

export interface Character {
  name: string;
  emotion: string;
  action: string;
}

export interface Shot {
  id: string;
  sceneNumber: number;
  shotNumber: number;
  location: string;
  timeOfDay: "Day" | "Night" | "Golden Hour" | "Interior" | "Exterior";
  cameraAngle: "Extreme Close-Up" | "Close-Up" | "Medium Shot" | "Wide Shot" | "Low Angle" | "High Angle" | "Tracking Shot";
  lens: "35mm" | "50mm" | "85mm Anamorphic";
  lighting: string;
  visualDescription: string;
  characters: Character[];
  dialogue?: {
    character: string;
    text: string;
  };
  prompt: string; // The final technical prompt for the Video AI
  continuityNotes?: string; // Narrative details to track across shots
}

export interface MovieProject {
  id: string;
  title: string;
  script: string;
  shots: Shot[];
}
