import { HandHeart } from "lucide-react";
import { Button } from "./ui/button";

const DonateButton = () => {
  return (
    <Button className="w-full cursor-pointer bg-[#023E8A] hover:bg-[#023E8A]/90 h-10 text-white text-sm md:text-sm upercase font-montserrat flex items-center justify-center">
      <HandHeart />
      <span> DONATE NOW</span>
    </Button>
  );
};
export default DonateButton;
