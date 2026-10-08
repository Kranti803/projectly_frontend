import { orgMembers } from "@/constants/MembersData";
import { projects } from "@/constants/ProjectData";
import { teams } from "@/constants/TeamsData";
import { TeamsView } from "./TeamsView";


export default function TeamsPage() {
  // TODO: fetch teams, members and projects on the server here and pass them down.
  return <TeamsView initialTeams={teams} orgMembers={orgMembers} projects={projects} />
}