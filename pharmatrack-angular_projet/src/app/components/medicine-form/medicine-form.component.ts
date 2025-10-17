import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MedicineService } from "../../services/medicine.service"
import { AuthService } from "../../services/auth.service"
import type { Medicine } from "../../models/medicine.model"

@Component({
  selector: "app-medicine-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: "./medicine-form.component.html",
  styleUrls: ["./medicine-form.component.scss"],
})
export class MedicineFormComponent implements OnInit {
  medicineForm: FormGroup
  isEditMode = false
  medicineId: number | null = null

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.medicineForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      category: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      expiryDate: ["", Validators.required],
      description: [""],
    })
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.isEditMode = true
      this.medicineId = +id
      this.loadMedicine(this.medicineId)
    }
  }

  loadMedicine(id: number): void {
    this.medicineService.getMedicine(id).subscribe((medicine) => {
      this.medicineForm.patchValue({
        name: medicine.name,
        category: medicine.category,
        price: medicine.price,
        stock: medicine.stock,
        expiryDate: new Date(medicine.expiryDate),
        description: medicine.description,
      })
    })
  }

  onSubmit(): void {
    if (this.medicineForm.valid) {
      const formValue = this.medicineForm.value
      const medicine: Medicine = {
        ...formValue,
        expiryDate: formValue.expiryDate.toISOString().split("T")[0],
      }

      if (this.isEditMode && this.medicineId) {
        this.medicineService.updateMedicine(this.medicineId, medicine).subscribe(() => {
          this.router.navigate(["/medicines"])
        })
      } else {
        this.medicineService.createMedicine(medicine).subscribe(() => {
          this.router.navigate(["/medicines"])
        })
      }
    }
  }

  goBack(): void {
    this.router.navigate(["/medicines"])
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(["/login"])
  }
}
