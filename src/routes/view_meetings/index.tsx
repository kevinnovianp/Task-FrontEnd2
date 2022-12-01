import { component$, useClientEffect$, useContext, useStore, useWatch$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
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
    currUserId: 0,
    meetings: [],
    length: 0,
    selectedSort: "oldest",
    query: ""
  })

  useWatch$(({track}) => {
    const tempMeeting = track(() => meetingState.items)
    state.meetings = tempMeeting.filter(m => m.creator == state.currUserId)
    state.length = state.meetings.length
  })

  const initMeeting = $(()=>{
    state.currUserId = JSON.parse(localStorage.getItem('currUserId'))
    meetingRepo.initMeeting()
  });

  const sorting = $((key: string) => {
    state.selectedSort=key
    switch(key){
      case "newest":{
        state.meetings.sort((a, b) => (a.id > b.id) ? -1 : 1);
        break;
      }
      case "oldest":{
        state.meetings.sort((a, b) => (a.id < b.id) ? -1 : 1);
        break;
      }
      case "title":{
        state.meetings.sort((a, b) => (a.title < b.title) ? -1 : 1);
        break;
      }
      case "date":{
        state.meetings.sort((a, b) => (a.date < b.date) ? -1 : 1);
        break;
      }
    }
  })

  const searchMeeting = $((key: string) => {
    if(key=="") state.meetings = meetingState.items.filter(m => m.creator == state.currUserId)
    else{
      state.meetings = meetingState.items.filter(m => m.id.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1
      || m.title?.toLowerCase().indexOf(key.toLowerCase()) !== -1)
    }
    sorting(state.selectedSort)
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
                <input type="search" style="text-overflow: ellipsis; width: 20vw" name="key" id="searchName"
                  onInput$={(event) => {
                    const input = event.target as HTMLInputElement;
                    state.query = input.value;
                  }}
                  class="form-control input-group mr-sm-2 p-1 px-2" placeholder="Input meeting's id or title" required />
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
        {state.length>0 ?
          <div>
            {state.meetings.map((meeting, i) => {
              return (
                <div>{meeting.title}</div>
              )
            })}
          </div>
          :
          <div>
            No data meetings
          </div>
        }
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'OJT Task',
};
