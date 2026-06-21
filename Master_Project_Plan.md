# AlphaScreen: Master Project Plan
## Vision
To democratize Hollywood-style filmmaking by providing an end-to-end AI orchestration platform that enables anyone to create high-quality, 2-hour consistent feature films at a fraction of the cost.

## 1. Core Architecture (The AI Studio Pipeline)
Based on the "Director-Centric" workflow, AlphaScreen will implement the following layers:

### A. Narrative Layer (The Screenwriter)
- **Goal:** Transform a concept into a 120-page structured screenplay.
- **Tech:** Long-context LLMs (Claude 3.5 / GPT-4o) + Scriptwriting Frameworks (Fountain format).
- **Innovation:** Automatic "Beat Sheet" extraction for shot-by-shot planning.

### B. Asset Layer (Character & World Locking)
- **Goal:** Create visual consistency across 2 hours.
- **Tech:** 
    - **Visual:** LoRA training modules, IP-Adapter FaceID, and ControlNet.
    - **Audio:** ElevenLabs API for Voice Cloning and consistent emotional delivery.
- **Innovation:** "Digital Actor" profiles that save all physical and vocal traits.

### C. Cinematography Layer (The Production)
- **Goal:** Generate high-fidelity video clips (4-10s) based on the storyboard.
- **Tech:** Kling AI, Runway Gen-3, Luma Dream Machine.
- **Innovation:** Multi-Agent Orchestration – An "AI Director" agent that ensures the "AI Cinematographer" follows the camera angles specified in the storyboard.

### D. Assembly Layer (The Editor & SFX)
- **Goal:** Stitch clips, sync audio, and apply cinematic grading.
- **Tech:** FFmpeg (automated assembly), Udio/Suno (Music), ElevenLabs (Foley/SFX).
- **Innovation:** "Smart Timeline" – An automated editing agent that matches the visual pacing to the emotional arc of the script.

## 2. Technical Roadmap
### Phase 1: Proof of Concept (Consistency Test)
- Build a script that generates 10 consistent shots of a single character in different environments.
- Verify "Character Lock" stability.

### Phase 2: The Orchestrator MVP
- Create a backend that connects the Screenwriter to the Cinematographer.
- Automate the "Storyboard -> Video Prompt" conversion.

### Phase 3: The "Director's Desk" UI
- A web interface where users can "Direct" the AI (e.g., "Make this shot more dramatic," "Change the lighting").

### Phase 4: Full Feature Render
- Scaling the pipeline to handle 1,500+ clips and automated post-production.

## 3. Consistency Strategies (The AlphaScreen Advantage)
- **Temporal Consistency:** Using video-to-video refinement to smooth out transitions.
- **Narrative Consistency:** A "Plot Vector DB" to ensure the AI remembers past events.
- **Visual Consistency:** Character-specific LoRAs generated on-the-fly for every project.
