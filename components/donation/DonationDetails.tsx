import Link from "next/link";
import { ArrowRight, CreditCard } from "lucide-react";
import { CopyButton } from "../CopyButton";

export default function DonationDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Opay Card */}
      <div className="bg-[#c7fce7] rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#00c57b] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">O</span>
          </div>
          <h2 className="font-semibold">Opay - (NIGERIA ONLY)</h2>
        </div>

        <div className="space-y-1 mb-4">
          <p className="text-sm">
            Account Number: <span className="font-semibold">6104226782</span>
          </p>
          <p className="text-sm">
            Account Name:{" "}
            <span className="font-semibold">Kerygma Foundation</span>
          </p>
        </div>

        <CopyButton text="Account Number: 6104226782, Account Name: Kerygma Foundation" />
      </div>

      {/* Moniepoint Card */}
      <div className="bg-[#dbe7ff] rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#3366ff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <h2 className="font-semibold">Moniepoint - (NIGERIA ONLY)</h2>
        </div>

        <div className="space-y-1 mb-4">
          <p className="text-sm">
            Account Number: <span className="font-semibold">8062756876</span>
          </p>
          <p className="text-sm">
            Account Name:{" "}
            <span className="font-semibold">Kerygma Foundation</span>
          </p>
        </div>

        <CopyButton text="Account Number: 8062756876, Account Name: Kerygma Foundation" />
      </div>

      {/* Cashapp Card */}
      <div className="bg-[#c7fce7] rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#00c57b] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">$</span>
          </div>
          <h2 className="font-semibold">Cashapp (USA ONLY)</h2>
        </div>

        <div className="space-y-1 mb-4">
          <p className="text-sm">
            $CashTag: <span className="font-semibold">$dabible</span>
          </p>
        </div>

        <Link
          href="#"
          className="flex items-center gap-2 text-sm mt-auto hover:underline"
        >
          Use Cashapp <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Debit Card */}
      <div className="bg-[#dbe7ff] rounded-xl p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#3366ff] rounded-full flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-semibold">Debit Card (WORLDWIDE)</h2>
        </div>

        <p className="text-sm mb-4">
          Depending on your country, you can use your credit or debit card to
          make donations.
        </p>

        <Link
          href="#"
          className="flex items-center gap-2 text-sm mt-auto hover:underline"
        >
          Use Debit Card <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
