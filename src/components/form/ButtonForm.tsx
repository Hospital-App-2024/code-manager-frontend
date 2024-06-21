import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

interface Props extends React.ComponentProps<typeof Button> {
  isDisabled: boolean;
  title: string;
}

export const ButtonForm = (props: Props) => {
  const { isDisabled, title, ...rest } = props;

  return (
    <Button className="w-full" disabled={isDisabled} {...rest}>
      {isDisabled ? <IoReload className="animate-spin" /> : title}
    </Button>
  );
};
