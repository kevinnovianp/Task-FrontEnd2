import { component$, useStyles$, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import auth from '~/routes/service/auth';
// import auth from '../service/auth';

export const navbarStyle = `
a{
  font-weight: lighter;
}

a.active{
  font-weight: normal;
}
`;

export const hideMenus = `
#menus{
  visibility : hidden;
}
`;

export const activeNewMeeting = `
#new_meeting{
  font-weight: normal;
  color: white;
}
`;

export const activeViewMeetings = `
#view_meetings{
  font-weight: normal;
  color: white;
}
`;

export const activeLogout = `
#logout{
  font-weight: normal;
  color: white;
}
`;

export default component$(() => {
  useStyles$(navbarStyle);

  const logout = $(() => {
    auth.logout();
  })

  const { pathname } = useLocation();
  if(pathname.startsWith("/login") || pathname.startsWith("/register")) useStyles$(hideMenus);
  else{
    if(pathname.startsWith('/new_meeting')) useStyles$(activeNewMeeting);
    else if(pathname.startsWith('/view_meetings')) useStyles$(activeViewMeetings);
    else useStyles$(activeLogout);
  }
  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark d-flex justify-content-between px-3" style="background-color: var(--bca)">
          <h3 class="my-1 align-self-start" style="color: white; font-family: Calibri;">
            <Logo />
          </h3>
          <div id="menus">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class="nav-link" id="new_meeting" href="/new_meeting">New Meeting</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="view_meetings" href="/view_meetings">View Meetings</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="logout" href="/login" onClick$={logout} preventdefault:click>Logout</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
      </header>
    </>
  );
});

export const Logo = () => (
  <img src="http://127.0.0.1:5173/images/logo.png" alt="" class="" style="height: 2.2rem;"></img>
);