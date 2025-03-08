import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

interface LocationErrorAlertProps {
  title: string;
  description: string;
  btnTitle: string;
  onClick?: () => void;
  Icon?: React.ReactNode;
}

const ErrorAlert = ({
  title,
  description,
  btnTitle,
  onClick,
  Icon,
}: LocationErrorAlertProps) => {
  return (
    <Alert variant="destructive" className="flex items-center gap-3">
      <AlertTriangle className="h-4 w-4" />
      <div className="flex-1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{description}</p>
        </AlertDescription>
      </div>
      <Button
        onClick={onClick}
        variant="outline"
        className="w-fit flex items-center gap-2"
      >
        {Icon}
        {btnTitle}
      </Button>
    </Alert>
  );
};
export default ErrorAlert;
