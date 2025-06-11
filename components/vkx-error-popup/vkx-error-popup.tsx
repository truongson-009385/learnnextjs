import React, { useCallback, useEffect, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
} from "@heroui/react";

import { useErrorLogger } from "@/src/contexts/ErrorLoggerContext";
import { ResponseErrorAPI } from "@/src/Interface/ResponseErrorAPI";

// Icon components - có thể thay thế bằng icon library khác nếu cần
const ErrorIcon = () => (
  <svg
    className="w-6 h-6 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 6.5c-.77.833.192 2.5 1.732 2.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default function VXKErrorPopup() {
  const logger = useErrorLogger();
  const [isOpen, setIsOpen] = React.useState(false);
  const [error, setError] = React.useState<ResponseErrorAPI | undefined>();
  const [copied, setCopied] = React.useState(false);
  const prevLogRef = useRef<ResponseErrorAPI | undefined>();

  useEffect(() => {
    const current = JSON.stringify(logger.log);
    const prev = JSON.stringify(prevLogRef.current);

    if (current !== prev) {
      prevLogRef.current = logger.log;
      setError(logger.log);
      setIsOpen(!!logger.log);
    }
  }, [logger.log]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setCopied(false);
  }, []);

  const handleCopyError = useCallback(async () => {
    if (!error) return;

    const errorDetails = {
      statusCode: error.statusCode,
      message: error.message,
      apiErrorMessage: error.apiErrorMessage,
      timestamp: new Date().toISOString(),
    };

    try {
      await navigator.clipboard.writeText(
        JSON.stringify(errorDetails, null, 2),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy error details:", err);
    }
  }, [error]);

  const getStatusCodeColor = (statusCode?: number) => {
    if (!statusCode) return "default";
    if (statusCode >= 500) return "danger";
    if (statusCode >= 400) return "warning";

    return "primary";
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      isOpen={isOpen}
      placement="center"
      size="lg"
      onClose={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row items-center gap-3 pb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20">
                <ErrorIcon />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-red-500">
                  Something went wrong
                </h3>
                <p className="text-sm text-gray-400 font-normal">
                  An error occurred while processing your request
                </p>
              </div>
            </ModalHeader>

            <ModalBody className="py-6">
              <div className="space-y-4">
                {/* Status Code - only in development */}
                {process.env.NODE_ENV === "development" &&
                  error?.statusCode && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-400 min-w-[80px]">
                        Status:
                      </span>
                      <Chip
                        color={getStatusCodeColor(error.statusCode)}
                        size="sm"
                        variant="flat"
                      >
                        {error.statusCode}
                      </Chip>
                    </div>
                  )}

                {/* Error Message */}
                {error?.message && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-400">
                      Error Message:
                    </span>
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                      <p className="text-sm text-red-400 leading-relaxed">
                        {error.message}
                      </p>
                    </div>
                  </div>
                )}

                {/* API Error Message - only in development */}
                {process.env.NODE_ENV === "development" &&
                  error?.apiErrorMessage && (
                    <>
                      <Divider className="my-4" />
                      <div className="space-y-2">
                        <span className="text-sm font-medium text-gray-400">
                          Dev Details:
                        </span>
                        <div className="p-3 rounded-lg bg-gray-500/5 border border-gray-500/10">
                          <p className="text-xs text-gray-300 font-mono leading-relaxed break-words">
                            {error.apiErrorMessage}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                {/* Development Tools */}
                {process.env.NODE_ENV === "development" && error && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">
                      Development Mode
                    </span>
                    <Button
                      className="text-xs"
                      color="default"
                      size="sm"
                      startContent={<CopyIcon />}
                      variant="flat"
                      onPress={handleCopyError}
                    >
                      {copied ? "Copied!" : "Copy Details"}
                    </Button>
                  </div>
                )}
              </div>
            </ModalBody>

            <ModalFooter className="pt-4">
              <div className="flex gap-2 w-full sm:w-auto sm:ml-auto">
                <Button
                  className="flex-1 sm:flex-none"
                  color="danger"
                  variant="solid"
                  onPress={handleClose}
                >
                  Dismiss
                </Button>
                {/* <Button
                  className="flex-1 sm:flex-none"
                  color="primary"
                  variant="solid"
                  onPress={handleClose}
                >
                  Try Again
                </Button> */}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
