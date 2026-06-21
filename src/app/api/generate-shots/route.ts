import { NextResponse } from "next/server";
import { worldBible } from "@/lib/world-bible";

const SYSTEM_PROMPT = `
You are a Hollywood Film Director and Cinematographer. 
Your task is to take a raw script and break it down into a highly detailed, technical Shot List in JSON format.
Each shot must be cinematic, considering lighting, camera lenses, and character consistency.

### CONTINUITY RULES:
You must respect the "World Bible" state provided in the input. 
Ensure character clothing, physical injuries, and environmental states (like rain or wreckage) are consistent across all shots.

For every shot, you must provide:
- cameraAngle: Use cinematic terms (e.g., Anamorphic Close-up, Wide Tracking Shot).
- lighting: Describe the light source and mood (e.g., Rembrandt lighting, Volumetric fog).
- visualDescription: A detailed 2-sentence description of the visual frame.
- prompt: A technical prompt optimized for high-end Video AI (Kling/Runway).
- continuityNotes: Any changes to character status or environment that must be tracked for future shots.

Output ONLY valid JSON matching the provided schema.
`;

export async function POST(req: Request) {
  try {
    const { script } = await req.json();

    if (!script) {
      return NextResponse.json({ error: "Script is required" }, { status: 400 });
    }

    const continuityContext = worldBible.getContinuityContext();
    console.log("Generating shots with continuity context:", continuityContext);

    // In a production environment, we would call OpenAI/Anthropic here, passing continuityContext.
    
    const mockShots = [
      {
        id: "1",
        sceneNumber: 1,
        shotNumber: 1,
        location: "Cyberpunk Street",
        timeOfDay: "Night",
        cameraAngle: "Wide Shot",
        lens: "85mm Anamorphic",
        lighting: "Neon blue and pink backlight, wet pavement reflections",
        visualDescription: "A lone figure stands in the middle of a rain-slicked street, neon signs flickering in the background.",
        characters: [{ name: "Hero", emotion: "Determined", action: "Walking slowly" }],
        prompt: "Cinematic wide shot, anamorphic lens, 85mm, cyberpunk city at night, heavy rain, neon blue and pink lighting, hyper-realistic, 8k, detailed textures.",
        continuityNotes: "Hero starts with a clean suit. Environment is raining."
      },
      {
        id: "2",
        sceneNumber: 1,
        shotNumber: 2,
        location: "Cyberpunk Street",
        timeOfDay: "Night",
        cameraAngle: "Medium Close-up",
        lens: "50mm",
        lighting: "Side-lit by a flashing pink neon sign, heavy rain drops on skin",
        visualDescription: "Close-up on Hero's face. Rain pours down his forehead. He looks up at a massive hologram.",
        characters: [{ name: "Hero", emotion: "Awe", action: "Staring upwards" }],
        prompt: "Cinematic medium close-up, 50mm, face of Hero drenched in rain, pink neon light flickering on skin, hyper-detailed skin pores, realistic rain physics, 8k.",
        continuityNotes: "Hero's suit is now visibly wet. Skin is drenched."
      }
    ];

    return NextResponse.json({ shots: mockShots });
  } catch (error) {
    console.error("Shot Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate shots" }, { status: 500 });
  }
}
