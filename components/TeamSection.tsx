'use client';

import Image from 'next/image';

interface Member {
  name: string;
  role: string;
  image: string;
}

interface TeamSectionProps {
  title: string;
  members: Member[];
}

export default function TeamSection({ title, members }: TeamSectionProps) {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-8">{title}</h3>

      <div className="flex flex-wrap gap-6 md:gap-20">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
              <div className="relative w-full h-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h4 className="font-semibold text-red-800 text-center text-sm md:text-base">
              {member.name}
            </h4>
            <p className="text-gray-600 text-xs md:text-sm text-center">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
