import { Meeting } from "../meeting";

export class meetingRepo{
    private meetings: Meeting[] = [
        {id:1, startTime:'10:00', endTime:'11:30', date:'2022-01-11', title: 'Meet 1', desc: 'This is first meet', creator: 1},
        {id:2, startTime:'11:00', endTime:'11:30', date:'2022-08-12', title: 'Meet 2', desc: 'This is second meet', creator: 1},
        {id:3, startTime:'12:00', endTime:'13:30', date:'2022-05-13', title: 'Meet 3', desc: 'This is third meet', creator: 1},
        {id:4, startTime:'15:00', endTime:'16:30', date:'2022-12-11', title: 'Meet 4', desc: 'This is fourth meet', creator: 1},
        {id:5, startTime:'10:00', endTime:'11:30', date:'2022-07-14', title: 'Meet 5', desc: 'This is fifth meet', creator: 1},
        {id:6, startTime:'11:30', endTime:'16:30', date:'2022-05-13', title: 'Meet 6', desc: 'This is sixth meet', creator: 1}
    ];
    private currMeetingId = 3;

    getcurrMeetingId(){
        this.currMeetingId++;
        return this.currMeetingId;
    }
}