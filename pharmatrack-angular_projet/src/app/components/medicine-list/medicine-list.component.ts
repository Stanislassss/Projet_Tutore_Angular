import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { MedicineService } from "../../services/medicine.service";
import { AuthService } from "../../services/auth.service";
import { Medicine } from "../../models/medicine.model";

@Component({
  selector: "app-medicine-list",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: "./medicine-list.component.html",
  styleUrls: ["./medicine-list.component.scss"],
})
export class MedicineListComponent implements OnInit {
  medicines: Medicine[] = [];
  displayedColumns: string[] = [
    "name",
    "category",
    "price",
    "stock",
    "expiryDate",
    "actions",
  ];

  constructor(
    private medicineService: MedicineService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.medicineService.getMedicines().subscribe((medicines) => {
      this.medicines = medicines;
    });
  }

  addMedicine(): void {
    this.router.navigate(["/medicines/new"]);
  }

  editMedicine(id: number): void {
    this.router.navigate(["/medicines/edit", id]);
  }

  deleteMedicine(id: number, name: string): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${name} ?`)) {
      this.medicineService.deleteMedicine(id).subscribe(() => {
        this.loadMedicines();
      });
    }
  }

  goBack(): void {
    this.router.navigate(["/dashboard"]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  isLowStock(stock: number): boolean {
    return stock < 10;
  }

  addToSale(medicineId: number, quantity: number): void {
    this.medicineService.createSaleFromMedicine(medicineId, quantity).subscribe((sale) => {
      console.log("Nouvelle vente :", sale);
    });
  }
}
