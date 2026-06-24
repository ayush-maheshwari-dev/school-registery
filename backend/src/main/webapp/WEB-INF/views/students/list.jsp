<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<% request.setAttribute("pageTitle", "Students — SchoolMS"); %>
<% request.setAttribute("currentPage", "students"); %>
<%@ include file="../common/header.jsp" %>

    <!-- Page Header -->
    <div class="page-header">
        <div>
            <h1>🎓 Students</h1>
            <div class="page-subtitle">Manage all enrolled students</div>
        </div>
        <a href="/students/add" class="btn btn-primary">+ Add Student</a>
    </div>

    <!-- Stats -->
    <div class="stats-row">
        <div class="stat-card">
            <div class="stat-value">${total}</div>
            <div class="stat-label">
                <c:choose>
                    <c:when test="${searchTerm != null}">Results for "${searchTerm}"</c:when>
                    <c:otherwise>Total Students</c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar">
        <form class="search-form" action="/students/search" method="get">
            <input type="text" name="name"
                   placeholder="Search by name..."
                   value="${searchTerm}"/>
            <button type="submit" class="btn btn-primary btn-sm">Search</button>
            <c:if test="${searchTerm != null}">
                <a href="/students" class="btn btn-ghost btn-sm">Clear</a>
            </c:if>
        </form>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="student" items="${students}">
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>${student.year}</td>
                    <td>
                        <div class="action-cell">
                            <a href="/students/edit/${student.id}" class="btn btn-blue btn-sm">Edit</a>
                            <form action="/students/delete/${student.id}" method="post" style="display:inline;">
                                <button type="submit"
                                        onclick="return confirm('Delete ${student.name}?')"
                                        class="btn btn-danger btn-sm">
                                    Delete
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                </c:forEach>

                <c:if test="${empty students}">
                <tr>
                    <td colspan="6">
                        <div class="empty-state">
                            <div class="empty-icon">🔍</div>
                            <div>No students found.</div>
                        </div>
                    </td>
                </tr>
                </c:if>
            </tbody>
        </table>
    </div>

<%@ include file="../common/footer.jsp" %>
