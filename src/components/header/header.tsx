import { component$, useStyles$, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import auth from '~/routes/service/auth';

export const navbarStyle = `
a{
  font-weight: lighter;
}

a.active{
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

  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg navbar-dark d-flex justify-content-between px-3" style="background-color: var(--bca)">
          <h3 class="my-1 align-self-start" style="color: white; font-family: Calibri;">
            <Logo />
          </h3>
          <div class={(pathname.startsWith('/login') || pathname.startsWith('/register') ? 'invisible' : '')}>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item">
                      <a class={"nav-link " + (pathname.startsWith('/new_meeting') ? 'active' : '')} href="/new_meeting">New Meeting</a>
                    </li>
                    <li class="nav-item">
                      <a class={"nav-link " + (pathname.startsWith('/view_meetings') ? 'active' : '')} href="/view_meetings">View Meetings</a>
                    </li>
                    <li class="nav-item">
                      <a class={"nav-link " + (pathname.startsWith('/login') ? 'active' : '')} href="/login" onClick$={logout} preventdefault:click>Logout</a>
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