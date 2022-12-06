import { component$, useClientEffect$, useContext, useStore, useWatch$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Swal from 'sweetalert2';
import { MeetingContext } from '~/root';
import meetingRepo from '../service/meetingRepo';

export default component$(() => {
  const meetingState = useContext(MeetingContext)

  useClientEffect$(() => {
    if(localStorage.getItem('meetings')){
      meetingState.items = [...JSON.parse(localStorage.getItem('meetings')).items]
      meetingState.nextId = JSON.parse(localStorage.getItem('meetings')).nextId
    }
  })

  const state = useStore({
    currUserId: -1,
    meetings: [],
    userMeetings: [],
    length: 0,
    selectedSort: "oldest",
    query: ""
  })

  useWatch$(({track}) => {
    const tempMeeting = track(() => meetingState.items)
    state.meetings = tempMeeting
    state.userMeetings = state.meetings.filter(m => m.creator == state.currUserId)
    state.length = state.userMeetings.length
  })

  const initMeeting = $(()=>{
    if(state.currUserId==-1) state.currUserId = JSON.parse(localStorage.getItem('currUserId'))
    meetingRepo.initMeeting()
  });

  const sorting = $((key: string) => {
    state.selectedSort=key
    switch(key){
      case "newest":{
        state.userMeetings.sort((a, b) => (a.id > b.id) ? -1 : 1);
        break;
      }
      case "oldest":{
        state.userMeetings.sort((a, b) => (a.id < b.id) ? -1 : 1);
        break;
      }
      case "title":{
        state.userMeetings.sort((a, b) => (a.title < b.title) ? -1 : 1);
        break;
      }
      case "date":{
        state.userMeetings.sort((a, b) => (a.date < b.date) ? -1 : 1);
        break;
      }
    }
  })

  const searchMeeting = $((key: string) => {
    state.query = key
    if(key=="") return
    else{
      state.userMeetings.items.filter((m => m.id.toString().toLowerCase().indexOf(key.toLowerCase()) != -1
      || m.title.toLowerCase().indexOf(key.toLowerCase()) != -1) && m.creator == state.currUserId)
    }
    sorting(state.selectedSort)
  })

  const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

  const changeDateFormat = $((date:any) => {
    const od = new Date(date)
    const nd = od.getDate() + " " + month[od.getMonth()] + " " + od.getFullYear()
    return nd
  })

  const changeTimeFormat = $((time:any) => {
    let hour = Number(time.substring(0,2))
    const local = hour<12 ? "AM" : "PM"
    hour = hour>12 ? hour-12 : hour
    const minute = Number(time.substring(3,5))
    const nt = String(hour).padStart(2, '0') + ":" + String(minute).padStart(2, '0') + " " + local
    return nt
  })

  const updateMeeting = $((id) => {
    localStorage.setItem('updateMeetingId',JSON.stringify(id));
    location.pathname+=("/update")
  })

  const deleteMeeting = $((id) => {
    Swal.fire({
      title: 'Success',
      text: 'Meeting berhasil dihapus!',
      icon: 'success'
    }).then((result) => {
      if (result.isConfirmed) {
        location.pathname = ('/view_meetings')
        const indexOfObject = meetingState.items.findIndex((meeting) => {
          return meeting.id == id;
        })
        meetingState.items = [...JSON.parse(localStorage.getItem('meetings')).items]
        meetingState.nextId = JSON.parse(localStorage.getItem('meetings')).nextId
        meetingState.items.splice(indexOfObject,1)
        localStorage.setItem('meetings',JSON.stringify(meetingState));
      }
    })
  })

  return (
    <>
      <div class="container-fluid p-0" window:onLoad$={initMeeting}>
        <div class="container-fluid p-2 px-4 mt-3 d-flex justify-content-end align-items-center" style="width: 100%;">
          <div class="d-flex justify-content-end align-items-center">
            <form class="mt-0 me-3">
              <div class="input-group input-group-sm">
                <span class="input-group-text">
                  <img src="/images/lens.png" alt="" style="height:1rem; width:1rem" />
                </span>
                <input type="search" style="text-overflow: ellipsis; width: 20vw" name="query" id="searchName" value={state.query}
                  onInput$={(event) => {
                    const input = event.target as HTMLInputElement;
                    state.query = input.value;
                  }} onChange$={()=> {searchMeeting(state.query)}}
                  class="form-control input-group mr-sm-2 p-1 px-2" placeholder="Input meeting's id or title" />
              </div>
            </form>
            <div class="btn-group">
              <button type="button" class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: var(--bca);">
                Sort by
              </button>
              <ul class="dropdown-menu" style="font-size: 10pt;">
                <li><a class={"dropdown-item " + (state.selectedSort=='newest' ? 'active':'')} onClick$={()=>{sorting("newest")}} style="cursor: pointer;">Newest</a></li>
                <li><a class={"dropdown-item " + (state.selectedSort=='oldest' ? 'active':'')} onClick$={()=>{sorting("oldest")}} style="cursor: pointer;">Oldest</a></li>
                <li><a class={"dropdown-item " + (state.selectedSort=='title' ? 'active':'')} onClick$={()=>{sorting("title")}} style="cursor: pointer;">Title</a></li>
                <li><a class={"dropdown-item " + (state.selectedSort=='date' ? 'active':'')} onClick$={()=>{sorting("date")}} style="cursor: pointer;">Date</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="m-4">
          {state.length>0 ?
            <div class="container-fluid">
              {state.userMeetings.map((m) => {
                return (
                  <>
                    <div class="d-flex justify-content-center">
                      <div class="list-group-item card p-4 pt-3 pb-3 mb-4 shadow bg-body rounded-2" style="width: 90vw;">
                        <div class="d-flex justify-content-between align-items-center">
                          <table style="width: 100%;">
                            <tr>
                              <td style="width: 80%;"><b style="font-size: 14pt;">{m.title}</b></td>
                              <td style="width: 20%;">
                                <div class="container-fluid p-0 m-0 d-flex justify-content-end" style="width: 100%;">
                                  <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" href={"#multiCollapseExample" + (m.id)} role="button" aria-expanded="true" aria-controls="multiCollapseExample1" style="background-color: var(--bca);">
                                    Detail
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <div class="collapse multi-collapse" id={"multiCollapseExample" + (m.id)}>
                          <div class="card card-body mt-2">
                            <table style="width: 100%;">
                              <tr>
                                <td><b>Id</b></td>
                                <td style="line-height: 1rem;">{m.id}</td>
                                <td style="width: 20%;"></td>
                              </tr>
                              <tr>
                                <td style="width: 20%;"><b>Tanggal</b></td>
                                <td style="width: 60%;">{changeDateFormat(m.date)}</td>
                                <td style="width: 20%;"></td>
                              </tr>
                              <tr>
                                <td><b>Jam</b></td>
                                <td>{changeTimeFormat(m.startTime)} s/d {changeTimeFormat(m.endTime)}</td>
                                <td style="width: 20%;"></td>
                              </tr>
                              <tr>
                                <td><b>Deskripsi</b></td>
                                <td style="line-height: 1rem;">{m.desc}</td>
                                <td style="width: 20%;"></td>
                              </tr>
                            </table>
                            <div class="container-fluid d-flex justify-content-end" style="width: 100%;">
                              <button class="btn btn-success btn-sm ms-2" type="button"
                              onClick$={() => updateMeeting(m.id)}>
                                Update
                              </button>
                              <button class="btn btn-danger btn-sm ms-2" type="button"
                              onClick$={() => {deleteMeeting(m.id)}}>
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })}
            </div>
            :
            <div class="d-flex justify-content-center">
              <div class="card p-4 pt-3 pb-3 shadow bg-body rounded-2 mb-4 text-center" style="width: 90vw;">
                <b>No Meeting Found</b>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'OJT Task',
};
