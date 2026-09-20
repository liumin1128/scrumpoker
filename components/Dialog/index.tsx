"use client";

import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ReactNode,
} from "react";
import { UserRoundMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ModalProps {
  children?: ReactNode;
  title?: string;
  content?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void | Promise<void>;
  render?: (props: unknown) => ReactNode;
}

export interface ModalMethods {
  open: (injectProps?: ModalProps) => void;
  close: () => void;
}

const MyDialog = forwardRef<ModalMethods, ModalProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [injectProps, setInjectProps] = useState<ModalProps>({});
  const {
    children,
    title,
    content,
    showCancel = true,
    showConfirm = true,
    onConfirm,
    render,
  } = { ...props, ...injectProps };

  useImperativeHandle(ref, () => ({
    open: (options) => {
      setInjectProps(options || {});
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  const handleConfirm = async () => {
    try {
      await onConfirm?.();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[calc(100vw-2rem)] rounded-2xl bg-card p-6 sm:max-w-[420px] sm:p-7">
        <span className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <UserRoundMinus className="size-5" />
        </span>
        <DialogHeader className="space-y-3 text-left">
          <DialogTitle className="text-xl tracking-tight">{title}</DialogTitle>
          <DialogDescription className="break-words text-sm leading-6">
            {content}
          </DialogDescription>
        </DialogHeader>
        {children}
        {render?.(injectProps)}
        <DialogFooter className="mt-3 gap-2 sm:gap-0">
          {showCancel && (
            <Button variant="outline" onClick={() => setOpen(false)} autoFocus>
              Cancel
            </Button>
          )}
          {showConfirm && (
            <Button variant="destructive" onClick={handleConfirm}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

MyDialog.displayName = "MyDialog";

export default MyDialog;
