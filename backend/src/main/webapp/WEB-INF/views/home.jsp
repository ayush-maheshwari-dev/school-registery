<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<% request.setAttribute("pageTitle", "Home — SchoolMS"); %>
<% request.setAttribute("currentPage", "home"); %>
<%@ include file="common/header.jsp" %>

    <div class="home-hero">
        <h1>Welcome to SchoolMS 👋</h1>
        <p>Manage your students and teachers in one place.</p>

        <div class="home-cards">
            <a href="/students" class="home-card">
                <div class="card-icon">🎓</div>
                <div class="card-title">Students</div>
                <div class="card-desc">View, add, edit & manage students</div>
            </a>
            <a href="/teachers" class="home-card">
                <div class="card-icon">👨‍🏫</div>
                <div class="card-title">Teachers</div>
                <div class="card-desc">View, add, edit & manage teachers</div>
            </a>
        </div>
    </div>

<%@ include file="common/footer.jsp" %>
