import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>View Meetings</div>
  );
});

export const head: DocumentHead = {
  title: 'OJT Task',
};
