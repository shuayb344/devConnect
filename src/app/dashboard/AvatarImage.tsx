import { getCurrentUser } from "@/lib/dal";
import Image from "next/image";

export default async function AvatarImage() {
  const user = await getCurrentUser();

  if (!user?.image) {
    return null;
  }

  return (
    <Image
      priority
      src={user.image}
      alt="Your avatar"
      width={80}
      height={80}
      className="rounded-full"
    />
  );
}
