# Phase 1: Proof of Concept (Consistency & Realism)

## Objective
To generate 5-10 distinct cinematic shots of the same character ("Actor A") in varying environments and lighting conditions, maintaining 100% visual consistency and Hollywood-level realism.

## Step 1: Character Genesis
1. Define a "Digital Actor" using a detailed physical prompt.
2. Generate 20 high-res portrait variations using FLUX.1.
3. Select the "Canonical Face" and train a **LoRA** (Low-Rank Adaptation) specifically for this actor.

## Step 2: The Character Reference Sheet (The "Identity Lock")
- Create a set of reference images: Front, Profile, 3/4 View, and Emotional states (Happy, Angry, Crying).
- Store these as embeddings in our Asset Layer.

## Step 3: Test Shots (The "Cinematography Test")
We will generate the following shots to test the pipeline:
1. **Shot 1:** Close-up, Dramatic "Rembrandt" lighting, Actor in a spaceship cockpit.
2. **Shot 2:** Wide shot, Golden Hour lighting, Actor walking through a neon-lit street.
3. **Shot 3:** Medium shot, Rain effect, Actor looking into a mirror.

## Step 4: Verification Criteria (QA)
- Does the eye color change? (FAIL if yes)
- Does the hair texture remain consistent? (FAIL if no)
- Does the skin look like real skin (pores/texture) or "plastic" AI?
- Does the lighting on the face match the environment?

## Step 5: Video Animation
- Use the best static frame from Step 3 as the "Initial Frame" for **Kling AI**.
- Apply a "Slow Tracking" camera motion.
- Verify that the face does not "warp" during movement.
