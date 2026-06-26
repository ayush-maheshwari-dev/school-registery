# School Registry

A web application for managing **student** and **teacher** records, with full CRUD operations, search, and field validation. The repository ships two parts that can run independently:

- **`backend/`** — a Spring MVC 5 REST API (WAR, deploy on Tomcat 9, backed by MySQL via `JdbcTemplate`).
- **`frontend/`** — an AngularJS 1.x single-page app (hash routing) with a home/landing page and student & teacher views.

---

## Features

- Manage two entities: **Students** (name, email, course, year) and **Teachers** (name, email, subject, department, experience, salary).
- Full CRUD: list, get-by-id, add, update, delete.
- Search students or teachers by name (case-insensitive, partial match).
- Server-side **Bean Validation** (Hibernate Validator) on every write.
- Centralized error handling that returns clean JSON for 404, 400, and validation failures.

---

## Tech Stack

| Layer       | Technology                                              |
|-------------|---------------------------------------------------------|
| Backend     | Spring Web MVC 5.3, Spring JDBC (`JdbcTemplate`)         |
| Validation  | Hibernate Validator 6.2 (Jakarta/`javax.validation`)    |
| Database    | MySQL 8 (`mysql-connector-j`)                            |
| Build       | Maven (WAR packaging)                                    |
| Runtime     | Java 11, Tomcat 9 (Servlet 4 / JSP 2.3)                  |
| Views       | JSP + JSTL (server-side), AngularJS 1.x (SPA)            |
| Frontend    | AngularJS + `ngRoute`                                    |

> Note: Spring config is **XML-based** (no Spring Boot). The data source and `JdbcTemplate` are wired in `spring-servlet.xml`.

---

## Project Structure

```
school-registery/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/
│       │   ├── controller/      # HomeController, StudentController, TeacherController
│       │   ├── service/         # StudentService, TeacherService (business rules)
│       │   ├── repository/      # JdbcTemplate-based data access
│       │   ├── model/           # Student, Teacher (validated POJOs)
│       │   └── exception/       # Custom exceptions + GlobalExceptionHandler
│       └── webapp/
│           ├── WEB-INF/
│           │   ├── web.xml          # DispatcherServlet mapping
│           │   ├── spring-servlet.xml  # component scan, datasource, JdbcTemplate
│           │   └── views/           # JSP views (home, contact, students/, teachers/)
│           ├── css/  js/            # static assets
│
└── frontend/
    ├── home.html                # SPA shell (ng-app, ng-view)
    ├── app/
    │   ├── app.js               # module, routes, controller
    │   ├── lib/                 # angular + angular-route
    │   └── content/css/
    ├── components/              # nav, hero, footer partials
    └── views/                   # homeView + student/ and teacher/ templates
```

---

## API

Base path is the deployed context root (e.g. `http://localhost:8080/spring-mvc-demo`).

### Students — `/students`

| Method | Path                  | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/students`           | List all students            |
| GET    | `/students/{id}`      | Get one student              |
| POST   | `/students/add`       | Create a student → 201       |
| PUT    | `/students/{id}`      | Update a student             |
| DELETE | `/students/{id}`      | Delete a student → 204       |
| GET    | `/students/search?name=` | Search by name            |

### Teachers — `/teachers`

| Method | Path                  | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/teachers`           | List all teachers            |
| GET    | `/teachers/{id}`      | Get one teacher              |
| POST   | `/teachers/add`       | Create a teacher → 201       |
| PUT    | `/teachers/{id}`      | Update a teacher             |
| DELETE | `/teachers/{id}`      | Delete a teacher → 204       |
| GET    | `/teachers/search?name=` | Search by name            |

### Example payloads

**Student**
```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "course": "B.Tech CSE",
  "year": 2024
}
```

**Teacher**
```json
{
  "name": "Meera Iyer",
  "email": "meera@example.com",
  "subject": "Mathematics",
  "department": "Science",
  "experience": 12,
  "salary": 84000
}
```

### Validation rules

- **Student** — name 3–16 chars; valid email; course required; year ≥ 1900 and not in the future.
- **Teacher** — name 3–16 chars; valid email; subject & department required; experience 0–50; salary 30,000–200,000.

### Error responses

| Status | When                                  | Body                          |
|--------|---------------------------------------|-------------------------------|
| 404    | Student/Teacher not found             | `{ "error": "..." }`          |
| 400    | Validation failure                    | `{ "field": "message", ... }` |
| 400    | Bad argument (e.g. future year)       | `{ "error": "..." }`          |

---

## Database Setup

The backend expects a MySQL database named `school_db` on `localhost:3306`. Credentials live in `backend/src/main/webapp/WEB-INF/spring-servlet.xml` (default `root` / `root`).

Create the schema and tables:

```sql
CREATE DATABASE school_db;
USE school_db;

CREATE TABLE students (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(50)  NOT NULL,
    email   VARCHAR(100) NOT NULL,
    course  VARCHAR(50)  NOT NULL,
    year    INT          NOT NULL
);

CREATE TABLE teachers (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(50)  NOT NULL,
    email       VARCHAR(100) NOT NULL,
    subject     VARCHAR(50)  NOT NULL,
    department  VARCHAR(50)  NOT NULL,
    experience  INT          NOT NULL,
    salary      DOUBLE       NOT NULL
);
```

Update the `url`, `username`, and `password` in `spring-servlet.xml` to match your environment.

---

## Running the Backend

Prerequisites: **JDK 11**, **Maven**, **MySQL 8**, **Tomcat 9**.

```bash
cd backend
mvn clean package
```

This produces `target/spring-mvc-demo.war`. Deploy it:

- Drop the WAR into Tomcat 9's `webapps/`, or
- Run from your IDE (the repo includes Smart Tomcat config under `backend/.smarttomcat/`).

The app starts at `http://localhost:8080/spring-mvc-demo`.

---

## Running the Frontend

The frontend is a static AngularJS app — no build step. Serve `frontend/` with any static file server (it uses relative paths and `ngRoute`):

```bash
cd frontend
python3 -m http.server 5500
# open http://localhost:5500/home.html
```

Routes:

| Path         | View                          |
|--------------|-------------------------------|
| `/`          | `views/homeView.html`         |
| `/students`  | `views/student/students.html` |
| `/teachers`  | `views/teacher/teachers.html` |

> The Angular controller currently uses in-memory sample data for students and teachers. To make it live, point its add/edit/delete/search actions at the backend `/students` and `/teachers` endpoints via `$http`.

---

## Notes

- Spring is configured the classic way through `web.xml` + `spring-servlet.xml`; there is no `application.properties`.
- The JSP views under `WEB-INF/views/` are an alternate server-rendered UI; the `InternalResourceViewResolver` is currently commented out, and the controllers are `@RestController`s returning JSON.
- Commented-out JPA/Hibernate dependencies remain in `pom.xml` — the active persistence path is plain `JdbcTemplate`.