import { orgMembers } from "@/constants/MembersData";
import { MembersView } from "./MembersView";

export default function MembersPage() {
  return <MembersView initialMembers={orgMembers} />;
}
