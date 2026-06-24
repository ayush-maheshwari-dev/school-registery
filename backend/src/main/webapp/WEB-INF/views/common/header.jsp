<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${pageTitle != null ? pageTitle : 'School Management'}</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css"/>
</head>
<body>

<nav class="navbar">
    <a href="/home" class="navbar-brand">
        🏫 <span>School</span>MS
    </a>
    <div class="nav-links">
        <a href="/home"     class="${currentPage == 'home'     ? 'active' : ''}">Home</a>
        <a href="/students" class="${currentPage == 'students' ? 'active' : ''}">Students</a>
        <a href="/teachers" class="${currentPage == 'teachers' ? 'active' : ''}">Teachers</a>
        <a href="/contact"  class="${currentPage == 'contact'  ? 'active' : ''}">Contact</a>
    </div>
</nav>

<div class="main-content">
