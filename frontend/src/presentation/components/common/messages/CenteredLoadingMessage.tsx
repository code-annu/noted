interface CenteredLoadingMessageProps {
  message?: string | null;
}

export const CenteredLoadingMessage: React.FC<CenteredLoadingMessageProps> = ({
  message,
}) => {
  const loadingMessage = message || "Loading...";
  return (
    <div className="flex justify-center items-center h-32">
      <p className="text-gray-600 text-lg">{loadingMessage}</p>
    </div>
  );
};
