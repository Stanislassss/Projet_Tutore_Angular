import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, map, tap } from "rxjs";
import { Medicine } from "../models/medicine.model";
import { Sale } from "../models/sale.model";

@Injectable({
  providedIn: "root",
})
export class MedicineService {
  private apiUrl = "http://localhost:3000/medicines";
  private medicinesSubject = new BehaviorSubject<Medicine[]>([]);
  public medicines$ = this.medicinesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.http.get<Medicine[]>(this.apiUrl).subscribe((medicines) => {
      this.medicinesSubject.next(medicines);
    });
  }

  getMedicines(): Observable<Medicine[]> {
    return this.http
      .get<Medicine[]>(this.apiUrl)
      .pipe(tap((medicines) => this.medicinesSubject.next(medicines)));
  }

  getMedicine(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.apiUrl}/${id}`);
  }

  createMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http
      .post<Medicine>(this.apiUrl, medicine)
      .pipe(tap(() => this.loadMedicines()));
  }

  updateMedicine(id: number, medicine: Medicine): Observable<Medicine> {
    return this.http
      .put<Medicine>(`${this.apiUrl}/${id}`, medicine)
      .pipe(tap(() => this.loadMedicines()));
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(tap(() => this.loadMedicines()));
  }

  updateStock(id: number, newStock: number): Observable<Medicine> {
    return this.http
      .patch<Medicine>(`${this.apiUrl}/${id}`, { stock: newStock })
      .pipe(tap(() => this.loadMedicines()));
  }

  getLowStockMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.apiUrl}?stock_lte=10`);
  }

  
  createSaleFromMedicine(medicineId: number, quantity: number): Observable<Sale> {
    return this.getMedicine(medicineId).pipe(
      map((med) => ({
        medicineId: med.id!,
        medicineName: med.name,
        quantity,
        totalPrice: med.price * quantity,
        date: new Date().toISOString(),
      }))
    );
  }
}
