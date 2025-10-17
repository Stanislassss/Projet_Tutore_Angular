import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken())
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable()

  private hasToken(): boolean {
    return !!localStorage.getItem("pharmatrack_token")
  }

  login(username: string, password: string): boolean {
    // Authentification simple pour la démo
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("pharmatrack_token", "demo-token-" + Date.now())
      localStorage.setItem("pharmatrack_user", username)
      this.isAuthenticatedSubject.next(true)
      return true
    }
    return false
  }

  logout(): void {
    localStorage.removeItem("pharmatrack_token")
    localStorage.removeItem("pharmatrack_user")
    this.isAuthenticatedSubject.next(false)
  }

  isAuthenticated(): boolean {
    return this.hasToken()
  }

  getUsername(): string | null {
    return localStorage.getItem("pharmatrack_user")
  }
}
