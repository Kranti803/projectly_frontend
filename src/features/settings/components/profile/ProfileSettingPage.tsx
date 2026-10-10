import { currentUserProfile } from "@/constants/AccountData";
import { ProfileForm } from "./ProfileForm";


export default function ProfileSettingsPage() {
  // TODO: fetch the logged-in user's profile on the server here.
  return <ProfileForm user={currentUserProfile} />
}