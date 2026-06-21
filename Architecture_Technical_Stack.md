# AlphaScreen: Technical Architecture & Stack

## 1. The "Cinema-Grade" AI Stack
To achieve Hollywood realism, we use a multi-model "Orchestration" approach rather than a single end-to-end model.

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **LLM Orchestrator** | Claude 3.5 Sonnet / GPT-4o | Writing scripts, generating shot lists, and managing "World Bible" consistency. |
| **Image Keyframing** | FLUX.1 [pro] / Midjourney v6.1 | Generating the ultra-high-res "Master Plate" for each shot. |
| **Video Motion** | Kling AI (Pro) / Runway Gen-3 | Animating characters and camera movement. |
| **Character Locking** | LoRA (Flux/SDXL) + IP-Adapter FaceID | Ensuring the actor's face and features never change. |
| **Face & Performance** | LivePortrait / MimicMotion | Capturing micro-expressions and organic human movement. |
| **Audio & Voice** | ElevenLabs (Speech-to-Speech) | High-fidelity voice cloning with emotional nuance. |
| **Upscaling/Grading** | Topaz Video AI / Magnific / FFmpeg | 4K refinement and uniform color grading. |

## 2. Platform Infrastructure (Cloud)
- **Backend:** Node.js (Next.js) or Python (FastAPI) to manage complex long-running generation jobs.
- **Database:** Supabase (PostgreSQL) for user data + Vector DB (Pinecone) for the "World Bible" (RAG).
- **GPU Orchestration:** Fal.ai / Replicate / Modal.com. These allow us to scale "Serverless GPUs" only when a user is rendering, keeping costs low.
- **Storage:** AWS S3 or Cloudflare R2 for massive video asset storage.

## 3. The "Director's Desk" API Workflow
1. **Script-to-JSON:** LLM converts story to a structured list of scenes/shots.
2. **Asset Assignment:** System checks DB for existing "Actor" LoRAs or creates new ones.
3. **Async Rendering:** A task queue (BullMQ/Redis) manages the generation of 1,500+ clips in parallel.
4. **Assembly Script:** FFmpeg automatically merges clips with the generated score and dialogue.
