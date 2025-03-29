import { NavLink, Outlet, redirect, useLocation } from 'react-router'
import { links } from '~/running/data'
import './run.css'

import type { Route } from './+types/route'

export function clientLoader({ params }: Route.ClientActionArgs) {
  if (Object.keys(params).length === 0) {
    throw redirect('5k')
  }
}

export default function RunRoute() {
  const location = useLocation()

  return (
    <main>
      <header>
        <h1>Running Pace Table</h1>
        <hr />
      </header>

      <nav>
        <ul>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />

      <footer>
        <p>© {new Date().getFullYear()} Running Paces - Tomas Klingen</p>
      </footer>
    </main>
  )
}
