import { useState } from 'react';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import DriftSlider from './DriftSlider';
import DriftSwitch from './DriftSwitch';
import ColorPickerOverlay from './ColorPickerOverlay';
import useGlyphDriftStore from '../hooks/useGlyphDriftStore'

interface DriftControlCenterProps {
    onResetView: () => void;
}

export default function DriftControlCenter({ onResetView }: DriftControlCenterProps) {
    const [isActive, setIsActive] = useState(true);
    //const particleDensity = useGlyphDriftStore((state) => state.particleDensity);
    const {
        particleDensity,
        particleVelocity,
        isDispersionEnabled,
        particleColor,
        setParticleDensity,
        setParticleVelocity,
        toggleDispersion,
        setParticleColor
    } = useGlyphDriftStore();

    return (
        <div className="absolute right-4 top-4 z-10">
            <div
                className={`overflow-hidden rounded-[18px] border border-white/10 bg-slate-950/80 shadow-[0_0_30px_rgba(15,23,42,0.65)] backdrop-blur-md transition-all duration-300 ${
                    isActive ? 'w-[430px] opacity-100' : 'w-12 opacity-0 pointer-events-none'
                }`}
            >
                <div className="flex items-center justify-between px-5 pt-4 pb-3">
                    <h2 className="text-[2.05rem] font-semibold leading-none tracking-[-0.06em] text-slate-100">
                        GlyphDrift Control Center
                    </h2>
                    <button
                        type="button"
                        aria-label={isActive ? 'Close drift controls' : 'Open drift controls'}
                        aria-pressed={isActive}
                        onClick={() => setIsActive((active) => !active)}
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-slate-900/70 text-lg text-slate-100 shadow-inner shadow-slate-900 transition hover:border-emerald-300/70 hover:text-emerald-200"
                    >
                        <span aria-hidden="true">⚙</span>
                    </button>
                </div>

                <div className="space-y-5 px-5 pb-5 pt-1">
                    <div className="border-b border-white/10 pb-3">
                        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-slate-400/90">
                            System Parameters
                        </p>
                    </div>

                    <div className="space-y-5">
                        <DriftSlider label='Particle Density' minimumLabel='0%' maximumLabel='100%' defaultValue={particleDensity} maxValue={5000} onValueChange={(val) => setParticleDensity(val as number)} />
                        <DriftSwitch label='Dispersion Toggle' onToggle={toggleDispersion} />
                        <div>
                            <Label className="text-slate-200/90 text-sm">Particle Color</Label>
                            <ColorPickerOverlay onColorSelected={setParticleColor} />
                        </div>
                        
                    </div>

                    <button
                        type="button"
                        onClick={onResetView}
                        className="mt-1 flex w-full items-center justify-start rounded-md border border-white/10 bg-slate-900/70 px-3 py-2 text-left text-[0.92rem] text-slate-200 transition hover:border-emerald-300/50 hover:text-white"
                    >
                        Reset View Button
                    </button>
                </div>
            </div>

            {!isActive && (
                <button
                    type="button"
                    aria-label="Open drift controls"
                    aria-pressed={isActive}
                    onClick={() => setIsActive(true)}
                    className="absolute top-2 right-2 mt-2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-slate-900/70 text-xl text-white shadow-lg backdrop-blur transition duration-200 hover:scale-105 hover:border-emerald-300/70 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                    <span aria-hidden="true">⚙</span>
                </button>
            )}
        </div>
    );
}