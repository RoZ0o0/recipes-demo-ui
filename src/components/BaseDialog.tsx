import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { ReactNode } from "react";

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  width?: number | string;
}

const BaseDialog = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  width = 600,
}: BaseDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      disableRestoreFocus={true}
      maxWidth={maxWidth || false}
    >
      {title && <DialogTitle sx={{ alignSelf: "center" }}>{title}</DialogTitle>}
      <DialogContent sx={{ width }}>{children}</DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
