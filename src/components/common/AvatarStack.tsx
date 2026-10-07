import { AVATAR_COLORS } from "@/constants/ProgressData";
import type { Member } from "@/constants/ProjectData";

interface AvatarStackProps {
  members?: Member[]; // when given, shows initials or photos
  count?: number; // placeholder circles when no members are passed
  max?: number; // most circles shown before "+N"
  size?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AvatarStack({
  members,
  count = 4,
  max = 4,
  size = "w-7 h-7",
}: AvatarStackProps) {
  const total = members ? members.length : count;
  const visible = Math.min(total, max);
  const extra = total - visible;
  const base = `${size} rounded-full border-2 border-white -ml-2 first:ml-0`;

  return (
    <div className="flex items-center" aria-label={`${total} members`}>
      {Array.from({ length: visible }).map((_, i) => {
        const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
        const member = members?.[i];

        if (member?.avatarUrl) {
          return (
            <img
              key={member.id}
              src={member.avatarUrl}
              alt={member.name}
              className={`${base} object-cover`}
            />
          );
        }

        return (
          <div
            key={member?.id ?? i}
            title={member?.name}
            className={`${base} ${color} flex items-center justify-center text-[10px] font-semibold text-white`}
          >
            {member ? getInitials(member.name) : null}
          </div>
        );
      })}

      {extra > 0 && (
        <div
          className={`${base} flex items-center justify-center bg-gray-100 text-[10px] font-medium text-gray-600`}
        >
          +{extra}
        </div>
      )}
    </div>
  );
}