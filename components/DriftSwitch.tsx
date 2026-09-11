import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface DriftSwitchProps
{
    label?: string;
}

export default function DriftSwitch(props: DriftSwitchProps)
{
    return(
        <div className="flex justify-between">
            <Label>{props.label}</Label>
            <Switch/>
        </div>
    )
}