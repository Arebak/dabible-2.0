import Image from "next/image";
interface StarTagProps {
  text?: string;
  variant?: "white" | "blue" | "rose" | "green"  ;
}
const StarTag: React.FC<StarTagProps> = ({ text, variant }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "white":
        return "start";
      case "blue":
        return "start";
      case "green":
        return "start";
      case "rose":
        return "start";
      default:
        return "start";
    }
  };

  const getVariantColors = () => {
    switch (variant) {
      case "white":
        return "bg-white text-[#023E8A]";
      case "blue":
        return "bg-[#023E8A] text-white";
      case "rose":
        return "bg-[#C8385E] text-white";
      case "green":
        return "bg-[#19832F] text-white";
      default:
        return "bg-[#023E8A] text-white";
    }
  };

  return (
    <div
      className={`inline-flex items-center ${getVariantColors()} px-3 py-1 rounded-full mb-4 md:mb-6 uppercase`}
    >
      <Image
        src={`/svg/${getVariantStyles()}.svg`}
        alt="star icon"
        width={16}
        height={16}
        className=" mr-1"
      />{" "}
      {text}
      <Image
        src={`/svg/${getVariantStyles()}.svg`}
        alt="star icon"
        width={16}
        height={16}
        className=" ml-1"
      />
    </div>
  );
};
export default StarTag;
