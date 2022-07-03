import Modal from '$shared/Modal.svelte';
import outroAndDestroy from '$functions/outroAndDestroy';

export default function useModal(options, Component, props = {}) {
  let modalComponent = null;

  function show() {
    modalComponent = new Modal({
      props: {
        ...options,
        content: Component,
        contentProps: props,
      },
      target: document.body,
      intro: true,
    });

    modalComponent.$on('close', close);
  }

  function close() {
    outroAndDestroy(modalComponent);
    modalComponent = null;
  }

  return [show, close];
}
