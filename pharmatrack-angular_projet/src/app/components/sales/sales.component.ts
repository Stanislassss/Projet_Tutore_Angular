import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatTableModule } from "@angular/material/table"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MedicineService } from "../../services/medicine.service"
import { SalesService } from "../../services/sales.service"
import { AuthService } from "../../services/auth.service"
import type { Medicine } from "../../models/medicine.model"
import type { Sale } from "../../models/sale.model"

@Component({
  selector: "app-sales",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit {
  saleForm: FormGroup
  medicines: Medicine[] = []
  sales: Sale[] = []
  selectedMedicine: Medicine | null = null
  displayedColumns: string[] = ["medicineName", "quantity", "totalPrice", "date"]

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private salesService: SalesService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.saleForm = this.fb.group({
      medicineId: ["", Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
    })
  }

  ngOnInit(): void {
    this.loadMedicines()
    this.loadSales()

    this.saleForm.get("medicineId")?.valueChanges.subscribe((medicineId) => {
      this.selectedMedicine = this.medicines.find((m) => m.id === medicineId) || null
    })
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe((medicines) => {
      this.medicines = medicines.filter((m) => m.stock > 0)
    })
  }

  loadSales(): void {
    this.salesService.getSales().subscribe((sales) => {
      this.sales = sales
    })
  }

  get totalPrice(): number {
    if (!this.selectedMedicine) return 0
    const quantity = this.saleForm.get("quantity")?.value || 0
    return this.selectedMedicine.price * quantity
  }

  get maxQuantity(): number {
    return this.selectedMedicine?.stock || 0
  }

  onSubmit(): void {
    if (this.saleForm.valid && this.selectedMedicine) {
      const quantity = this.saleForm.get("quantity")?.value

      if (quantity > this.selectedMedicine.stock) {
        this.snackBar.open("Stock insuffisant!", "Fermer", {
          duration: 3000,
          panelClass: ["error-snackbar"],
        })
        return
      }

      const sale: Sale = {
        medicineId: this.selectedMedicine.id!,
        medicineName: this.selectedMedicine.name,
        quantity: quantity,
        totalPrice: this.totalPrice,
        date: new Date().toISOString(),
      }

      this.salesService.createSale(sale).subscribe({
        next: () => {
          this.snackBar.open("Vente enregistrée avec succès!", "Fermer", {
            duration: 3000,
            panelClass: ["success-snackbar"],
          })
          this.saleForm.reset()
          this.selectedMedicine = null
          this.loadMedicines()
          this.loadSales()
        },
        error: () => {
          this.snackBar.open("Erreur lors de l'enregistrement", "Fermer", {
            duration: 3000,
            panelClass: ["error-snackbar"],
          })
        },
      })
    }
  }

  goBack(): void {
    this.router.navigate(["/dashboard"])
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
