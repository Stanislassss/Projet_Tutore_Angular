import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatBadgeModule } from "@angular/material/badge"
import { NgChartsModule } from 'ng2-charts'
import type { ChartConfiguration } from "chart.js"
import { MedicineService } from "../../services/medicine.service"
import { SalesService } from "../../services/sales.service"
import { AuthService } from "../../services/auth.service"
import type { Medicine } from "../../models/medicine.model"
import type { Sale } from "../../models/sale.model"

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatBadgeModule,
    NgChartsModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  totalMedicines = 0
  totalSales = 0
  lowStockCount = 0
  lowStockMedicines: Medicine[] = []
  recentSales: Sale[] = []
  username: string | null = ""

  // Configuration du graphique
  public barChartData: ChartConfiguration<"bar">["data"] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: "Ventes (FCFA)",
        backgroundColor: "rgba(102, 126, 234, 0.8)",
        borderColor: "rgba(102, 126, 234, 1)",
        borderWidth: 1,
      },
    ],
  }

  public barChartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  constructor(
    private medicineService: MedicineService,
    private salesService: SalesService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername()
    this.loadDashboardData()
  }

  loadDashboardData(): void {
    // Charger les médicaments
    this.medicineService.getMedicines().subscribe((medicines) => {
      this.totalMedicines = medicines.length
    })

    // Charger les médicaments en rupture de stock
    this.medicineService.getLowStockMedicines().subscribe((medicines) => {
      this.lowStockMedicines = medicines
      this.lowStockCount = medicines.length
    })

    // Charger les ventes
    this.salesService.getSales().subscribe((sales) => {
      this.recentSales = sales.slice(0, 5)
      this.totalSales = sales.reduce((sum, sale) => sum + sale.totalPrice, 0)

      // Préparer les données pour le graphique
      const salesByMedicine = this.groupSalesByMedicine(sales)
      this.barChartData.labels = salesByMedicine.map((s) => s.name)
      this.barChartData.datasets[0].data = salesByMedicine.map((s) => s.total)
    })
  }

  groupSalesByMedicine(sales: Sale[]): { name: string; total: number }[] {
    const grouped = sales.reduce(
      (acc, sale) => {
        if (!acc[sale.medicineName]) {
          acc[sale.medicineName] = 0
        }
        acc[sale.medicineName] += sale.totalPrice
        return acc
      },
      {} as { [key: string]: number },
    )

    return Object.entries(grouped)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }

  navigateTo(route: string): void {
    this.router.navigate([route])
  }
}
