import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';


export const formStyle = `
table{
  border-collapse: separate;
  border-spacing: 15px 15px;
}
tr{
  padding-bottom: 1rem;
  width: 100%;
}
.col2{
  display: flex;
  flex: row;
  height: 2rem;
}
`;

export default component$(() => {
  useStyles$(formStyle);
  return (
    <>
      <div class="container-fluid p-0">
        <div class="d-flex justify-content-center m-4">
          <div class="card p-3 pt-5 pb-5 shadow bg-body rounded-2 d-flex align-items-center mb-4" style="width: 90vw;">
            <form class="px-3">
                <table class="mb-3" style="width: 80vw">
                  <tr>
                    <td>
                      <b>Judul</b>
                    </td>
                    <td class="col2">
                      <input type="text" name="title" class="form-control border-dark" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Tanggal</b>
                    </td>
                    <td class="col2">
                      <input type="date" name="date" class="form-control border-dark" />
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 15%;">
                      <b>Jam</b>
                    </td>
                    <td class="col2" style="width: 85%;">
                      <div class="container-fluid p-0 d-flex justify-content-center">
                        <input type="time" name="startTime" class="div form-control border-dark" />
                        <div class="mx-3">s/d</div>
                        <input type="time" name="endTime" class="div form-control border-dark" />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Deskripsi</b>
                    </td>
                    <td class="col2" style="height: 5rem;">
                      <textarea name="desc" style="resize: none;" class="form-control border-dark"></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>

                    </td>
                  </tr>
                </table>
                <div class="mt-4 d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary" style="width: 8rem; background-color: var(--bca);">Tambah</button>
                </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'OJT Task',
};
