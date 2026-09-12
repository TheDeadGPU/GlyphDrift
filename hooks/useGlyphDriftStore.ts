import { create } from 'zustand'

interface GlyphDriftState {
  particleDensity: number;
  particleVelocity: number;
  isDispersionEnabled: boolean;
  particleColor: string;
  setParticleDensity: (density: number) => void;
  setParticleVelocity: (velocity: number) => void;
  toggleDispersion: () => void;
  setParticleColor: (color: string) => void;
}

const useGlyphDriftStore = create<GlyphDriftState>((set) => ({
  particleDensity: 4000,
  particleVelocity: 50,
  isDispersionEnabled: true,
  particleColor: '#0FFF50',
  setParticleDensity: (density: number) => set({ particleDensity: density }),
  setParticleVelocity: (velocity: number) => set({ particleVelocity: velocity }),
  toggleDispersion: () => set((state: { isDispersionEnabled: boolean }) => ({ isDispersionEnabled: !state.isDispersionEnabled })),
  setParticleColor: (color: string) => set({ particleColor: color }),
}))

export default useGlyphDriftStore