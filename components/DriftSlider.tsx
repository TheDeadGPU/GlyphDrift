import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

interface DriftSliderProps {
    label: string;
    defaultValue?: number;
    minimumLabel?: string;
    maximumLabel?: string;
    maxValue?: number;
    onValueChange?: (value: number | readonly number[]) => void;
}

export default function DriftSlider(props: DriftSliderProps) {
    return (
        <div className="flex flex-col gap-y-4">
            <Label className="text-slate-200/90 text-sm">{props.label}</Label>
            <div className="flex items-center gap-x-1 text-xs text-slate-400">
                {props.minimumLabel}
                <Slider
                    defaultValue={[props.defaultValue ?? 50]}
                    max={props.maxValue ?? 100}
                    step={1}
                    onValueChange={(value) => props.onValueChange?.(value)}
                    className="mx-auto w-full max-w-xs"
                />
                {props.maximumLabel}
            </div>
        </div>
    )
}