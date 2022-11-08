import type {ModalContext} from "@/shared/types/modal-context";

export const useModalContext = function (): [ModalContext, (context: ModalContext) => void] {
    const modalContext: ModalContext = {
        show: () => console.log(''),
        hide: () => console.log(''),
        modalRef: null
    };

    const modalContextAssigner = (context: ModalContext) => {
        modalContext.show = context.show;
        modalContext.hide = context.hide;
        modalContext.modalRef = context.modalRef;
    }

    return [modalContext, modalContextAssigner]
}
