import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

export const ConversationHero = ({
  name = "Member",
  image,
}: ConversationHeroProps) => {
  const avaterFallback = name?.charAt(0).toUpperCase();

  return (
    <div className="mx-5 mb-4 mt-[88px]">
      <div className="mb-2 flex items-center gap-x-1">
        <Avatar className="size-14">
          <AvatarImage src={image} />

          <AvatarFallback>{avaterFallback}</AvatarFallback>
        </Avatar>

        <p className="text-2xl font-bold"> {name}</p>
      </div>

      <p className="mb-4 font-normal text-slate-800">
        This conversation is just between you and <strong> {name} </strong>
      </p>
    </div>
  );
};
