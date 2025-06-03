# Ind-exam-databas
Individuell examen databas.

# P.L-Movies – Backend

En komplett backend för att hantera filmer och recensioner med användarregistrering och rollbaserad åtkomst.

**Funktioner**
- Användare kan registrera och logga in (JWT-baserad autentisering).
- Rollhantering: `user` och `admin`.
- Alla användare kan läsa filmer och skapa/läsa recensioner.
- Endast admin kan lägga till, uppdatera eller ta bort filmer.
- Stöd för att hämta alla filmer med genomsnittligt betyg.
- Följer tydlig MVC-struktur.
- Data lagras i MongoDB.

**Tekniker**
- Node.js, Express
- MongoDB, Mongoose
- JWT för autentisering
- Bcrypt för lösenordshashning
- Postman (för testning av endpoints)


**Kom igång**

1. **Klona repot**
    ```bash
    git clone <repo-url>
    cd <mapp>
    ```

2. **Installera beroenden**
    ```bash
    npm install
    ```

3. **Skapa `.env`-fil**
    ```env
    MONGO_URI=mongodb://localhost:27017/movieapp
    JWT_SECRET=dinhemlighettoken
    PORT=5000
    ```

4. **Starta servern**
    ```bash
    npm run dev
    ```
    *(eller `node app.js`)*

---

**Mongoose-modeller**

**Movie**
| Fält        | Typ    | Info        |
|-------------|--------|-------------|
| title       | String | Titel       |
| director    | String | Regissör    |
| releaseYear | Number | Årtal       |
| genre       | String | Genre       |

**Review**
| Fält     | Typ     | Info               |
|----------|---------|--------------------|
| movieId  | ObjectId| Referens till Movie|
| userId   | ObjectId| Referens till User |
| rating   | Number  | 1-5                |
| comment  | String  | Text               |
| createdAt| Date    | Automatisk         |

**User**
| Fält     | Typ     | Info                        |
|----------|---------|-----------------------------|
| username | String  | Unikt användarnamn          |
| email    | String  | Unik e-post                 |
| password | String  | Hashat lösenord             |
| role     | String  | 'user' eller 'admin'        |

**API-endpoints**

**User/Auth**
- `POST /register` – Registrera ny användare
- `POST /login` – Logga in och få JWT-token

**Movies**
- `POST /movies` – Lägg till ny film (**admin**)
- `GET /movies` – Hämta alla filmer
- `GET /movies/:id` – Hämta film med ID
- `PUT /movies/:id` – Uppdatera film (**admin**)
- `DELETE /movies/:id` – Ta bort film (**admin**)
- `GET /movies/ratings` – Hämta alla filmer med genomsnittligt betyg
- `GET /movies/:id/reviews` – Hämta alla recensioner för en film

**Reviews**
- `POST /reviews` – Lägg till recension (**inloggad**)
- `GET /reviews` – Hämta alla recensioner
- `GET /reviews/:id` – Hämta specifik recension
- `PUT /reviews/:id` – Uppdatera recension (**egen/admin**)
- `DELETE /reviews/:id` – Ta bort recension (**egen/admin**)
- `GET /reviews/movie/:id` – Hämta alla recensioner för en film

**Roller och autentisering**
- Använd JWT-token (`Authorization: Bearer <token>`) för skyddade endpoints.
- Alla kan läsa filmer och recensioner.
- Endast **admin** kan skapa, uppdatera och ta bort filmer.
- Endast inloggade kan skapa recensioner. Endast egna recensioner kan ändras/raderas (eller admin).

**Testa med Postman**

1. **Importera Postman Collection**
    - `movie-app.postman_collection.json` ingår (eller se instruktion från handledare).
2. **Registrera och logga in admin/användare**
3. **Spara token i Postman-variabel `{{token}}` för att slippa klistra in varje gång**
4. **Testa alla endpoints**

**Visa data i databasen**
- Använd MongoDB Compass eller `mongo` shell.
- Visa kollektionerna `users`, `movies`, `reviews` för att bekräfta att data läggs in.

**Övrigt**
- .gitignore inkluderar node_modules, .env och andra onödiga filer.
- Följer tydlig och kommenterad kodstruktur (MVC).

**Lycka till!**
