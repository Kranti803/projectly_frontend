import { AVATAR_COLORS } from "@/constants/ProgressData";

export function AvatarStack({
  count = 4,
  size = "w-7 h-7",
}: {
  count?: number;
  size?: string;
}) {
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${size} rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} border-2 border-white -ml-2 first:ml-0`}
        />
      ))}
    </div>
  );
}
