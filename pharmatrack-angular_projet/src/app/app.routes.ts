import type { Routes } from "@angular/router"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadComponent: () => import("./components/dashboard/dashboard.component").then((m) => m.DashboardComponent),
      },
      {
        path: "medicines",
        loadComponent: () =>
          import("./components/medicine-list/medicine-list.component").then((m) => m.MedicineListComponent),
      },
      {
        path: "medicines/new",
        loadComponent: () =>
          import("./components/medicine-form/medicine-form.component").then((m) => m.MedicineFormComponent),
      },
      {
        path: "medicines/edit/:id",
        loadComponent: () =>
          import("./components/medicine-form/medicine-form.component").then((m) => m.MedicineFormComponent),
      },
      {
        path: "sales",
        loadComponent: () => import("./components/sales/sales.component").then((m) => m.SalesComponent),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
]
