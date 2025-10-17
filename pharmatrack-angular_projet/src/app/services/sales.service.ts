import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, switchMap, map } from "rxjs/operators";
import { Sale } from "../models/sale.model";
import { MedicineService } from "./medicine.service";

@Injectable({
  providedIn: "root",
})
export class SalesService {
  private apiUrl = "http://localhost:3000/sales";

  constructor(
    private http: HttpClient,
    private medicineService: MedicineService
  ) {}

  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}?_sort=date&_order=desc`);
  }

  createSale(sale: Sale): Observable<Sale> {
    // Créer la vente
    return this.http.post<Sale>(this.apiUrl, sale).pipe(
      //  Mettre à jour le stock du médicament
      switchMap((createdSale) =>
        this.medicineService.getMedicine(sale.medicineId).pipe(
          switchMap((medicine) => {
            const newStock = medicine.stock - sale.quantity;
            return this.medicineService.updateStock(medicine.id!, newStock).pipe(
              //  Transformer le Observable<Medicine> en Observable<Sale>
              map(() => createdSale) // <-- renvoie la vente créée
            );
          })
        )
      )
    );
  }

  getTotalSales(): Observable<number> {
    return this.getSales().pipe(
      map((sales) => sales.reduce((total, sale) => total + sale.totalPrice, 0))
    );
  }

  getSalesCount(): Observable<number> {
    return this.getSales().pipe(map((sales) => sales.length));
  }
}
