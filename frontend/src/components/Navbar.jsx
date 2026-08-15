import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
            S
          </div>

          <span className="text-lg font-bold tracking-tight">
            ShopSense
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-slate-950"
                  : "text-slate-500 hover:text-slate-950"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/predict"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-slate-950"
                  : "text-slate-500 hover:text-slate-950"
              }`
            }
          >
            Prediction
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-slate-950"
                  : "text-slate-500 hover:text-slate-950"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-slate-950"
                  : "text-slate-500 hover:text-slate-950"
              }`
            }
          >
            About
          </NavLink>

        </nav>

        <Link
          to="/predict"
          className="hidden items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:flex"
        >
          Try ShopSense
          <ArrowUpRight size={15} />
        </Link>

      </div>
    </header>
  );
}

export default Navbar;