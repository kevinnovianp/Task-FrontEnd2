import { component$, useStore, useStyles$, $, useContext, useClientEffect$, useWatch$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Swal from 'sweetalert2';
import { UserContext } from '~/root';
import userRepo from '../service/userRepo';
import { User } from '../user';

export const registerStyle = `
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
`

export default component$(() => {
  const userState = useContext(UserContext)

  useClientEffect$(() => {      
    if(localStorage.getItem('users')){
      userState.items = [...JSON.parse(localStorage.getItem('users')).items]
      userState.nextId = JSON.parse(localStorage.getItem('users')).nextId
    }
  })

  useStyles$(registerStyle);
    const state = useStore({
      username: "",
      password: "",
      confirmPassword: ""
    });

    const register = $(() => {
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
      if(state.confirmPassword==""){
        Swal.fire({
          title: 'Error',
          text: 'Konfirmasi password harus diisi!',
          icon: 'error'
        })
        return
      }
      if(state.confirmPassword!=state.password){
        Swal.fire({
          title: 'Error',
          text: 'Password dan Konfirmasi password harus sama!',
          icon: 'error'
        })
        return
      }

      const newUser: User = {
        id: userState.nextId,
        username: state.username,
        password: state.password
      };
      
      userState.items = [...JSON.parse(localStorage.getItem('users')).items]
      userState.nextId = JSON.parse(localStorage.getItem('users')).nextId
      userState.items.push(newUser)
      userState.nextId = userState.nextId+1
      localStorage.setItem('users',JSON.stringify(userState));

      Swal.fire({
        title: 'Success',
        text: 'Register Berhasil!',
        icon: 'success'
      }).then((result) => {
        if (result.isConfirmed) {
          location.pathname = ('/login')
        }
      })
    });
    
  return (
    <>
      <div class="container-fluid p-0">
        <div class="d-flex justify-content-center m-4">
          <div class="card p-3 pt-4 pb-4 shadow bg-body rounded-2 d-flex align-items-center mb-4" style="width: 90vw;">
            <form class="px-3" method='post' onSubmit$={register} preventdefault:submit>
              <h2 class="text-center">Register</h2>
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
                        class="form-control border-dark"/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Konfirmasi Password</b>
                    </td>
                    <td class="col2">
                      <input type="password" name="confirmPassword" id="confirmPassword" value={state.confirmPassword}
                        onInput$={(event) => {
                          const input = event.target as HTMLInputElement;
                          state.confirmPassword = input.value;
                        }}
                        class="form-control border-dark" />
                    </td>
                  </tr>
                </table>
                <div class="mt-4 d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary" style="width: 8rem; background-color: var(--bca);">Daftar</button>
                </div>
                <div>
                  <div class="text-center mt-3" style="font-size: 10pt">
                    Sudah punya akun? <a href="/login" style="font-weight:normal">Login</a>
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
