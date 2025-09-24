interface DonationReceiptProps {
  name?: string;
  description?: string;
  amount?: string;
  date?: string;
}

export default function DonationReceipt({
  name,
  description,
  amount,
  date,
}: DonationReceiptProps) {
  return (
    <div className="max-w-[500px] font-mada px-7 py-5 rounded-lg border border-[#CCCCCC] bg-[#F8F7F7] ">
      <div className="rounded-lg bg-white border border-[#CCCCCC] ">
        <div className="p-6 space-y-6">
          <h4 className="font-bold mb-[40px] text-2xl blur-sm">{name}</h4>

          <div className="space-y-4">
            <div className="flex">
              <span className="font-medium">Description:</span>
              <span className="ml-2 font-bold">{description}</span>
            </div>

            <div className="flex">
              <span className="font-medium">Amount Donated:</span>
              <span className="ml-2 text-cyan-500 font-bold">{amount}</span>
            </div>

            <div className="flex">
              <span className="font-medium">Date of Donation:</span>
              <span className="ml-2 font-bold">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
