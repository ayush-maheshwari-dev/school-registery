function validateTeacher() {
    return (
        nameValidation() &&
        emailValidation() &&
        courseValidation() &&
        departmentValidation() &&
        experienceValidation() &&
        salaryValidation()
    );
}

// ==================== Department Validation ====================
function departmentValidation() {
    let department = document.getElementById("department").value;

    if (!department) {
        alert("Select a department");
        return false;
    }

    return true;
}

// ==================== Experience Validation ====================
function experienceValidation() {
    let experience = document
        .getElementById("experience")
        .value
        .trim();

    // Empty check
    if (!experience) {
        alert("Enter years of experience");
        return false;
    }

    // Must be a number
    if (isNaN(experience)) {
        alert("Experience must be a number");
        return false;
    }

    let expNum = parseInt(experience, 10);

    // Range check
    if (expNum < 0 || expNum > 50) {
        alert("Enter a valid experience (0 - 50 years)");
        return false;
    }

    return true;
}

// ==================== Salary Validation ====================
function salaryValidation() {
    let salary = document.getElementById("salary").value.trim();

    // Empty check
    if (!salary) {
        alert("Enter salary");
        return false;
    }

    // Must be a number
    if (isNaN(salary)) {
        alert("Salary must be a number");
        return false;
    }

    let salaryNum = parseFloat(salary);

    // Range check
    if (salaryNum < 30000 || salaryNum > 200000) {
        alert("Enter a valid salary (30,000 - 200,000)");
        return false;
    }

    return true;
}

// ==================== Student Validation ====================
function validate() {
    return (
        nameValidation() &&
        emailValidation() &&
        yearValidation() &&
        courseValidation()
    );
}

// ==================== Name Validation ====================
function nameValidation() {
    let name = document.getElementById("name").value.trim();

    // Empty check
    if (!name) {
        alert("Enter your name");
        return false;
    }

    // Only alphabets, spaces, apostrophe, hyphen
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        alert("Only alphabetic characters are allowed");
        return false;
    }

    // Length check
    if (name.length > 16) {
        alert("Name is too long (max 16 characters)");
        return false;
    }

    return true;
}

// ==================== Email Validation ====================
function emailValidation() {
    let email = document.getElementById("email").value.trim();

    // Empty check
    if (!email) {
        alert("Enter your email");
        return false;
    }

    // Email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email format is incorrect");
        return false;
    }

    return true;
}

// ==================== Year Validation ====================
function yearValidation() {
    let year = document.getElementById("year").value.trim();

    // Empty check
    if (!year) {
        alert("Enter year");
        return false;
    }

    // Must be exactly 4 digits
    if (!/^\d{4}$/.test(year)) {
        alert("Year must be 4 digits");
        return false;
    }

    let yearNum = parseInt(year, 10);
    let currentYear = new Date().getFullYear();

    // Range check
    if (yearNum < 1900 || yearNum > currentYear) {
        alert("Enter a valid year");
        return false;
    }

    return true;
}

// ==================== Course Validation ====================
function courseValidation() {
    let course = document.getElementById("course").value;

    if (!course) {
        alert("Select a course");
        return false;
    }

    return true;
}