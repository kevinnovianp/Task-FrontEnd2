import { component$, useStyles$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
// import Swal from 'sweetalert2';

export const loginStyle = `
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
    useStyles$(loginStyle);

    return (
      <>
        <div class="container-fluid p-0">
          <div class="d-flex justify-content-center m-4">
            <div class="card p-3 pt-4 pb-4 shadow bg-body rounded-2 d-flex align-items-center mb-4" style="width: 90vw;">
              <form class="px-3" action="/new_meeting" method="post">
                  <h2 class="text-center">Login</h2>
                  <table class="mb-3" style="width: 80vw">
                      <tr>
                      <td>
                          <b>Username</b>
                      </td>
                      <td class="col2">
                          <input type="text" name="username" class="form-control border-dark" />
                      </td>
                      </tr>
                      <tr>
                      <td>
                          <b>Password</b>
                      </td>
                      <td class="col2">
                          <input type="password" name="password" class="form-control border-dark" />
                      </td>
                      </tr>
                      <tr>
                      <td>

                      </td>
                      </tr>
                  </table>
                  <div class="mt-4 d-flex justify-content-center">
                      <button type="submit" class="btn btn-primary" style="width: 8rem; background-color: var(--bca);">Masuk</button>
                  </div>
                  <div>
                      <div class="text-center mt-3" style="font-size: 10pt">
                      Tidak punya akun? <a href="/register" style="font-weight:normal">Register</a>
                      </div>
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
