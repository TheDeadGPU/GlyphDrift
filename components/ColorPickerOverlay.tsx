import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerOverlayProps {
    className?: string;
    onColorSelected(color:string): void;
}

export default function ColorPickerOverlay(props : ColorPickerOverlayProps) {
    const [color, setColor] = useState("#aabbcc");
    return <div className={props.className}>
        <HexColorPicker color={color} onChange={(color) => props.onColorSelected(color)} />
    </div>
}