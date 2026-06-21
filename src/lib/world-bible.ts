/**
 * AlphaScreen World Bible Service
 * 
 * This service manages the "Single Source of Truth" for narrative and visual continuity.
 * It tracks character states, environmental changes, and plot-critical details
 * across the entire 2-hour timeline to prevent consistency breaks.
 */

export interface WorldState {
  timeOfDays: string; // Current narrative time
  weather: string;
  globalEvents: string[]; // e.g., ["Power outage in Sector 4", "Rain started"]
  characterStates: Record<string, CharacterState>;
}

export interface CharacterState {
  name: string;
  currentOutfit: string;
  physicalStatus: string[]; // e.g., ["Bleeding from left arm", "Glasses broken"]
  lastLocation: string;
  emotionalArc: string; // Track emotional progression
}

export class WorldBible {
  private state: WorldState;

  constructor() {
    this.state = {
      timeOfDays: "Morning",
      weather: "Clear",
      globalEvents: [],
      characterStates: {}
    };
  }

  /**
   * Updates the world state based on a finished scene or shot.
   */
  public updateState(update: Partial<WorldState>) {
    this.state = { ...this.state, ...update };
  }

  /**
   * Updates a specific character's state.
   */
  public updateCharacter(name: string, status: Partial<CharacterState>) {
    if (!this.state.characterStates[name]) {
      this.state.characterStates[name] = {
        name,
        currentOutfit: "Default",
        physicalStatus: [],
        lastLocation: "Unknown",
        emotionalArc: "Neutral"
      };
    }
    this.state.characterStates[name] = { ...this.state.characterStates[name], ...status };
  }

  /**
   * Generates a "Continuity Context" string for the AI Director.
   * This is injected into the prompt to ensure the LLM respects the current state.
   */
  public getContinuityContext(): string {
    let context = `Current World State: Time is ${this.state.timeOfDays}, Weather is ${this.state.weather}. `;
    
    if (this.state.globalEvents.length > 0) {
      context += `Ongoing Events: ${this.state.globalEvents.join(", ")}. `;
    }

    Object.values(this.state.characterStates).forEach(char => {
      context += `Character ${char.name} status: Outfit is ${char.currentOutfit}, Physicality: ${char.physicalStatus.join(", ") || "No injuries"}, Mood: ${char.emotionalArc}. `;
    });

    return context;
  }

  public getState(): WorldState {
    return this.state;
  }
}

export const worldBible = new WorldBible();
