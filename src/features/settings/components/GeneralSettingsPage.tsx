import { organization } from "@/constants/OrganizationData";
import { DangerZone } from "./DangerZone";
import { GeneralSettingsForm } from "./GeneralSettingsForm";


export default function GeneralSettingsPage() {
  // TODO: fetch the current organization on the server here.
  return (
    <div className="space-y-6">
      <GeneralSettingsForm organization={organization} />
      <DangerZone organizationName={organization.name} />
    </div>
  )
}