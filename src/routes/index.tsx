import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <script>
        window.location.replace('/login');
    </script>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'OJT Task',
};
