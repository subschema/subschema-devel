import MT from './ModalTemplate.scssm';

export default {
    namespace: 'modal',
    backdrop: "modal-backdrop fade in",
    dialog: `modal-dialog ${MT.modalDialog}`,
    content: "modal-content",
    close: `close ${MT.btnClose}`,
    body: 'modal-body clearfix',
    header: 'modal-header',
    footer: "modal-footer",
    overlay: ''
};
