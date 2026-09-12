import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface DriftSwitchProps
{
    label?: string;
    onToggle?: (isOn: boolean) => void;
}

export default function DriftSwitch(props: DriftSwitchProps)
{
    return(
        <div className="flex justify-between">
            <Label>{props.label}</Label>
            <Switch onCheckedChange={props.onToggle} />
        </div>
    )
}