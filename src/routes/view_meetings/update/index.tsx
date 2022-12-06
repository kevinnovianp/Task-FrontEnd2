import { component$, useClientEffect$, useContext, useStore, useStyles$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Swal from 'sweetalert2';
import { MeetingContext } from '~/root';

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
`

export default component$(() => {
    useStyles$(formStyle)

    const meetingState = useContext(MeetingContext)

    const state = useStore({
        meetings: [],
        id: -1,
        title: "",
        date: "",
        startTime:  "",
        endTime: "",
        desc: ""
    })

    useClientEffect$(() => {
        if(localStorage.getItem('meetings')){
            meetingState.items = [...JSON.parse(localStorage.getItem('meetings')).items]
            meetingState.nextId = JSON.parse(localStorage.getItem('meetings')).nextId
            state.meetings = meetingState.items
        }
    })

    useClientEffect$(() => {
        if(localStorage.getItem('updateMeetingId')){
            state.id = JSON.parse(localStorage.getItem('updateMeetingId'))
            const indexOfObject = meetingState.items.findIndex((meeting) => {
                return meeting.id == state.id;
            })
            state.title = state.meetings[indexOfObject].title
            state.date = state.meetings[indexOfObject].date
            state.startTime = state.meetings[indexOfObject].startTime
            state.endTime = state.meetings[indexOfObject].endTime
            state.desc = state.meetings[indexOfObject].desc
        }
    })

    const update = $(() => {
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

        const currMeeting: Meeting = {
            id: state.id,
            title: state.title,
            date: state.date,
            startTime: state.startTime,
            endTime: state.endTime,
            desc: state.desc,
            creator: JSON.parse(localStorage.getItem('currUserId'))
        }

        const indexOfObject = meetingState.items.findIndex((meeting) => {
            return meeting.id == state.id;
        })
        meetingState.items = [...JSON.parse(localStorage.getItem('meetings')).items]
        meetingState.nextId = JSON.parse(localStorage.getItem('meetings')).nextId
        meetingState.items.splice(indexOfObject,1, currMeeting)
        localStorage.setItem('meetings',JSON.stringify(meetingState));

        Swal.fire({
            title: 'Success',
            text: 'Meeting berhasil diedit!',
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
                <div class="card p-3 pt-4 pb-4 shadow bg-body rounded-2 d-flex align-items-center mb-4" style="width: 90vw;">
                    <form class="px-3" method='post' onSubmit$={update} preventdefault:submit>
                        <h2 class="text-center">Update {state.title}</h2>
                        <table class="mb-3" style="width: 80vw">
                            <tr>
                                <td>
                                    <b>Id</b>
                                </td>
                                <td class="col2">
                                    <input type="text" name="title" class="form-control border-dark" disabled value={state.id}/>
                                </td>
                            </tr>
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
                            <textarea name="desc" style="resize: none;" class="form-control border-dark" value={state.desc}
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
                        <div class="mt-2 d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary mx-2" style="width: 8rem; background-color: var(--bca);">Update</button>
                        <button class="btn btn-danger mx-2" style="width: 8rem;" onClick$={() => {location.pathname=('view_meetings')}}>Kembali</button>
                        </div>
                        
                    </form>
                </div>
                </div>
            </div>
        </>
    )
})

export const head: DocumentHead = {
    title: 'OJT Task',
};
