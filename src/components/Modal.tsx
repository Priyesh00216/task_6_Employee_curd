import type { ReactNode } from "react";

type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({ title, isOpen, onClose, children}: ModalProps) => {
    if(!isOpen) return null;

    return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;