"use client";
import React, { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export interface ModalProps {
  children?: React.ReactNode;
  title?: string;
  content?: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void;
  render?: (props: unknown) => React.ReactNode;
}

export interface ModalMethods {
  open: (injectProps?: ModalProps) => void;
  close: () => void;
}

const MyDialog = forwardRef((props: ModalProps, ref: Ref<ModalMethods>) => {
  const [open, setOpen] = useState(false);
  const [injectProps, setInjectProps] = useState<ModalProps>({});

  const { children, title, content, showCancel = true, showConfirm = true, onConfirm, render, ...otherProps } = { ...props, ...injectProps };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    // 如果存在注入方法，则执行注入方法

    try {
      if (onConfirm) {
        await onConfirm();
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setInjectProps({});
  };

  useImperativeHandle(ref, () => ({
    open: (op?: ModalProps) => {
      setOpen(true);
      if (op) {
        setInjectProps(op);
      }
    },
    close: () => {
      handleCancel();
    },
  }));

  return (
    <Dialog open={open} as="div" className="relative z-100 focus:outline-none" onClose={handleClose}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel transition className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              {title}
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-white/50">{content}</p>

            <div className="flex mt-4 gap-4">
              <button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              {showCancel && <button onClick={handleCancel}>Cancel</button>}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
});

MyDialog.displayName = "MyDialog";

export default MyDialog;
