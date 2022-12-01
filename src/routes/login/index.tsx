import { component$, useStore, useStyles$, $, useContext, useClientEffect$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Swal from 'sweetalert2';
import { UserContext } from '~/root';
import userRepo from '../service/userRepo';

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
    const userState = useContext(UserContext)

    useClientEffect$(() => {      
      if(localStorage.getItem('users')){
        userState.items = [...JSON.parse(localStorage.getItem('users')).items]
        userState.nextId = JSON.parse(localStorage.getItem('users')).nextId
      }
    })

    useStyles$(loginStyle);
    const state = useStore({username: "", password: ""});

    const login = $(() => {
      userRepo.initUser()

      if(state.username==""){
        Swal.fire({
          title: 'Error',
          text: 'Username harus diisi!',
          icon: 'error'
        })
        return
      }
      if(state.password==""){
        Swal.fire({
          title: 'Error',
          text: 'Password harus diisi!',
          icon: 'error'
        })
        return
      }

      const credential = userState.items.find((item) => {
        if(item.username === state.username && item.password === state.password){
          localStorage.setItem('currUserId',JSON.stringify(item.id));
          return true
        }
      })

      if (!credential) {
        Swal.fire({
          title: 'Error',
          text: 'Invalid Credential!',
          icon: 'error'
        });
      }else{
        Swal.fire({
          title: 'Success',
          text: 'Login Berhasil!',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            location.pathname = ("/view_meetings");
          }
        });
      }
    });

    return (
      <>
        <div class="container-fluid p-0">
          <div class="d-flex justify-content-center m-4">
            <div class="card p-3 pt-4 pb-4 shadow bg-body rounded-2 d-flex align-items-center mb-4" style="width: 90vw;">
              <form class="px-3" method='post' onSubmit$={login} preventdefault:submit>
                  <h2 class="text-center">Login</h2>
                  <table class="mb-3" style="width: 80vw">
                    <tr>
                      <td>
                          <b>Username</b>
                      </td>
                      <td class="col2">
                          <input type="text" name="username" id="username" value={state.username}
                            onInput$={(event) => {
                              const input = event.target as HTMLInputElement;
                              state.username = input.value;
                            }}
                            class="form-control border-dark" />
                      </td>
                    </tr>
                    <tr>
                      <td>
                          <b>Password</b>
                      </td>
                      <td class="col2">
                          <input type="password" name="password" id="password" value={state.password}
                            onInput$={(event) => {
                              const input = event.target as HTMLInputElement;
                              state.password = input.value;
                            }}
                            class="form-control border-dark" />
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
