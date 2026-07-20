import Image from "next/image";
import { Badge } from "../ui/badge";
import ShareArticleButton from "../misc/ShareArticleButton";

type AuthorDetailsCardProps = {
  displayName: string;
  role: string;
  publishedAt: string;
  tags: string[];
  displayPictureUrl: string;
};

function AuthorDetailsCard({
  displayName,
  role,
  publishedAt,
  tags,
  displayPictureUrl,
}: AuthorDetailsCardProps) {
  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(publishedAt))
    : "";

  return (
    <div className="m-3 flex flex-col items-start gap-3">
      <div className="flex w-full items-start justify-between gap-3">
        <div className="flex gap-3">
          {displayPictureUrl ? (
            <Image
              src={displayPictureUrl}
              alt={displayName}
              width={48}
              height={48}
              className="h-18 w-18 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-medium text-foreground">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-lg font-mono font-bold leading-none">{displayName}</span>
            {role && (
              <span className="font-mono text-sm text-muted-foreground">{role}</span>
            )}
            <span className="font-mono text-sm text-muted-foreground">
              Published: {formattedDate}
            </span>
          </div>
        </div>

        <ShareArticleButton size="sm" className="shrink-0 hover:bg-primary-foreground/10 rounded-none p-4 my-auto" />
      </div>
      {tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="rounded-full bg-accent text-muted text-md p-3 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorDetailsCard;