import { orgMembers } from "@/constants/MembersData";
import { RolesView } from "./RolesView";


export default function RolesPage() {
  // TODO: fetch members on the server here and pass them down.
  return <RolesView orgMembers={orgMembers} />
}