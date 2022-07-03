import { check_outros, group_outros, transition_out } from 'svelte/internal';

export default function outroAndDestroy(instance) {
  if (instance.$$.fragment && instance.$$.fragment.o) {
    group_outros();
    transition_out(instance.$$.fragment, 0, 0, () => {
      instance.$destroy();
    });
    check_outros();
  } else {
    instance.$destroy();
  }
}
