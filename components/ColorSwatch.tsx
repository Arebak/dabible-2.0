import { Check } from "lucide-react";

type ColorSwatchProps = {
  name: string;
  hex: string;
  selected: boolean;
  onClick: (name: string, selected: boolean) => void;
};

export default function ColorSwatch({
  name,
  hex,
  selected,
  onClick,
}: ColorSwatchProps) {
  return (
    <div
      className="w-8 h-8 rounded-full border cursor-pointer relative"
      style={{ background: hex }}
      onClick={() => onClick(name, !selected)}
    >
      {selected && (
        <Check
          size={16}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white ${
            name === "white" ? "!text-black" : ""
          }`}
        />
      )}
    </div>
  );
}
