import { component$, useStore, useStyles$, $, useContext, useClientEffect$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Swal from 'sweetalert2';
import { MeetingContext } from '~/root';
import meetingRepo from '../service/meetingRepo';


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
  const state = useStore({
    title: "",
    date: "",
    startTime:  "",
    endTime: "",
    desc: ""
  });

  const meetingState = useContext(MeetingContext)

  useClientEffect$(() => {      
    if(localStorage.getItem('meetings')){
      meetingState.items = [...JSON.parse(localStorage.getItem('meetings')).items]
      meetingState.nextId = JSON.parse(localStorage.getItem('meetings')).nextId
    }
  })
  
  const create = $(() => {
    meetingRepo.initMeeting()

    if(!state.title){
      Swal.fire({
        title: 'Error',
        text: 'Judul meeting harus diisi!',
        icon: 'error'
      })
      return
    }
    if(!state.date){
      Swal.fire({
        title: 'Error',
        text: 'Tanggal meeting harus diisi!',
        icon: 'error'
      })
      return
    }
    if(!state.startTime || !state.endTime){
      Swal.fire({
        title: 'Error',
        text: 'Rentan jam meeting harus diisi!',
        icon: 'error'
      })
      return
    }
    if(!state.desc){
      Swal.fire({
        title: 'Error',
        text: 'Deskripsi meeting harus diisi!',
        icon: 'error'
      })
      return
    }

    const newMeeting: Meeting = {
      id: meetingState.nextId,
      title: state.title,
      date: state.date,
      startTime: state.startTime,
      endTime: state.endTime,
      desc: state.desc,
      creator: JSON.parse(localStorage.getItem('currUserId'))
    }

    meetingState.items = [...JSON.parse(localStorage.getItem('meetings')).items]
    meetingState.nextId = JSON.parse(localStorage.getItem('meetings')).nextId
    meetingState.items.push(newMeeting)
    meetingState.nextId = meetingState.nextId+1
    localStorage.setItem('meetings',JSON.stringify(meetingState));

    Swal.fire({
      title: 'Success',
      text: 'Meeting berhasil ditambahkan!',
      icon: 'success'
    }).then((result) => {
      if (result.isConfirmed) {
        location.pathname = ('/view_meetings')
      }
    })
  })

  return (
    <>
      <div class="container-fluid p-0">
        <div class="d-flex justify-content-center m-4">
          <div class="card p-3 pt-5 pb-5 shadow bg-body rounded-2 d-flex align-items-center mb-4" style="width: 90vw;">
            <form class="px-3" method='post' onSubmit$={create} preventdefault:submit>
                <table class="mb-3" style="width: 80vw">
                  <tr>
                    <td>
                      <b>Judul</b>
                    </td>
                    <td class="col2">
                      <input type="text" name="title" class="form-control border-dark" value={state.title}
                      onInput$={(event) => {
                        const input = event.target as HTMLInputElement;
                        state.title = input.value;
                      }}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Tanggal</b>
                    </td>
                    <td class="col2">
                      <input type="date" name="date" class="form-control border-dark" value={state.date}
                      onInput$={(event) => {
                        const input = event.target as HTMLInputElement;
                        state.date = input.value;
                      }}/>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 15%;">
                      <b>Jam</b>
                    </td>
                    <td class="col2" style="width: 85%;">
                      <div class="container-fluid p-0 d-flex justify-content-center">
                        <input type="time" name="startTime" class="div form-control border-dark" value={state.startTime}
                        onInput$={(event) => {
                          const input = event.target as HTMLInputElement;
                          state.startTime = input.value;
                        }}/>
                        <div class="mx-3">s/d</div>
                        <input type="time" name="endTime" class="div form-control border-dark" value={state.endTime}
                        onInput$={(event) => {
                          const input = event.target as HTMLInputElement;
                          state.endTime = input.value;
                        }}/>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Deskripsi</b>
                    </td>
                    <td class="col2" style="height: 5rem;">
                      <textarea name="desc" style="resize: none;" class="form-control border-dark"
                      onInput$={(event) => {
                        const input = event.target as HTMLInputElement;
                        state.desc = input.value;
                      }}></textarea>
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
