import { Button } from "@/components/ui/button";
import { GoogleIcon, GitHubIcon } from "@/features/auth/components/SocialIcons";

export function SocialAuthButtons({
  onGoogleClick,
  onGitHubClick,
}: {
  onGoogleClick: () => void;
  onGitHubClick: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onGoogleClick}
        className="gap-2 text-[13px] font-medium"
      >
        <GoogleIcon />
        Google
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onGitHubClick}
        className="gap-2 text-[13px] font-medium"
      >
        <GitHubIcon />
        GitHub
      </Button>
    </div>
  );
}
